const asyncHooks = require( "async_hooks" );
const { v4: uuidv4 } = require( "uuid" );

/**
 * It was my concern that this would lead to memory leaks as the map would grow potentially to dead async calls.
 *
 * My findings indicate that the map does not produce a memory leak, it is only growing when the async call is created.
 * However, in the case I'm mistaken, I added a contextStartTime to each element in the map, which can be used to purge
 * context that have died.
 *
 * @type {Map<any, any>}
 */
const store = new Map();

// The executionAsyncId() - The identifier of the current execution context.
const getExecutionAsyncId = () => asyncHooks.executionAsyncId();

// The triggerAsyncId() - The identifier of the parent resource that triggered the execution of the async resource.
const getTriggerAsyncId = () => asyncHooks.triggerAsyncId();

// https://blog.besson.co/nodejs_async_hooks_to_get_per_request_context/
const asyncHook = asyncHooks.createHook( {
  init: ( asyncId, _type, triggerAsyncId ) => {
    // A new async resource was created
    // If our parent triggerAsyncId already had a context object
    // we copy data to our new asyncId
    if ( store.has( triggerAsyncId ) ) {
      store.set( asyncId, store.get( triggerAsyncId ) );
    }
  },
  // before: function (asyncId) { },
  // after: function (asyncId) { },
  destroy: ( asyncId ) => {
    // Called after the resource corresponding to asyncId is destroyed.
    // It is also called asynchronously from the embedder API emitDestroy().
    // some cleaning to prevent memory leaks
    if ( store.has( asyncId ) ) {
      store.delete( asyncId );
    }
  },
  promiseResolve: function (asyncId) {
    // Called when the resolve function, passed to the Promise constructor, is invoked (either directly or through
    // other means of resolving a promise). If reject is invoked or exception is throw within the promise, this
    // still fires off.
    if ( store.has( asyncId ) ) {
      store.delete( asyncId );
    }
  }
} );

asyncHook.enable();

/**
 * Set the context so subsequent child async calls inherit it. This does a SHALLOW object copy from the parent down to
 * the caller ( child ), if it exists. The new context is saved in an internal map as a new element. Once the async
 * execution call has been destroyed the context is removed from the map. for your reference see async_hooks#createHook
 *
 * Whilst you can specify a `correlationId`, as a context parameter it is not required. If the parent has one, it will
 * be pushed down to the caller's context, otherwise a new one will be generated. This is done, so correlationId can be
 * set at demarcation points in the code, and the caller can use it to correlate the request.
 *
 * `contextStartTime` is immutable, everytime a context is set it is set to the current epoch milliseconds.
 *
 * `asyncId` is the identifier of the current execution async id and is immutable.
 *
 * @param {Object} [context={}] - The context to set, must be a SHALLOW object, as a spread operation is used to clone.
 */
const setContext = ( context = {} ) => {
  const asyncId = getExecutionAsyncId();
  const oldContext = store.get( asyncId) || {};
  store.set(asyncId, {
    ...oldContext,
    ...context,
  });
};

/**
 * Returns the context from the parent. Do not assume setContext has been called and the value is present ( which would
 * actually set the contextStartTime, asyncId, & correlationId ). Children making changes to the context are not
 * reflected in the parent ( top-down inheritance ). contextStartTime is the timestamp the top level parent context was
 * created, this can be overridden via setContext. correlationId is the unique id for the top level parent context,
 * this can be specified in setContext.
 * @returns {*&{contextStartTime: number|undefined, asyncId: number|undefined, correlationId: string|undefined}}
 */
const getContext = () => {
  const asyncId = getExecutionAsyncId();
  return store.get( asyncId ) || {};
};

module.exports = {
  setContext,
  getContext,
  getTriggerAsyncId,
  getExecutionAsyncId
};

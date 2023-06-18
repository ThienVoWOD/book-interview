const logger = require( "morgan" );
const { stream } = require( "./logger" );

module.exports = logger(function (tokens, req, res) {
  return [
    tokens.method( req, res ),
    tokens.url( req, res ),
    tokens.status( req, res ),
    tokens[ "response-time" ]( req, res ), "ms"
  ].join( " " );
}, { stream } );

module.exports = async function cacheControlMiddleware(req, reply, done) {
  reply.headers({ "Cache-control": "max-age=0, private, must-revalidate" });
  done();
};

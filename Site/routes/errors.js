exports.init = function(app) {
  // Not Found Error Type
  function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
  }
  NotFound.prototype.__proto__ = Error.prototype;

  // 500 Page
  app.use(function(err, req, res, next){
    throw new Error('keyboard cat!');
  });

  // 404 page
  app.use(function(req, res){
    throw new NotFound;
  });

  //setup the errors
  app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
      res.render('errors/404', { locals: { 
        title : '404 - Not Found'
      },status: 404 });
    } else {
      res.render('errors/500', { locals: { 
        title : 'The Server Encountered an Error',
        error: err},
        status: 500 });
    }
  });
}
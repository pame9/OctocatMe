
/**
 * Module dependencies.
 */

var express = require('express')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , mongooseAuth = require('mongoose-auth')
    , io = require('socket.io')
    , routes = require('./routes/routes');

    

require('express-resource');

//remote
mongoose.connect("mongodb://nodejitsu:50f3236694d088756f9804436d6f0f52@staff.mongohq.com:10034/nodejitsudb537642118814");

require('./models/level');
require('./models/user');

var app = module.exports = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , mongooseAuth.middleware()
);



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("view options", {layout: true});
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public')); 
  app.set('views', __dirname + '/views');
});

app.get('/', function(req, res){
  res.render("index");
});

app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true }));
   app.set('view options', {
    pretty: true
  });
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});






// Routes

// Setup the routes
routes.init(app);

var routes = require('./routes')
app.get('/', routes.index);
app.resource('companies', require('./routes/levels'))
app.resource('users', require('./routes/users'))
app.resource('login', require('./routes/login'))







mongooseAuth.helpExpress(app);

app.listen(3000);


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

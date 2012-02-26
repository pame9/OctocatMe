
/**
 * Module dependencies.
 */

var express = require('express')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , io = require('socket.io')
    , routes = require('./routes/routes')
    , config = require('./lib/config')
    , everyauth = require('everyauth');

    

require('express-resource');

//remote
mongoose.connect("mongodb://nodejitsu:50f3236694d088756f9804436d6f0f52@staff.mongohq.com:10034/nodejitsudb537642118814");


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
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less']}))
  app.use(express.static(__dirname + '/public')); 
  app.set('views', __dirname + '/views');
  app.use(express.cookieParser());
  app.use(express.session({store: sesh, secret: config.redis_secret}));
  app.use(everyauth.middleware()); // pretend you didn't see this yet
});

app.get('/', function(req, res){
  res.render("index");
});

app.get('/',function(req,res) {
	if (req.session && req.session.uid) {
	    return res.redirect('user/confirm');
	}
	res.render('user/login');
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







mongooseAuth.helpExpress(app);

app.listen(3000);


everyauth.github
  .appId(config.gh_clientId)
  .appSecret(config.gh_secret)
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    session.oauth = accessToken;
    return session.uid = githubUserMetadata.login;
  })
  .redirectPath('/');
 everyauth.everymodule.handleLogout( function (req, res) {
  req.logout();
  req.session.uid = null;
  res.writeHead(303, { 'Location': this.logoutRedirectPath() });
  res.end();
});
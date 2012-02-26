
/**
 * Module dependencies.
 */

var express = require('express')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , io = require('socket.io')
    , http = require('http')
    , https = require('https')
    , routes = require('./routes/routes')
    , config = require('./lib/config')
    , everyauth = require('everyauth');

    
  require('./models/photo');
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

require('express-resource');

//remote
mongoose.connect("mongodb://nodejitsu:50f3236694d088756f9804436d6f0f52@staff.mongohq.com:10034/nodejitsudb537642118814");


var app = module.exports = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
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
  app.use(everyauth.middleware()); 
});

app.get('/',function(req,res) {
	if (req.session && req.session.uid) {
	    return res.redirect('/board');
	}
	res.render('login');
});

app.get('/result',function(req,res) {
	res.render('result');
});


app.get('/board',function(req,res) {
    if (!req.session.uid) {
        return res.redirect('/');
    }
    var repos,
        opts = {
			host: "api.github.com",
			path: '/user/repos?access_token=' + req.session.oauth,
			method: "GET"
		},
    	request = https.request(opts, function(resp) {
    		var data = "";
    		resp.setEncoding('utf8');
		resp.on('data', function (chunk) {
			data += chunk;
		});
		resp.on('end', function () {
			repos = JSON.parse(data);
			res.render('board',{username: req.session.uid, repos: repos});
		});
    	});
    request.end();
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
app.resource('photos', require('./routes/photos'))

app.listen(3000);


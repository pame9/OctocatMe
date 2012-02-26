//Setup Dependencies
var natural = require('natural')
  , nconf = require('nconf')
  , fs = require('fs');

// Start up the routes
exports.init = function(app) {
  loadRoutes(app);
 // initHelpers(app);
  initRootRoutes(app);
}

// Get a list of all route and init each one
function loadRoutes(app) {
  // load up all the routes
  fs.readdir(__dirname, function(err, files){
    if (err) throw err;
    files.forEach(function(file){
      loadRoute(app, file);
    });
  });
}

// Load and initialize an individual route file
function loadRoute(app, file) {
  var name = file.replace('.js', '')
  , route = require('./' + name);

  // Don't include this file
  if(name == 'routes')	return;
  
  // loop and init each route
  Object.keys(route).map(function(action){
    switch(action) {
      case 'init':
        route.init(app);
        break;
    }
  });
}

function initRootRoutes(app) {
	// Set the base page
  app.get('/', function (req, res) {
    res.render('home');
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

}
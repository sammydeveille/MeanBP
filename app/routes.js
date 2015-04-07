var passport = require('passport');

// Define a middleware function to be used for every secured routes
var isAuthenticated = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};

module.exports = function(app) {
	app.get('/', function(req, res){
  		res.render('index', { title: 'Express'});
	});

	// route to test if the user is logged in or not
	app.get('/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	// route to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
	  res.send(req.user);
	});

	// route to log out
	app.post('/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});

	// API =================================================================
	app.get('/api/users', isAuthenticated, function(req, res){
	  res.send([{name: "user1"}, {name: "user2"}]);
	});
};
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function() {
	// Define the strategy to be used by PassportJS
	passport.use(new localStrategy(
	  function(username, password, done) {
	    if (username === "admin" && password === "admin") // stupid example
	      return done(null, {name: "admin"});

	    return done(null, false, { message: 'Incorrect username.' });
	  }
	));

	// Serialized and deserialized methods when got from session
	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});
};
var passport = require('passport');
var router = require('express').Router();

router.use(passport.initialize()); // Add passport initialization
router.use(passport.session());    // Add passport initialization

router.get('/', function(req, res){
	res.render('index', { title: 'Express'});
});

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
router.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

module.exports = router;
var router = require('express').Router();

var isAuthenticated = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};

router.get('/users', isAuthenticated, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});

module.exports = router;
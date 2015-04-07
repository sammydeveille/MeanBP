var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var router = require('express').Router();

router.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
router.use(bodyParser.json()); // parse application/json
router.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
router.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
router.use(cookieParser());
router.use(expressSession({ 
  secret: process.env.SESSION_SECRET || 'secret' ,
  resave: false,
  saveUninitialized: false 
}));

router.use(express.static(path.join(__dirname, '../client')));
//router.use(express.static(path.join(__dirname, '../assets')));
//app.use(express.static(path.join(__dirname, 'assets')));
//app.use('/client/views', express.static(__dirname + 'client/views'))

router.use(passport.initialize()); // Add passport initialization
router.use(passport.session());    // Add passport initialization

router.use('/', require('./login'))
router.use('/api', require('./api'))

router.get('/', function(req, res){
	res.render('index', { title: 'Express'});
});

module.exports = router;
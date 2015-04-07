var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var http = require('http');
var path = require('path');

var passport = require('passport');


// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(cookieParser());

app.use(expressSession({ 
  secret: process.env.SESSION_SECRET || 'secret' ,
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

app.use(express.static(path.join(__dirname, 'client')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// requires =========================================================
require('./app/routes.js')(app);
require('./app/passport.js')(passport);


// listen ===========================================================
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
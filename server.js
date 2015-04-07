var express = require('express');
var logger = require('morgan');
var http = require('http');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(require('./app'));

require('./app/passport.js')();

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


// listen ===========================================================
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
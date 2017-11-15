var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var dbUrl = 'mongodb://localhost/DigitizeConsent'
// var dbUrl = 'mongodb://consentdigitizerdb:c3y4A6Zno38jRX9rzXuE1aI0ue5sMT4DFisGquSLqu7P554tijj4mQjIPwdb6s0FUHIREQ3OyiqIHbvoI4kwjA==@consentdigitizerdb.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false'
mongoose.connect(dbUrl, function(err, res){
	if(err){
		console.log('DB CONNECTION FAILED: '+ err)
	} else{
		console.log('DB CONNECTION SUCCESS: ' + dbUrl)
	}
})

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

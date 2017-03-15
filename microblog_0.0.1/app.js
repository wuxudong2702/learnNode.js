
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var util = require('util');
//var MongoStore = require('connect-mongo');
//var settings = require('./settings');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.cookieParser());
  //app.use(express.session({
  //   secret: settings.cookieSecret,
  //   store: new MongoStore({
  //     db: settings.db
  //   })
  // }));
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.helpers({
  inspect: function(obj) {
    return util.inspect(obj, true);
  }
});
app.dynamicHelpers({
  headers: function(req, res) {
    return req.headers;
  }
});



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

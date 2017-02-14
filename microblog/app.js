
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var util = require('util');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
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

// Routes

app.get('/', routes.index);
app.get('/hello',routes.hello);
app.get('/user/:username', function(req, res){
  res.send('user: ' + req.params.username);
})
app.get('/helper', function(req,res) {
  res.render('helper', {
    title: 'Helpers'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

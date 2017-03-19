var express = require('express');
var http = require('http');
var routes = require('./routes')

var app = express();
app.set('port', 3000);
app.use(express.static(__dirname + '/tmp'));

app.route('/').get(routes.index);
app.route('/upload').post(routes.upload);

http.createServer(app).listen(app.get('port'), function() {
    console.log("express server listening on port" + app.get('port'));
});
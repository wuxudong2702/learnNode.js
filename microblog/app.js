
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var routes = require('./routes');
var settings = require('./settings');
var MongoStore = require('connect-mongo')(express);
var partials = require('express-partials');
// partial是express2.X的特性，现已弃用，此处以中间件的形式引入
var flash = require('connect-flash');
var sessionStore = new MongoStore({
						db : settings.db
					}, function() {
							console.log('connect mongodb success...');
					});

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
// app.use()用于注册中间件，注册后的函数会在请求到来时按顺序执行
	app.use(partials());
	app.use(flash());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.use(express.cookieParser());
	
	app.use(express.session({
		secret : settings.cookie_secret,
		cookie : {
			maxAge : 60000 * 20	//20 minutes
		},
		store : sessionStore
	}));

	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
// app.configure([env],callback)是旧版本遗留下来的特性，可以直接用条件判断语法替代
// 如: app.configure('development', function(){
//   app.set('db uri', 'localhost/dev');
// })
// 和 if ('development' == app.get('env')) {
//   app.set('db uri', 'localhost/dev');
// }
// 就是等价的
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


/**
* node-mongodb-native   https://github.com/christkv/node-mongodb-native
* 
* ejs	https://github.com/visionmedia/ejs
* 
* express-Migrating from 2.x to 3.x		https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
* 
* Express 3.x + Socket.IO		http://blog.lyhdev.com/2012/07/nodejs-express-3x-socketio.html
* 
* express-partials		https://github.com/publicclass/express-partials
* 
* connect-flash		https://github.com/jaredhanson/connect-flash
*
* connect-mongodb		https://github.com/masylum/connect-mongodb
*
* 
*/


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
// app.set(name, value)
// 将设置项name的值设置为value	
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
// app.use([path], function)
// 使用中间件 function，可选参数 path 默认是 “/”。
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
// express.static(root, [options])
// express.static 是 Express 内置的唯一一个中间件。
// 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
// 将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：
// app.use(express.static('public'));
// 现在，public 目录下面的文件就可以访问了。
// http://localhost:3000/images/kitten.jpg
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
// errorHandler能捕获所有类型的错误，其定义如下:
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render('error', { error: err });
// }
});

// app.get()
// 弱调用app.get()时只有一个参数，则认为是取设置值，否则认为是注册路由
// app.get('/',function(){})；是对中间件app.router进行配置(包括app.post(),app.all()等)
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

var server = require("./server");    
var router = require("./router");  
var requestHandlers = require("./requestHandlers");
         //require可加载.js .json .node后缀的文件

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route,handle);
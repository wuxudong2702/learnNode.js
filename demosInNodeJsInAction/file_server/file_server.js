var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
// path中的join方法会把所有参数<string>合成一个路径，并返回该路径<string>，
var fs = require('fs');

var root = __dirname;

// var server = http.createServer(function(req, res) {
//     var url = parse(req.url);
//     var path = join(root,url.pathname);
//     var stream = fs.createReadStream(path);
//     // createReadStream.path流正在读取的文件的路径，指定在fs.createReadStream() 的第一个参数。
//     stream.on('data', function(chunk) {
//         res.write(chunk);
//     });
//     stream.on('end', function() {
//         res.end();
//     });
// });

var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    var stream = fs.createReadStream(path);
    stream.pipe(res);
    // res.end会在stream.pipe()内部调用
});

server.listen(3000);
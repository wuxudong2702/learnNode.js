var http = require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
});

function show(req ,res) {
    var html = '<form method="post" action="/" enctype="multipart/form-data">'
             + '<p><input type="text" name="name"/></p>'
             + '<p><input type="file" name="file"/></p>'
             + '<p><input type="submit" value="upload"/></p>'
             + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html); 
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad request:expecteding multipart/form-data');
        return;
    }
    var form = new formidable.IncomingForm()
    
    form.on('field', function(field, value) {
        console.log(field);
        console.log(value);
    });
    form.on('file', function(name, file) {
        console.log(name);
        console.log(file);
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    });
    form.on('end', function() {
        res.end('upload complete!');
    });
    
    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    // headers是一个包含请求头的对象，req.headers['content-type']也就是对象中content-type键对应的值
    return 0 == type.indexOf('multipart/form-data');
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
}

server.listen(3000);
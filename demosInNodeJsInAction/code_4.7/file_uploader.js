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
//  form.on('field', function(name, value) {}); 每当一个字段/值对已经收到时会触发该事件
        console.log(field);
        console.log(value);
    });
    form.on('file', function(name, file) {
// form.on('file', function(name, file) {}); 每当有一对字段/文件已经接收到，便会触发该事件
        console.log(name);
        console.log(file);
// formidable.File对象
// A.file.size = 0 上传文件的大小，如果文件正在上传，表示已上传部分的大小
// B.file.path = null 上传文件的路径。如果不想让formidable产生一个临时文件夹，可以在fileBegain事件中修改路径
// C.file.name = null 上传文件的名字
// D.file.type = null 上传文件的mime类型
// E.file.lastModifiedDate = null 时间对象，上传文件最近一次被修改的时间
// F.file.hash = null 返回文件的hash值
// G.可以使用JSON.stringify(file.toJSON())来格式化输出文件的信息
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
//  form.on('progress', function(bytesReceived, bytesExpected) {}); 当有数据块被处理之后会触发该事件，对于创建进度条非常有用。
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
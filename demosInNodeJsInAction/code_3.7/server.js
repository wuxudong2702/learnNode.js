var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  getTitles(res);
}).listen(3000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./list.json', function(err,data) {
        if(err) return hadError(err, res);
        getTemplate(JSON.parse(data.toString()), res);
    });
}

function getTemplate(items, res) {
    fs.readFile('./template.html', function(err, data) {
        if(err) return hadError(err, res);
        formatHtml(items, data.toString(), res);
    });
}

function formatHtml(items, tmpl, res) {
    var html = tmpl.replace('%', items.join('</li><li>'));
    // 数组中join方法用于把数组中所有元素放入一个字符串，上例所用参数即为数组元素间的分隔符
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.error(err);
    res.end('Server Error');
}
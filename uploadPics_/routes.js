var fs = require('fs');
var formidable = require('formidable');

function index(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

function upload(req, res) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(req,function(err, fields, files) {
        fs.renameSync(files.upload.path, "./tmp/text.png");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("received image:<br/>");
        res.write("<img src='/text.png' />");
        res.end();
    });
}

exports.index = index;
exports.upload = upload;
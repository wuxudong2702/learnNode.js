var formidable = require("formidable"),
http = require("http"),
util = require("util");

http.createServer(function(request,response){
    if(request.url == '/upload' && request.method.toLowerCase()== 'post'){
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(request,function(err,fields,files){
            response.writeHead(200,{'content-type':'text/plain'});
            response.write("received upload:\n\n");
            response.end(util.inspect({fuelds:fields,files:files}));
        });
        return;
    }

    // show a file upload form
    response.writeHead(200,{'content-type': 'text/html'});
    response.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">\
            <input type="text" name="title"><br>\
            <input type="file" name="upload" muitiple="multiple"><br>\
            <input type="submit" value="Upload">\
        </form>\
        '
    );
}).listen(8888);
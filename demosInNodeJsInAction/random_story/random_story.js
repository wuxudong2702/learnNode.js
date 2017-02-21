var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRssFile() {
    fs.exists(configFilename, function(exists) {
        if(!exists)
            return next(new Error('Missing RSS file:' + configFilename));

        next(null, configFilename);
    });
}

function readRSSFile (configFilename) {
    fs.readFile(configFilename, function(err, feedList) {
         if(err) return next(err);
         
         feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");
         var random = Math.floor(Math.random()*feedList.length);
        // Math.floor() 向下取整 
         next(null, feedList[random]); 
   });
}

function downloadRSSFeed(feedUrl) {
    request({uri: feedurl}, function(err, res, body) {
        if(err) return next(err);
        if(res.statusCode != 200)
            return next(new Error('Abnormal response status code'));
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
}
var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

modeule.exports = new Db(setting.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));
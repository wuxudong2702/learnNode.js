const mongoose = require('mongoose');

var Essay = new mongoose.Schema({
    title: String,
    create_time: Date,
    updata_time: Date,
    content: String,
    tag: Array
});
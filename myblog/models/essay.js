const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/myblog");


var essaySchema = new mongoose.Schema({
    title: String,
    create_time: Date,
    update_time: Date,
    content: String,
    tag: [String]
});

var Essay = mongoose.model('Essay', essaySchema);
module.exports = Essay;

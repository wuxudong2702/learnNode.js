const express = require('express');
const Essay = require('../models/essay');
const router = express.Router();

router.get('/', function(req, res) {
  Essay.find({}).exec(function(err, lists) {
    if(err) throw err;
    lists.forEach(function(list) {
      list.content = list.content.slice(0,40);
      list.editURL = `<a href='/api/edit/${list._id}'>编辑</a>`;
      list.delURL = `<a href='/api/del/${list._id}'>删除</a>`;
    });
    res.render('admin', {
      lists: lists
    });
  }); 
});

router.get('/add', function(req, res) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  var title = req.body.title;
  var tags = req.body.tags;
  var content = req.body.content;
  var essay = new Essay();
  essay.title = title;
  essay.tags = tags.split(' ');
  essay.content = content;
  essay.create_time = new Date();
  essay.update_time = new Date();
  essay.save(function(err) {
    if(err) throw err;
    console.log('meow');
  });
  res.redirect('../home/essay'); 
});
module.exports = router;
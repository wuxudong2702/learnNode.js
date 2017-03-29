const express = require('express');
const Essay = require('../models/essay');
const crypto = require('crypto');
const router = express.Router();

const decipher = crypto.createDecipher('base64');

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var essay = new Essay();
  Essay.find({'user': account}).exec(function (err, user) {
    if(err) throw err;
    if(decipher.update(password) === user.password) {
      res.redirect('/publish'); 
    }else{
      alert("密码错误");
    }
  });
});

router.get('/publish', function(req, res) {
  res.render('admin');
});
router.post('/', function(req, res, next) {
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
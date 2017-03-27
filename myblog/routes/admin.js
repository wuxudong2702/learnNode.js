const express = require('express');
const Essay = require('../models/essay');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  res.redirect('/publish'); 
})

router.get('/publish', function(req, res) {
  res.render('admin');
});


router.post('/', function(req, res, next) {
  var title = req.body.title;
  var tags = req.body.tags;
  var content = req.body.content;
  var essay = new Essay();
  essay.title = title;
  essay.tags = tags;
  essay.content = content;
  essay.create_time = new Date();
  essay.update_time = new Date();
  essay.save(function(err) {
    if(err) throw err;
    console.log('meow');
  })
  res.redirect('../home/essay'); 
})
module.exports = router;
const express = require('express');
const marked = require('marked');
const Essay = require('../models/essay');

const router = express.Router();

/* GET users listing. */
router.get('/essay', function(req, res, next) {
  Essay.find({}).exec(function(err, essays) {
    if(err) throw err;
    essays.forEach(function(essay) {
      essay.content = marked(essay.content);
      console.log(essay.content);
    });
    res.render('homepage', {
      essays: essays
    })
  });
  
});

module.exports = router;

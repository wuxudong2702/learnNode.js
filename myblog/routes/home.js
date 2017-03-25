const express = require('express');
const marked = require('marked');
const Essay = require('../models/essay');
const router = express.Router();

/* GET users listing. */
router.get('/essay', function(req, res, next) {
 console.log(Essay.find({}));
  res.render('homepage');
});

module.exports = router;

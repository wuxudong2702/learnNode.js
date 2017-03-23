var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/essay', function(req, res, next) {
  res.render('homepage');
})

module.exports = router;

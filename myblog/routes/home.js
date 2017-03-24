const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/essay', function(req, res, next) {
  res.render('homepage');
});

module.exports = router;

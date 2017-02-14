
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.hello = function(req,res) {
  res.send('Hello,My friend! \r' + 'The time is ' + new Date().toString());
};
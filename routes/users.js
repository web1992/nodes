var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET checkUser. */
router.get('/checkUser', function(req, res, next) {
  res.send('checkUser run');
});
module.exports = router;
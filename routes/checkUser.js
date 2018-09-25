var express = require('express');
var router = express.Router();

/* GET checkUser. */
router.get('/checkUser', function(req, res, next) {
  res.send('checkUser run');
});
module.exports = router;

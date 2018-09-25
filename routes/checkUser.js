var express = require('express');
var router = express.Router();

/* GET checkUser. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ code:200,msg:'ok',data: 1 ,}));
});
module.exports = router;

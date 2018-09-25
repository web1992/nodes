var express = require('express');
var router = express.Router();
const axios = require('axios');
const checkUserUrl='http://checkuser.sdk.quicksdk.net/v2/checkUserInfo'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET checkUser. */
router.get('/checkUser', function(req, res, next) {
  res.send('checkUser run');
});

router.get('/checkUserInfo', function(req, res, next) {
  //res.send('checkUser run');

  axios.get(checkUserUrl)
  .then(function (response) {
    // handle success
    console.log(response);
    const data =response.data;
    res.send(data+'');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send('error');
  })
  .then(function () {
    // always executed
  });
});



module.exports = router;

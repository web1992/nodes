var express = require('express');
var router = express.Router();
var axios = require('axios');
var xml = require('xml');
const checkUserUrl = 'http://checkuser.sdk.quicksdk.net/v2/checkUserInfo';
const productCode = '52877988295221592932512720453078';
const SUC = '1';

/* GET checkUser. */
router.get('/', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ code: 200, msg: 'ok', data: 0, }));
});

/* GET checkUser. */
router.get('/checkUser', function (req, res, next) {
	res.send('checkUser run');
});

router.get('/checkUserInfo', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	var params = req.query;
	var token = params.token;
	var uid = params.uid;
	if (!token) {
		res.send(JSON.stringify({ code: 200, msg: 'token不能为空', data: false, }));
	}
	if (!uid) {
		res.send(JSON.stringify({ code: 200, msg: 'uid不能为空', data: false, }));
	}
	var product_code = '';
	var channel_code = '';
	var reqParam = '?token=' + token + '&uid=' + uid + '&product_code=' + productCode;
	console.log("checkUserAction#reqParam=" + reqParam);
	axios.get(checkUserUrl + reqParam)
		.then(function (response) {
			const data = response.data;
			console.log("checkUserAction#data=" + data);
			if (SUC == data) {
				res.send(JSON.stringify({ code: 200, msg: '验证用户信息成功', data: true, }));
			} else {
				res.send(JSON.stringify({ code: 200, msg: '验证用户信息失败', data: false, }));
			}

		})
		.catch(function (error) {
			// handle error
			console.log(error);
			res.send(JSON.stringify({ code: 200, msg: '验证用户信息异常', data: false, }));
		})
		.then(function () {
			// always executed
		});
});

module.exports = router;

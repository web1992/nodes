
var express = require('express');
var md5 = require('md5');
var router = express.Router();
var convert = require('xml-js');
var config = require('../../conf/quicksdkConfig.json');
var paymentTxnDao = require("./../../lib/dao/paymentTxnDao");
const key = config.md5Key;
// const key = config.testKey;
const suc = "SUCCESS";
const fail = "fail";

/** 充值回调 */
/* POST payCallBack */
router.get('/', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ code: 200, msg: 'ok', data: 1, }));
});

router.get('/payCallBack', function (req, res, next) {
	//res.set('Content-Type', 'text/xml');

	try {
		var params = req.body;// post
		if (Object.keys(params).length == 0) {
			params = req.query;// get
		}
		console.log('payCallBackAction#params=', JSON.stringify(params));
		const nt_data = params.nt_data;
		const sign = params.sign;
		const md5Sign = params.md5Sign;

		if (!md5Sign || !nt_data || !sign) {
			res.send(fail + '回调参数错误');
			return;
		}

		const ourSign = md5(nt_data + sign + key);
		console.log('payCallBackAction md5Sign= ' + md5Sign + ' ourSign= ' + ourSign);
		var _xml = null;
		if (md5Sign == ourSign) {
			_xml = decode(nt_data, key);
			console.log('payCallBackAction _xml= ' + _xml);
		} else {
			console.log('payCallBackAction 签名错误');
			res.send(fail + '签名错误');
			return;
		}
		if (_xml) {
			// save to db
			// 处理成功时，返回suc
			var result = convert.xml2js(_xml, { compact: true, spaces: 4 });
			console.log('payCallBackAction result= ' + JSON.stringify(result));
			var payTxn = result['skymoons_message']['message'];
			console.log('payCallBackAction payTxn= ' + JSON.stringify(payTxn));
			var dao = new paymentTxnDao();
			//payTxn.amount._text
			var payTxnDomain={};
			for(var p in payTxn){
				//console.log(payTxn[p]._text);
				payTxnDomain[p]=payTxn[p]._text;
			 }

			// 查询订单是否存在
			var queryParam = {};
			queryParam.game_order = payTxnDomain.game_order;
			queryParam.channel = payTxnDomain.channel;
			dao.findPaymentTxn(queryParam, function (item) {
				console.log('payCallBackAction findPaymentTxn item  queryParam = ' + JSON.stringify(queryParam) + " length=" + item.items.length);
				if (item.status == 200 && item.items.length == 0) {
					//  插入数据
					dao.addPaymentTxn(payTxnDomain, function (addResult) {
						if (addResult.status == 200) {
							console.log('payCallBackAction#addPaymentTxn 添加订单成功= ', addResult.status);
						}
					});

				} else {
					// 已经存在直接返回成功
					console.log('payCallBackAction findPaymentTxn 订单已经存在= ' + JSON.stringify(payTxnDomain.game_order));
				}
			});
			// 返回成功
			res.send(suc);

		} else {
			// 处理失败
			res.send(fail);
			return;
		}
	}
	catch (err) {
		console.error('payCallBackAction err= ' + err);
		res.send(fail);
	}


});





//调用解密
//var xml = decode(str, key);
//console.log(xml);


//QuickSDK参数同步解码方法
//输入密文、callbackKey
//成功返回解密后的xml字符
//失败会空字符串,长度为0
function decode(str, key) {

	if (str.length <= 0) {
		return '';
	}

	var list = new Array();
	var resultMatch = str.match(/\d+/g);
	for (var i = 0; i < resultMatch.length; i++) {
		list.push(resultMatch[i]);
	}

	if (list.length <= 0) {
		return '';
	}

	var keysByte = stringToBytes(key);
	var dataByte = new Array();
	for (var i = 0; i < list.length; i++) {
		dataByte[i] = parseInt(list[i]) - (0xff & parseInt(keysByte[i % keysByte.length]));
	}

	if (dataByte.length <= 0) {
		return '';
	}

	var parseStr = bytesToString(dataByte);
	return parseStr;
}



function stringToBytes(str) {
	var ch, st, re = [];
	for (var i = 0; i < str.length; i++) {
		ch = str.charCodeAt(i);
		st = [];
		do {
			st.push(ch & 0xFF);
			ch = ch >> 8;
		} while (ch);
		re = re.concat(st.reverse());
	}
	return re;
}


function bytesToString(array) {
	return String.fromCharCode.apply(String, array);
}

module.exports = router;

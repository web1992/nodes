var express = require('express');
var router = express.Router();
var axios = require('axios');
var xml = require('xml');
const checkUserUrl='http://checkuser.sdk.quicksdk.net/v2/checkUserInfo';
const str = '@116@119@168@161@165@88@170@153@167@170@161@163@166@113@87@99@94@102@83@85@153@166@154@164@155@157@166@152@114@90@140@135@126@101@104@86@89@171@168@149@163@155@153@160@167@162@154@111@82@164@160@87@115@118@115@168@162@173@165@160@164@166@170@146@165@157@163@167@154@159@153@114@113@164@157@167@171@149@156@151@110@114@154@168@147@172@156@168@171@114@104@109@100@161@170@146@172@157@163@168@119@116@151@156@150@165@166@153@164@114@109@106@104@110@109@100@151@160@152@163@165@153@164@111@113@155@159@148@166@166@149@160@152@173@157@152@115@165@163@147@155@102@174@170@154@108@149@160@106@161@164@161@158@162@177@153@171@158@115@98@155@160@145@162@167@157@160@147@170@160@156@114@116@155@150@159@149@149@160@167@152@157@169@115@153@107@158@151@104@153@108@149@153@155@97@102@109@107@153@149@109@112@113@101@154@150@152@106@149@152@102@153@149@153@152@155@115@99@159@146@162@157@150@162@170@156@149@166@119@116@163@166@153@156@170@147@166@163@115@100@100@103@99@101@101@110@103@108@105@102@105@97@106@106@108@99@113@105@99@101@110@111@109@109@104@115@103@163@170@152@154@164@143@164@160@115@112@168@152@174@150@168@161@158@154@118@105@99@105@110@93@100@112@101@102@102@85@104@104@110@109@102@111@103@96@114@96@165@149@177@150@169@160@161@157@111@113@153@164@162@173@166@164@114@106@102@100@100@113@102@153@161@167@169@163@166@110@114@164@169@149@172@172@168@117@100@116@96@168@172@152@167@173@171@110@112@158@176@168@166@150@170@151@164@153@166@150@159@163@116@172@102@177@151@178@103@180@112@103@150@173@172@169@148@171@151@160@149@171@153@161@167@115@115@103@161@157@167@168@147@151@155@111@113@99@171@162@174@164@163@167@159@168@151@164@152@171@171@145@155@158@118';
const key = '88049844578484520615487574815873';

/* GET checkUser. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ code:200,msg:'ok',data: 1 ,}));
});

/* GET checkUser. */
router.get('/checkUser', function(req, res, next) {
  res.send('checkUser run');
});

router.get('/checkUserInfo', function(req, res, next) {
  res.set('Content-Type', 'text/xml');
  //res.send('checkUser run');
  var token='';
  var product_code='';
  var uid='';
  var channel_code='';

  axios.get(checkUserUrl)
  .then(function (response) {
    // handle success
    //console.log(response);
    const data =response.data;
    const _xml = decode(str,key);
    //res.send(xml);
    res.send(_xml);
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





//调用解密
var xml = decode(str,key);
console.log(xml);


//QuickSDK参数同步解码方法
//输入密文、callbackKey
//成功返回解密后的xml字符
//失败会空字符串,长度为0
function decode(str,key){

	if(str.length <= 0){
		return '';
	}

	var list = new Array();
	var resultMatch = str.match(/\d+/g);
	for(var i= 0;i<resultMatch.length;i++){
		list.push(resultMatch[i]);
	}

	if(list.length <= 0){
		return '';
	}
	
	var keysByte = stringToBytes(key);
	var dataByte = new Array();
	for(var i = 0 ; i < list.length ; i++){
		dataByte[i] = parseInt(list[i]) - (0xff & parseInt(keysByte[i % keysByte.length]));
	}

	if(dataByte.length <= 0){
		return '';
	}

	var parseStr = bytesToString(dataByte);
	return parseStr;
}



function stringToBytes (str) {  
	var ch, st, re = [];  
  	for (var i = 0; i < str.length; i++ ) {  
    	ch = str.charCodeAt(i);
    	st = []; 
    	do {  
      		st.push( ch & 0xFF );
      		ch = ch >> 8;
    	}while ( ch );  
    	re = re.concat( st.reverse() );  
	}  
  	return re;  
} 


function bytesToString(array) {
  return String.fromCharCode.apply(String, array);
}

module.exports = router;

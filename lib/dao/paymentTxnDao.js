/**
 * Created by web1992.
 */
var Monogo = require("./mongodb/mongo");
var status = require('./mongodb/status');
var db = new Monogo('paymentTxn');

var Handler = function(){
};

Handler.prototype = {
    addPaymentTxn : function(opts,callback){
        db.create(opts,function(item){
            callback(item);
        });
    },
    findPaymentTxn : function(opts,callback){
        db.read(opts,function(res){
            callback(res);
        });
    },
    getPaymentTxList : function(channel,channelUid,callback){
        db.read({"channel":channel,"channel_uid":channelUid},function(res){
            callback(res);
        });
    },
    getPaymentByGameOrder : function(game_order,callback){
        db.read({"game_order":game_order},function(res){
            callback(res);
        });
    }
};

module.exports = Handler;
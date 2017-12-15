
var crypto = require('crypto');
var config = require('../config');
var request = require('request');
class Wechat {

    construct() {
        this.ownerCheck.bind(this);
        this.checkSignature.bidn(this);
    }

    //认证接口配置信息
    ownerCheck(req, res, next) {
        var data = req.query;
        var signature = data["signature"];
        var timestamp = data["timestamp"];
        var nonce = data["nonce"];
        var echostr = data["echostr"];
        if (signature && this.checkSignature(signature, timestamp, nonce)) {
            console.log('signature is ok.');
            res.send(echostr);
        }
    }

    checkSignature(signature, timestamp, nonce) {
        var token = config["token"];
        var arr = [token, timestamp, nonce];
        arr.sort();

        var contentStr = "";
        for (var i = 0; i < arr.length; i++) {
            contentStr = contentStr.toString() + arr[i].toString();
        }

        var encryptedStr = crypto.createHash('sha1').update(contentStr).digest('hex');

        return encryptedStr == signature? true: false;
    }

    //重定向获取微信Code
    getStartURLToGetCode() {
        var takenUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";

        takenUrl= takenUrl.replace("APPID", config.appID);
        takenUrl= takenUrl.replace("REDIRECT_URI", encodeURIComponent(config.redirectUri));
        takenUrl= takenUrl.replace("SCOPE", "snsapi_userinfo");
        console.log('takenUrl: ', takenUrl);
        return takenUrl;
    }

    //通过code换取网页授权access_token
    wechatCallback(req, res, next) {
        var data = req.query;

        var authUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
        authUrl = authUrl.replace("APPID", config.appID);
        authUrl = authUrl.replace("SECRET", config.appsecret);
        authUrl = authUrl.replace("CODE", data['code']);
        console.log('authUrl: ', authUrl);
        request(authUrl, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            //TO DO Logic
        });
    }
}

module.exports = new Wechat();

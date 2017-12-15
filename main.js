var express = require('express');
var querystring = require('querystring');
var http = require('http');
var app = express();

var wechat = require('./controller/wechat');

app.get('/wechat/ownerCheck', function (req, res, next) {
    console.log('wechat/ownerCheck GET');
    try {
        wechat.ownerCheck(req, res, next);
    } catch(err) {
        console.log('ownerCheak err: ', err);
    }
})

app.get('/', function (req, res, next) {
    console.log('h5 page start')
    res.redirect(302, wechat.getStartURLToGetCode());
})

app.get('/wechatCallback', function (req, res, next) {
    console.log('wechatCallback')
    wechat.wechatCallback(req, res, next);
})


var httpServer = http.createServer(app);
httpServer.listen(80);

console.log('server start listen port: ' + 80);

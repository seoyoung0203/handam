"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
var alarmUtil;
(function (alarmUtil) {
    const file = './packages/utils/config/env.json';
    let alarmData = fs.readFileSync(file, 'utf8');
    alarmData = JSON.parse(alarmData);
    /**
     * 알림 전송
     * @param sendParams
     */
    function sendAlarm(sendParams) {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `${alarmData.alarm.authorization}`
        };
        let message = sendParams;
        message.app_id = alarmData.alarm.appId;
        let options = {
            host: 'onesignal.com',
            port: 443,
            path: '/api/v1/notifications',
            method: 'POST',
            headers: headers
        };
        if (alarmData.alarm.isPublish === true) {
            let https = require('https');
            let req = https.request(options, function (res) {
                res.on('data', function (message) {
                    console.log('Response:');
                    console.log(JSON.parse(message));
                });
            });
            req.on('error', function (e) {
                console.log('ERROR:');
                console.log(e);
            });
            req.write(JSON.stringify(message));
            req.end();
        }
    }
    alarmUtil.sendAlarm = sendAlarm;
})(alarmUtil = exports.alarmUtil || (exports.alarmUtil = {}));
//# sourceMappingURL=alarm.util.js.map
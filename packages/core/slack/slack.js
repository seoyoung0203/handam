"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs = require("fs");
class Slack {
    constructor(paths) {
        this.paths = paths;
        this.paths = (this.paths) ? this.paths : {
            deploy: 'T8L9Z0KGC/BC6G0C4CF/uuKe61Z8pfbA6aEc86YZt6SL',
            report: 'T8L9Z0KGC/BF8QZNNQ6/HmLda4Al4DtfsXjsRZnPgLAP',
            replyReport: 'T8L9Z0KGC/BFADB9YF5/6IScmVnXZsBMxDZvc8gAldQm'
        };
    }
    /**
     * 슬렉 메시지 전송
     * @param channel
     * @param message
     * @returns {string}
     */
    sendMessage(channel, message) {
        const path = this.getChannelPath(channel);
        const url = `https://hooks.slack.com/services/${path}`;
        const options = {
            url: `https://hooks.slack.com/services/${path}`,
            method: 'POST',
            json: true,
            body: message
        };
        /**
         * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
         */
        setImmediate(() => {
            axios_1.default.post(url, message)
                .then((response) => response.data)
                .catch((err) => {
                console.log(err);
            });
        });
    }
    sendReportMessage(channel, field, color) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = './packages/utils/config/env.json';
            // let envData: any = await fs.readFileSync(postsFile, 'utf8');
            // envData = JSON.parse(envData);
            const path = this.getChannelPath(channel);
            const url = `https://hooks.slack.com/services/${path}`;
            const message = {
                attachments: [
                    {
                        'color': color,
                        'mrkdwn_in': ['text', 'fields'],
                        'fields': [field]
                    }
                ]
            };
            /**
             * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
             */
            setImmediate(() => {
                axios_1.default.post(url, message)
                    .then((response) => response.data)
                    .catch((err) => {
                    console.log(err);
                });
            });
        });
    }
    sendDeployMessage(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            /** 환경변수 파일 읽어오기 */
            const file = './packages/utils/config/env.json';
            let envData = yield fs.readFileSync(file, 'utf8');
            envData = JSON.parse(envData);
            const path = this.getChannelPath(channel);
            const url = `https://hooks.slack.com/services/${path}`;
            const message = {
                attachments: [
                    {
                        'color': '#36a64f',
                        'mrkdwn_in': ['text', 'fields'],
                        'fields': [
                            {
                                'title': `H6-server 서버 배포`,
                                'value': `${envData.stage} 스테이지 서버가 정상적으로 배포되었습니다.`,
                                'short': false
                            }
                        ]
                    }
                ]
            };
            const options = {
                url: `https://hooks.slack.com/services/${path}`,
                method: 'POST',
                json: true,
                body: message
            };
            /**
             * 슬랙 메시지 전송 실패시 서버 에러가 발생하지 않게 하기 위해 setImmediate으로 처리
             */
            setImmediate(() => {
                axios_1.default.post(url, message)
                    .then((response) => response.data)
                    .catch((err) => {
                    console.log(err);
                });
            });
        });
    }
    /**
     * Webhook path 선택
     * @param channel
     * @returns string
     */
    getChannelPath(channel) {
        const path = this.paths[channel];
        if (!path) {
            throw new Error('Channels not supported');
        }
        return path;
    }
}
exports.Slack = Slack;
exports.slack = new Slack();
//# sourceMappingURL=slack.js.map
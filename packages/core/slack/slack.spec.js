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
const fs = require("fs");
const slack_1 = require("./slack");
describe('slack', () => {
    it('sendMessage - 메시지 전송 성공', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = './packages/utils/config/env.json';
        let envData = yield fs.readFileSync(file, 'utf8');
        envData = JSON.parse(envData);
        yield slack_1.slack.sendMessage('deploy', {
            attachments: [
                {
                    'color': '#36a64f',
                    'mrkdwn_in': ['text', 'fields'],
                    'fields': [
                        {
                            'title': `${envData.stage} 서버 배포`,
                            'value': `${envData.stage} 서버가 정상적으로 배포되었습니다.`,
                            'short': false
                        }
                    ]
                }
            ]
        });
    })).timeout(1000 * 60);
});
//# sourceMappingURL=slack.spec.js.map
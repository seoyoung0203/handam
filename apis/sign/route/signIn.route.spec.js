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
const chai_1 = require("chai");
const request = require("supertest");
describe('signIn 라우트', () => {
    it('signInRoutes', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield request('http://localhost:80')
            .post('/signIn')
            .send({
            userId: 'mochatest@gmail.com',
            userPw: 'mochatest'
        })
            .set('Content-Type', 'application/x-www-form-urlencoded');
        result = result.toJSON();
        result.text = JSON.parse(result.text);
        delete result.text.result.createdAt;
        delete result.text.result.updatedAt;
        delete result.text.result.token;
        // console.log(result);
        chai_1.expect(result.text).to.be.eqls({
            success: true,
            statusCode: 200,
            message: 'getUser: 200',
            result: {
                userIndex: 487,
                userId: 'mochatest@gmail.com',
                userNickName: 'testtest',
                major: '산업경영공학과',
                minor: null,
                doubleMajor: null,
                connectedMajor: null,
                admissionYear: 2018,
                avatar: null,
                status: 'ACTIVE',
                isValidation: 0,
                appId: null,
                isPostsAlarm: 1,
                isNonSubjectPointAlarm: 1
            }
        });
    }));
});
//# sourceMappingURL=signIn.route.spec.js.map
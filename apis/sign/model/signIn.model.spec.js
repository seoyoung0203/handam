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
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const user_model_1 = require("../../user/model/user.model");
const signIn_model_1 = require("./signIn.model");
describe('signIn 모델', () => {
    let userId = 'testUserId';
    let userPw = 'testUserPw';
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield user_model_1.user.createUser({
                userId: userId,
                userPw: encryption_util_1.encriptionPw.getHash(userPw),
                userNickName: 'testUserNickName',
                major: 'testMajor',
                admissionYear: '2018'
            });
            chai_1.expect(result).to.be.eqls({
                userId: userId,
                userPw: encryption_util_1.encriptionPw.getHash(userPw),
                userNickName: 'testUserNickName',
                major: 'testMajor',
                admissionYear: '2018'
            });
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.deleteUser(userId);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield signIn_model_1.signIn.getUser({
            userId: userId,
            userPw: userPw
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=signIn.model.spec.js.map
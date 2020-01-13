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
const user_model_1 = require("./user.model");
describe('user 모델', () => {
    let userId;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield user_model_1.user.createUser({
                userId: 'testUserId',
                userPw: 'testUserPw',
                userNickName: 'testUserNickName',
                major: 'testMajor',
                admissionYear: '2018'
            });
            // console.log(result);
            userId = result.userId;
            chai_1.expect(result).to.be.eqls({
                userId: 'testUserId',
                userPw: 'testUserPw',
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
    it('createUserLog', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.createUserLog({
            userId: userId,
            log: 'SignIn success'
        });
        // console.log(result);
        chai_1.expect(result).to.be.eqls({
            userId: userId,
            log: 'SignIn success'
        });
    }));
    it('getUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.getUser(userId);
        // console.log(result);
        delete result[0].userIndex;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        chai_1.expect(result).to.be.eqls([{
                userId: 'testUserId',
                userPw: 'testUserPw',
                userNickName: 'testUserNickName',
                major: 'testMajor',
                minor: null,
                status: null,
                doubleMajor: null,
                connectedMajor: null,
                avatar: null,
                appId: null,
                isPostsAlarm: 1,
                isNonSubjectPointAlarm: 1,
                admissionYear: 2018,
                isValidation: 0
            }]);
    }));
    it('updateUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.updateUser(userId, {
            major: 'updateTestMajor'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateUserNickName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.updateUserNickName(userId, 'updatedNickName');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('checkUserNickName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.checkUserNickNameForUpdate('checkUserNickName');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=user.model.spec.js.map
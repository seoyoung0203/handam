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
const userValidation_model_1 = require("./userValidation.model");
describe('userValidation 모델', () => {
    let resultCreateUser;
    let testUserId = '이미 존재하는 아이디';
    let testUserId2 = '사용 가능한 아이디';
    let testUserPw = 'marine1164';
    let testUserNickName = '이미 존재하는 닉네임';
    let testUserNickName2 = '사용 가능한 닉네임';
    let testMajor = '산업경영공학과';
    let testAdmissionYear = 2012;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            resultCreateUser = yield user_model_1.user.createUser({
                userId: testUserId,
                userPw: yield encryption_util_1.encriptionPw.getHash(testUserPw),
                userNickName: testUserNickName,
                major: testMajor,
                admissionYear: testAdmissionYear
            });
            /** validation 체크 */
            chai_1.expect(resultCreateUser).instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_model_1.user.deleteUser(resultCreateUser.userId);
            yield userValidation_model_1.userValidation.deleteUserValidation(resultCreateUser.userId);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createUserValidation', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.createUserValidation({
            userId: testUserId
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkUserId - 사용 가능한 아이디', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkUserId(testUserId2);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkUserNickName - 사용 가능한 닉네임', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkUserNickName(testUserNickName2);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkUserPw', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkUserPw(testUserId, testUserPw);
        // console.log(result);
        chai_1.expect(result).instanceof(Array);
    }));
    it('getBlockUserNicName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.getBlockUserNickName('testUserNickName');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    // let tmpUserId: string = 'ychooni@naver.com';
    let tmpUuid = 'qwer1234';
    it('setUuid', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.setUuid(testUserId, tmpUuid);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getValidationCode', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.getValidationCode(testUserId);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
        chai_1.expect(result[0].validationCode).to.eql(tmpUuid);
    }));
    /* Timeout 2000ms
    it('sendValidationMail && sendPasswordMail', async () => {
        const result = await userValidation.sendPasswordMail({
            to: tmpUserId,
            subject: '한담 비밀번호 재발급 메일',
            html: `${tmpUserId} 님 안녕하세요. <br><br> 임시비밀번호 전송 테스트메일 입니다. <br><br>`
        });
        expect(result).to.eql('send ok');
    });
    */
    it('getUserIdData', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.getUserIdData(tmpUuid);
        chai_1.expect(result).to.instanceof(Array);
        chai_1.expect(result[0].userId).to.eql(testUserId);
    }));
    it('getUpdateAt', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.getUpdatedAt(testUserId);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('verifyValidation', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.verifyValidation(tmpUuid);
        chai_1.expect(result).to.eql('Email is been Successfully verified');
    }));
});
//# sourceMappingURL=userValidation.model.spec.js.map
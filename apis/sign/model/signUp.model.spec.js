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
const user_model_1 = require("../../user/model/user.model");
const signUp_model_1 = require("./signUp.model");
describe('signUp 모델', () => {
    let testUserId = '이현아';
    let testUserPw = '12345';
    let testUserNickName = '서울';
    it('createUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield signUp_model_1.signUp.createUser({
            userId: testUserId,
            userPw: testUserPw,
            userNickName: testUserNickName
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_model_1.user.deleteUser(testUserId);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=signUp.model.spec.js.map
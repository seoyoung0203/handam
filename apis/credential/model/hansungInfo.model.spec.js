"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hansungInfo_model_1 = require("./hansungInfo.model");
describe('hansungInfo 모델', () => __awaiter(this, void 0, void 0, function* () {
    let createHansungInfo;
    it('createHansungInfo', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield hansungInfo_model_1.hansungInfo.createHansungInfo({
            userIndex: 1,
            hansungInfoId: 'testHansungInfoId',
            hansungInfoPw: 'testHansungInfoPw',
            accessCount: 0
        });
        createHansungInfo = result;
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listHansungInfo', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield hansungInfo_model_1.hansungInfo.listHansungInfo(createHansungInfo.userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getHansungInfo', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(createHansungInfo.userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateHansungInfo', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield hansungInfo_model_1.hansungInfo.updateHansungInfo(createHansungInfo.userIndex, {
            accessCount: 5
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteHansungInfo', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield hansungInfo_model_1.hansungInfo.deleteHansungInfo(1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
}));
//# sourceMappingURL=hansungInfo.model.spec.js.map
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
const credential_model_1 = require("./credential.model");
describe('credential 모델', () => __awaiter(this, void 0, void 0, function* () {
    let createCredential;
    it('createCredential', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield credential_model_1.credential.createCredential({
            userIndex: 1,
            hansungInfoId: 'testCredentialId'
        });
        createCredential = result;
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listCredential', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield credential_model_1.credential.listCredential(createCredential.userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getCredential', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield credential_model_1.credential.getCredential(createCredential.userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateCredential', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield credential_model_1.credential.updateCredential(createCredential.userIndex, {
            accessCount: 5
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteCredential', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield credential_model_1.credential.deleteCredential(1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
}));
//# sourceMappingURL=credential.model.spec.js.map
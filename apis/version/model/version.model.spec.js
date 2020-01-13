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
const version_model_1 = require("./version.model");
describe('version 모델', () => {
    let testVersionIndex;
    /** 테스트 용도로 사용 */
    // it('createVersion', async () => {
    // 	const result = await version.createVersion({
    // 		android: '1.0.0',
    // 		ios: '1.0.0'
    // 	});
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // });
    it('getVersion', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield version_model_1.version.getVersion();
        // console.log(result);
        testVersionIndex = result.versionIndex;
        chai_1.expect(result).instanceof(Object);
    }));
    it('updateVersion', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield version_model_1.version.updateVersion(testVersionIndex, {
            android: '1.0.1',
            ios: '1.0.1'
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    /** 테스트 용도로 사용 */
    // it('deleteVersion', async () => {
    // 	const result = await version.deleteVersion(testVersionIndex);
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // })
});
//# sourceMappingURL=version.model.spec.js.map
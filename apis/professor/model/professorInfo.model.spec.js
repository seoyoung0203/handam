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
const professorInfo_model_1 = require("./professorInfo.model");
describe('professorInfo 모델', () => {
    let resultProfessorInfo;
    let professorIndex = 1;
    it('createProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.createProfessorInfo({
            professorIndex: professorIndex,
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.getProfessorInfo(professorIndex);
        //console.log('getProfessorInfo', result);
        resultProfessorInfo = result;
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.listProfessorInfo();
        //console.log('listProfessorInfo', result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.pageListProfessorInfo(0, 6, `department like 크리에이티브`);
        //console.log('pageListProfessorInfo', result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.updateProfessorInfo(resultProfessorInfo[0].professorInfoIndex, {
            avgLecturePower: 1,
            avgHomework: 1,
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteProfessorInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorInfo_model_1.professorInfo.deleteProfessorInfo(resultProfessorInfo[0].professorIndex);
        //console.log('deleteProfessorInfo',result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=professorInfo.model.spec.js.map
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
const professor_model_1 = require("./professor.model");
describe('professor 모델', () => {
    let testProfessorName = '이현아';
    let testDepartment = '컴퓨터';
    let testAddress = '서울';
    let testTel = '01023074151';
    let testEmail = 'lha0610@naver.com';
    it('createProfessor', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.createProfessor({
            professorName: testProfessorName,
            department: testDepartment,
            address: testAddress,
            tel: testTel,
            email: testEmail
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listProfessor', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.listProfessor();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorByProfessorIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.getProfessorByProfessorIndex(0);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorByProfessorName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.getProfessorByProfessorName('이현아');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateProfessor', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.updateProfessor(0, {
            professorName: '나다'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteProfessor', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professor_model_1.professor.deleteProfessor(0);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=professor.model.spec.js.map
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
const professorReply_model_1 = require("./professorReply.model");
describe('professorReply 모델', () => {
    let testProfessorInfoIndex = 1;
    let testUserIndex = 1;
    let testLecturePower = 3;
    let testHomework = 3;
    let testElasticity = 4;
    let testRecommendation = 3;
    let testCommunication = 4;
    let testGrade = 4;
    let testContent = 'professor content';
    it('createProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.createProfessorReply({
            professorInfoIndex: testProfessorInfoIndex,
            userIndex: testUserIndex,
            lecturePower: testLecturePower,
            homework: testHomework,
            elasticity: testElasticity,
            communication: testCommunication,
            recommendation: testRecommendation,
            grade: testGrade,
            content: testContent
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.listProfessorReply(testProfessorInfoIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.pageListProfessorReply(testProfessorInfoIndex, 3, 0);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('myProfessorReplyPostList', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.myProfessorReplyPostList(1);
        //console.log(result);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.getProfessorReply(4);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorReplyByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.getProfessorReplyByUserIndex(testProfessorInfoIndex, testUserIndex);
        console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('averageProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.averageProfessorReply(1);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.updateProfessorReply(0, {
            homework: 1,
            content: '테스트 수정'
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteProfessorReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReply_model_1.professorReply.deleteProfessorReply(0);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=professorReply.model.spec.js.map
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
const lectureInfo_model_1 = require("./lectureInfo.model");
describe('lectureInfo 모델', () => {
    it('createLectureInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.createLectureInfo({
            lectureIndex: 11,
            professorIndex: 3,
            textbookIndex: null,
            average: 0
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listLectureInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.listLectureInfo();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListLectureInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfo(3, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listLectureInfoBySearchTerm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.listLectureInfoBySearchTerm('os');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListLectureInfoBySearchTerm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoBySearchTerm('os', 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureInfoByLectureInfoIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByLectureInfoIndex(1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listLectureInfoByLectureName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.listLectureInfoByLectureName('os');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureInfoByLectureName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoByLectureName('os', 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listLectureInfoByProfessorName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.listLectureInfoByProfessorName('안재성');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureInfoByProfessorName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoByProfessorName('안재성', 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateLectureInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.updateLectureInfo(2, {
            average: 2
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateLectureInfoAverage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.updateLectureInfoAverage(2, 1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteLectureInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureInfo_model_1.lectureInfo.deleteLectureInfo(6);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=lectureInfo.model.spec.js.map
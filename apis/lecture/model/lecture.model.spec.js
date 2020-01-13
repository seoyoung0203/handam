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
const lecture_model_1 = require("./lecture.model");
describe('lecture 모델', () => {
    let testLectureIndex;
    let testLectureCode = 'IDE001';
    let testLectureName = 'Node.js';
    let testTrack = '영미문학문화 트랙';
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            /** lecture 생성 */
            const resultCreateLecture = yield lecture_model_1.lecture.createLecture({
                lectureCode: testLectureCode,
                lectureName: testLectureName,
                track: testTrack
            });
            /** validation 체크 */
            chai_1.expect(resultCreateLecture).instanceof(Object);
            /** lecture lectureCode 조회 */
            const resultGetLectureByLectureCode = yield lecture_model_1.lecture.getLectureByLectureCode(testLectureCode);
            /** validation 체크 */
            chai_1.expect(resultGetLectureByLectureCode).to.instanceof(Array);
            /** lecture 칼럼 값 */
            const lectureData = resultGetLectureByLectureCode;
            testLectureIndex = lectureData[0].lectureIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield lecture_model_1.lecture.deleteLecture(testLectureIndex);
            chai_1.expect(result).instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    /** 테스트 용도로 사용 */
    // it('createLecture', async () => {
    // 	const result = await lecture.createLecture({
    // 		lectureCode: 'IDE0001',
    // 		lectureName: 'Node.js',
    // 		professorIndex: 3,
    // 		track: 'IT'
    // 	});
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // });
    it('listLecture', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.listLecture();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureByLectureIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.getLectureByLectureIndex(testLectureIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureByLectureCode', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.getLectureByLectureCode(testLectureCode);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureByLectureName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.getLectureByLectureName(testLectureName);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureByTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.getLectureByTrack(testTrack);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateLecture', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lecture_model_1.lecture.updateLecture(testLectureIndex, {
            lectureCode: 'IDE0002',
            lectureName: 'Node.js 실습'
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    /** 테스트 용도로 사용 */
    // it('deleteLecture', async () => {
    // 	const result = await lecture.deleteLecture(testLectureIndex);
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // })
});
//# sourceMappingURL=lecture.model.spec.js.map
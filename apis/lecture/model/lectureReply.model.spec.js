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
const lectureReply_model_1 = require("./lectureReply.model");
describe('lectureReply 모델', () => {
    let testLectureReplyIndex;
    let testLectureInfoIndex;
    let testUserIndex;
    let testUserId;
    let testUserNickName;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield lectureReply_model_1.lectureReply.createLectureReply({
                lectureInfoIndex: 179,
                userIndex: 1,
                semester: '17년도 2학기',
                homework: '보통',
                homeworkType: '팀 프로젝트',
                testCount: 2,
                receivedGrade: 'A',
                review: '노광현 교수님 휴강이 많지만 좋아요',
                score: 4
            });
            /** validation 체크 */
            chai_1.expect(result).to.instanceof(Object);
            /** lectureReply lectureInfoIndex 조회 */
            const resultListLectureReplyByLectureInfoIndex = yield lectureReply_model_1.lectureReply.listLectureReplyByLectureInfoIndex(179);
            /** validation 체크 */
            chai_1.expect(resultListLectureReplyByLectureInfoIndex).to.instanceof(Array);
            /** lectureReply 칼럼 값 */
            const lectureReplyData = resultListLectureReplyByLectureInfoIndex;
            testLectureReplyIndex = lectureReplyData[0].lectureReplyIndex;
            testLectureInfoIndex = lectureReplyData[0].lectureInfoIndex;
            testUserIndex = lectureReplyData[0].userIndex;
            testUserId = lectureReplyData[0].userId;
            testUserNickName = lectureReplyData[0].userNickName;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield lectureReply_model_1.lectureReply.deleteLectureReply(testLectureReplyIndex);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    /** 테스트 용도로 사용 */
    // it('createLectureReply', async () => {
    // 	const result = await lectureReply.createLectureReply({
    // 		lectureInfoIndex: 1,
    // 		userIndex: 9,
    // 		semester: '17년도 2학기',
    // 		homework: '보통',
    // 		homeworkType: 1,
    // 		testCount: 2,
    // 		receivedGrade: 2,
    //    review: '노광현 교수님 휴강이 많지만 좋아요',
    // 		score: 4
    // 	});
    // 	console.log(result);
    // 	expect(result).to.instanceof(Object);
    // });
    it('scoreGetLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.scoreGetLectureReply(testLectureInfoIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('countGetLectureReplyByLectureInfoIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(187);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    /** 리플을 이미 남겼기 때문에 오류 발생 */
    it('checkGetLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.checkGetLectureReply(testLectureInfoIndex, 0);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('checkUpdateLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.checkUpdateLectureReply(testLectureInfoIndex, testUserIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.listLectureReply();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageListLectureReply(1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByLectureReplyIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(testLectureReplyIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByLectureReplyIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByLectureReplyIndex(testLectureReplyIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByLectureInfoIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.listLectureReplyByLectureInfoIndex(testLectureInfoIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByLectureInfoIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByLectureInfoIndex(testLectureInfoIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.getLectureReplyByUserIndex(testUserIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageGetLectureReplyByUserIndex(testUserIndex, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyUserId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.listLectureReplyByUserId(testUserId);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByUserId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByUserId(testUserId, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getLectureReplyByUserNickName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.listLectureReplyByUserNickName(testUserNickName);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageGetLectureReplyByUserNickName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByUserNickName(testUserNickName, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateLectureReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureReply_model_1.lectureReply.updateLectureReply(testLectureReplyIndex, {
            receivedGrade: 1,
            review: '노광현 교수님 수업은 재매있지만 휴강이 많아요ㅠㅠㅠ',
            score: 1
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    /** 테스트 용도로 사용 */
    // it('deleteLectureReply', async () => {
    // 	const result = await lectureReply.deleteLectureReply(2);
    // 	// console.log(result);
    // 	expect(result).to.instanceof(Object);
    // });
    /** 테스트 용도로 사용 */
    // it('deleteLectureReplyByUserIndex', async () => {
    // 	const result = await lectureReply.deleteLectureReplyByUserIndex(9);
    // 	// console.log(result);
    // 	expect(result).to.instanceof(Object);
    // });
});
//# sourceMappingURL=lectureReply.model.spec.js.map
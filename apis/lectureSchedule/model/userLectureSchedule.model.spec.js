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
const userLectureSchedule_model_1 = require("./userLectureSchedule.model");
describe('userLectureSchedule 모델', () => {
    let testUserLectureScheduleIndex = 2;
    let testUserIndex = 1;
    let testLectureScheduleIndex = 1;
    let testGrade = '3';
    it('createUserLectureSchedule', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userLectureSchedule_model_1.userLectureSchedule.createUserLectureSchedule({
            userIndex: testUserIndex,
            lectureScheduleIndex: testLectureScheduleIndex,
            grade: testGrade,
        });
        chai_1.expect(result).to.instanceOf(Object);
    }));
    it('getUserLectureSchedule', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userLectureSchedule_model_1.userLectureSchedule.getUserLectureSchedule(testUserLectureScheduleIndex);
        chai_1.expect(result).to.instanceOf(Array);
    }));
    it('updateUserLectureSchedule', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userLectureSchedule_model_1.userLectureSchedule.updateUserLectureSchedule(testUserLectureScheduleIndex, {
            grade: '2',
        });
        chai_1.expect(result).to.instanceOf(Object);
    }));
    it('deleteUserLectureSchedule', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userLectureSchedule_model_1.userLectureSchedule.deleteUserLectureSchedule(testUserLectureScheduleIndex);
        chai_1.expect(result).to.instanceOf(Object);
    }));
});
//# sourceMappingURL=userLectureSchedule.model.spec.js.map
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
const lectureSchedule_model_1 = require("./lectureSchedule.model");
describe('lectureSchedule 모델', () => {
    let testLectureSemesterKey = '';
    let testLectureTrackKey = '';
    it('listLectureSemester', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureSchedule_model_1.lectureSchedule.listLectureSemester();
        chai_1.expect(result).to.instanceOf(Array);
    }));
    it('listLectureTrack', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureSchedule_model_1.lectureSchedule.listLectureTrack();
        chai_1.expect(result).to.instanceOf(Array);
    }));
    it('listLectureSchedule', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield lectureSchedule_model_1.lectureSchedule.listLectureSchedule(testLectureSemesterKey, testLectureTrackKey);
        chai_1.expect(result).to.instanceOf(Array);
    }));
});
//# sourceMappingURL=lectureSchedule.model.spec.js.map
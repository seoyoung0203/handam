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
const express = require("express");
const lectureSchedule_model_1 = require("../model/lectureSchedule.model");
class LectureScheduleRoutes {
    constructor() {
        this.lectureScheduleRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureScheduleRouter.get('/lectureSchedule/lectureSemesterKey', listLectureSemester);
        this.lectureScheduleRouter.get('/lectureSchedule/lectureTrackKey', listLectureTrack);
        this.lectureScheduleRouter.get('/lectureSchedule/lectureScheduleIndex/:lectureSemesterKey/:lectureTrackKey', listLectureSchedule);
    }
}
exports.LectureScheduleRoutes = LectureScheduleRoutes;
function listLectureSemester(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureSchedule_model_1.lectureSchedule.listLectureSemester();
            res.send({
                success: true,
                stateCode: 200,
                result,
                message: 'lectureSemester list : 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    console.log(err);
                    res.send({
                        success: false,
                        stateCode: 500,
                        message: 'lectureSemester list : 500'
                    });
                    break;
            }
        }
    });
}
function listLectureTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lectureSchedule_model_1.lectureSchedule.listLectureTrack();
            res.send({
                success: true,
                stateCode: 200,
                result,
                message: 'lectureTrack list : 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        stateCode: 500,
                        message: 'lectureTrack list : 500'
                    });
                    break;
            }
        }
    });
}
function listLectureSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { lectureSemesterKey } = req.params.lectureSemesterKey;
            const { lectureTrackKey } = req.params.lectureTrackKey;
            const result = yield lectureSchedule_model_1.lectureSchedule.listLectureSchedule(lectureSemesterKey, lectureTrackKey);
            res.send({
                success: true,
                stateCode: 200,
                result,
                message: 'lectureSchedule list : 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        stateCode: 500,
                        message: 'lectureSchedule list : 500'
                    });
                    break;
            }
        }
    });
}
exports.lectureScheduleRoutes = new LectureScheduleRoutes();
//# sourceMappingURL=lectureSchedule.route.js.map
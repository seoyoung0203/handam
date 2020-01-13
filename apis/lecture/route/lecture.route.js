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
const lecture_resource_1 = require("../../../resources/lecture.resource");
const lecture_model_1 = require("../model/lecture.model");
class LectureRoutes {
    constructor() {
        this.lectureRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureRouter.post('/lecture', createLecture);
        this.lectureRouter.get('/lecture', listLecture);
        this.lectureRouter.get('/lecture/lectureIndex/:lectureIndex', getLectureByLectureIndex);
        this.lectureRouter.get('/lecture/lectureCode/:lectureCode', getLectureByLectureCode);
        this.lectureRouter.get('/lecture/lectureName/:lectureName', getLectureByLectureName);
        this.lectureRouter.get('/lecture/track/:track', getLectureByTrack);
        this.lectureRouter.put('/lecture/lectureIndex/:lectureIndex', updateLecture);
        this.lectureRouter.delete('/lecture/lectureIndex/:lectureIndex', deleteLecture);
    }
}
exports.LectureRoutes = LectureRoutes;
/**
 * route: lecture 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureData = new lecture_resource_1.LectureResource(req.body);
        try {
            const result = yield lecture_model_1.lecture.createLecture(lectureData.getLecture());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createLecture: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createLecture: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield lecture_model_1.lecture.listLecture();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'listLecture: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listLecture: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureIndex = req.params.lectureIndex;
            const result = yield lecture_model_1.lecture.getLectureByLectureIndex(lectureIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureByLectureIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureByLectureIndex: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture code 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureCode = req.params.lectureCode;
            const result = yield lecture_model_1.lecture.getLectureByLectureCode(lectureCode);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureByLectureCode: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureByLectureCode: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture lectureName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByLectureName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureName = req.params.lectureName;
            const result = yield lecture_model_1.lecture.getLectureByLectureName(lectureName);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureByLectureName: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureByLectureName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture track 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureByTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let track = req.params.track;
            const result = yield lecture_model_1.lecture.getLectureByTrack(track);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureByTrack: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureByTrack: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureIndex = req.params.lectureIndex;
            let lectureData = new lecture_resource_1.LectureResource(req.body);
            const result = yield lecture_model_1.lecture.updateLecture(lectureIndex, lectureData.getLecture());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateLecture: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateLecture: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lecture 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectureIndex = req.params.lectureIndex;
            const result = yield lecture_model_1.lecture.deleteLecture(lectureIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteLecture: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteLecture: 50000'
                    });
                    break;
            }
        }
    });
}
exports.lectureRoutes = new LectureRoutes();
//# sourceMappingURL=lecture.route.js.map
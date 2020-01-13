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
const lectureInfo_resource_1 = require("../../../resources/lectureInfo.resource");
const user_model_1 = require("../../user/model/user.model");
const lectureInfo_model_1 = require("../model/lectureInfo.model");
class LectureInfoRoutes {
    constructor() {
        this.lectureInfoRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureInfoRouter.post('/lectureInfo', createLectureInfo);
        this.lectureInfoRouter.get('/lectureInfo', pageListLectureInfo);
        this.lectureInfoRouter.get('/lectureInfo/pageListLectureInfoBySearchTerm/:searchTerm', pageListLectureInfoBySearchTerm);
        this.lectureInfoRouter.get('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', getLectureInfoByLectureInfoIndex);
        this.lectureInfoRouter.get('/lectureInfo/userId/:userId', pageListLectureInfoByUserId);
        this.lectureInfoRouter.get('/lectureInfo/lectureName/:lectureName', pageListLectureInfoByLectureName);
        this.lectureInfoRouter.get('/lectureInfo/professorName/:professorName', pageListLectureInfoByProfessorName);
        this.lectureInfoRouter.put('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', updateLectureInfo);
        this.lectureInfoRouter.delete('/lectureInfo/lectureInfoIndex/:lectureInfoIndex', deleteLectureInfo);
    }
}
exports.LectureInfoRoutes = LectureInfoRoutes;
/**
 * route: lectureInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoData = new lectureInfo_resource_1.LectureInfoResource(req.body);
        try {
            const result = yield lectureInfo_model_1.lectureInfo.createLectureInfo(lectureInfoData.getLectureInfo());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createLectureInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createLectureInfo: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureInfo_model_1.lectureInfo.listLectureInfo();
            const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfo(page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListLectureInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListLectureInfo: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo searchTerm 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureInfoBySearchTerm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let searchTerm = req.params.searchTerm;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureInfo_model_1.lectureInfo.listLectureInfoBySearchTerm(searchTerm);
            const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoBySearchTerm(searchTerm, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'listLectureInfoBySearchTerm: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listLectureInfoBySearchTerm: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo index 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureInfoByLectureInfoIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.getLectureInfoByLectureInfoIndex(lectureInfoIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureInfoByLectureInfoIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureInfoByLectureInfoIndex: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route lectureInfo userId 조회
 * @param req
 * @param res
 */
function pageListLectureInfoByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const resultCount = yield lectureInfo_model_1.lectureInfo.listLectureInfoByUserIndex(resultUser[0].userIndex);
            const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoByUserIndex(resultUser[0].userIndex, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListLectureInfoByUserId: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The ID does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'pageListLectureInfoByUserId: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListLectureInfoByUserId: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo lectureName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureInfoByLectureName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureName = req.params.lectureName;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureInfo_model_1.lectureInfo.listLectureInfoByLectureName(lectureName);
            const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoByLectureName(lectureName, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageGetLectureInfoByLectureName: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageGetLectureInfoByLectureName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo professorName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureInfoByProfessorName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorName = req.params.professorName;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureInfo_model_1.lectureInfo.listLectureInfoByProfessorName(professorName);
            const result = yield lectureInfo_model_1.lectureInfo.pageListLectureInfoByProfessorName(professorName, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageGetLectureInfoByProfessorName: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageGetLectureInfoByProfessorName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        let lectureInfoData = new lectureInfo_resource_1.LectureInfoResource(req.body);
        try {
            const result = yield lectureInfo_model_1.lectureInfo.updateLectureInfo(lectureInfoIndex, lectureInfoData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateLectureInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateLectureInfo: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureInfo 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLectureInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        try {
            const result = yield lectureInfo_model_1.lectureInfo.deleteLectureInfo(lectureInfoIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteLectureInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteLectureInfo: 50000'
                    });
                    break;
            }
        }
    });
}
exports.lectureInfoRoutes = new LectureInfoRoutes();
//# sourceMappingURL=lectureInfo.route.js.map
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
const lectureReply_resource_1 = require("../../../resources/lectureReply.resource");
const lectureInfo_model_1 = require("../model/lectureInfo.model");
const lectureReply_model_1 = require("../model/lectureReply.model");
class LectureReplyRoutes {
    constructor() {
        this.lectureReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.lectureReplyRouter.post('/lectureReply', createLectureReply);
        this.lectureReplyRouter.get('/lectureReply/checkGetLectureReply/lectureInfoIndex/:lectureInfoIndex/userIndex/:userIndex', checkGetLectureReply);
        this.lectureReplyRouter.get('/lectureReply/checkUpdateLectureReply/lectureInfoIndex/:lectureInfoIndex/userIndex/:userIndex', checkUpdateLectureReply);
        this.lectureReplyRouter.get('/lectureReply', pageListLectureReply);
        this.lectureReplyRouter.get('/lectureReply/lectureReplyIndex/:lectureReplyIndex', getLectureReplyByLectureReplyIndex);
        this.lectureReplyRouter.get('/lectureReply/lectureInfoIndex/:lectureInfoIndex', pageListLectureReplyByLectureInfoIndex);
        this.lectureReplyRouter.get('/lectureReply/userId/:userId', pageListLectureReplyByUserId);
        this.lectureReplyRouter.get('/lectureReply/userNickName/:userNickName', pageListLectureReplyByUserNickName);
        this.lectureReplyRouter.put('/lectureReply/lectureReplyIndex/:lectureReplyIndex', updateLectureReply);
        this.lectureReplyRouter.delete('/lectureReply/lectureReplyIndex/:lectureReplyIndex', deleteLectureReply);
    }
}
exports.LectureReplyRoutes = LectureReplyRoutes;
/**
 * route: lectureReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureReplyData = new lectureReply_resource_1.LectureReplyResource(req.body);
        try {
            const result = yield lectureReply_model_1.lectureReply.createLectureReply(lectureReplyData.getLectureReply());
            const resultTotalScore = yield lectureReply_model_1.lectureReply.scoreGetLectureReply(result.lectureInfoIndex);
            yield lectureInfo_model_1.lectureInfo.updateLectureInfoAverage(result.lectureInfoIndex, resultTotalScore[0].totalScore);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply 등록 중복 검사
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkGetLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        let userIndex = req.params.userIndex;
        try {
            const result = yield lectureReply_model_1.lectureReply.checkGetLectureReply(lectureInfoIndex, userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'checkGetLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'LectureReply already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkGetLectureReply: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkGetLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply 업데이스 중복 검사
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkUpdateLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureInfoIndex = req.params.lectureInfoIndex;
        let userIndex = req.params.userIndex;
        try {
            const result = yield lectureReply_model_1.lectureReply.checkUpdateLectureReply(lectureInfoIndex, userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'checkUpdateLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'LectureReply does not exist':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkUpdateLectureReply: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUpdateLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureReply_model_1.lectureReply.listLectureReply();
            const result = yield lectureReply_model_1.lectureReply.pageListLectureReply(page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply replyIndex 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getLectureReplyByLectureReplyIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let lectureReplyIndex = req.params.lectureReplyIndex;
        try {
            const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getLectureReplyByLectureReplyIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getLectureReplyByLectureReplyIndex: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply lectureInfoIndex page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureReplyByLectureInfoIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lectureInfoIndex = req.params.lectureInfoIndex;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureReply_model_1.lectureReply.listLectureReplyByLectureInfoIndex(lectureInfoIndex);
            const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByLectureInfoIndex(lectureInfoIndex, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListLectureReplyByLectureInfoIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    console.log(err.message);
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListLectureReplyByLectureInfoIndex: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply userId 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureReplyByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureReply_model_1.lectureReply.listLectureReplyByUserId(userId);
            const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByUserId(userId, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageGetLectureReplyByUserId: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageGetLectureReplyByUserId: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply userNickName page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListLectureReplyByUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userNickName = req.params.userNickName;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield lectureReply_model_1.lectureReply.listLectureReplyByUserNickName(userNickName);
            const result = yield lectureReply_model_1.lectureReply.pageListLectureReplyByUserNickName(userNickName, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageGetLectureReplyByUserNickName: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageGetLectureReplyByUserNickName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lectureReplyIndex = req.params.lectureReplyIndex;
        let lectureReplyData = req.body;
        try {
            yield lectureReply_model_1.lectureReply.updateLectureReply(lectureReplyIndex, lectureReplyData);
            const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
            const resultTotalScore = yield lectureReply_model_1.lectureReply.scoreGetLectureReply(result[0].lectureInfoIndex);
            yield lectureInfo_model_1.lectureInfo.updateLectureInfoAverage(result[0].lectureInfoIndex, resultTotalScore[0].totalScore);
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'updateLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: lectureReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteLectureReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lectureReplyIndex = req.params.lectureReplyIndex;
        try {
            const result = yield lectureReply_model_1.lectureReply.getLectureReplyByLectureReplyIndex(lectureReplyIndex);
            yield lectureReply_model_1.lectureReply.deleteLectureReply(lectureReplyIndex);
            const resultTotalScore = yield lectureReply_model_1.lectureReply.scoreGetLectureReply(result[0].lectureInfoIndex);
            yield lectureInfo_model_1.lectureInfo.updateLectureInfoAverage(result[0].lectureInfoIndex, resultTotalScore[0].totalScore);
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'deleteLectureReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteLectureReply: 50000'
                    });
                    break;
            }
        }
    });
}
exports.lectureReplyRoutes = new LectureReplyRoutes();
//# sourceMappingURL=lectureReply.route.js.map
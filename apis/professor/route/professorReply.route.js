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
const auth_util_1 = require("../../../packages/utils/auth.util");
const professorInfo_model_1 = require("../model/professorInfo.model");
const professorReply_model_1 = require("../model/professorReply.model");
const professorReplySubscriber_model_1 = require("../model/professorReplySubscriber.model");
class ProfessorReplyRoutes {
    constructor() {
        this.professorReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.professorReplyRouter.post('/professorReply/professorInfoIndex/:professorInfoIndex', createProfessorReply);
        this.professorReplyRouter.get('/professorReply/professorInfoIndex/:professorInfoIndex', pageListProfessorReply);
        this.professorReplyRouter.get('/professorReply/myProfessorReplyPostList', myProfessorReplyPostList);
        this.professorReplyRouter.get('/professorReply/getProfessorReply/:professorReplyIndex', getProfessorReply);
        this.professorReplyRouter.put('/professorReply/professorReplyIndex/:professorReplyIndex', updateProfessorReply);
        this.professorReplyRouter.delete('/professorReply/professorReplyIndex/:professorReplyIndex', deleteProfessorReply);
    }
}
exports.ProfessorReplyRoutes = ProfessorReplyRoutes;
/**
 * route: professorReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createProfessorReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { professorInfoIndex } = req.params;
            const { tokenIndex: userIndex } = auth_util_1.auth(req);
            const professorReplyData = Object.assign(Object.assign({}, req.body), { userIndex,
                professorInfoIndex });
            const result = yield professorReply_model_1.professorReply.createProfessorReply(professorReplyData);
            const [averageResult] = yield professorReply_model_1.professorReply.averageProfessorReply(professorInfoIndex);
            yield professorInfo_model_1.professorInfo.updateProfessorInfo(professorInfoIndex, JSON.parse(JSON.stringify(averageResult)));
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'createProfessorReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    console.log({ err });
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createProfessorReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListProfessorReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorInfoIndex = req.params.professorInfoIndex;
        let { page, count } = req.query;
        page = page ? parseInt(page) : 0;
        count = count ? parseInt(count) : 5;
        try {
            const { tokenIndex } = auth_util_1.auth(req);
            const resultCount = yield professorReply_model_1.professorReply.listProfessorReply(professorInfoIndex);
            const result = yield professorReply_model_1.professorReply.pageListProfessorReply(professorInfoIndex, page, count);
            for (const row of result) {
                const resultProfessorSubscriber = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriberByUserIndex(row.professorReplyIndex, tokenIndex);
                row.isGood = resultProfessorSubscriber.length > 0 && resultProfessorSubscriber[0].isGood === 1;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result,
                message: 'pageListProfessorReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListProfessorReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateProfessorReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorReplyIndex = req.params.professorReplyIndex;
        let professorReplyData = req.body;
        try {
            const result = yield professorReply_model_1.professorReply.updateProfessorReply(professorReplyIndex, professorReplyData);
            const resultReply = yield professorReply_model_1.professorReply.getProfessorReply(professorReplyIndex);
            const resultProfessorInfoIndex = resultReply[0].professorInfoIndex;
            const [avgResult] = yield professorReply_model_1.professorReply.averageProfessorReply(resultProfessorInfoIndex);
            yield professorInfo_model_1.professorInfo.updateProfessorInfo(resultProfessorInfoIndex, JSON.parse(JSON.stringify(avgResult)));
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'updateProfessorReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateProfessorReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorReply 내가 쓴 교수평가 리스트
 * @param req
 * @param res
 */
function myProfessorReplyPostList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokenIndex: userIndex } = auth_util_1.auth(req);
            const result = yield professorReply_model_1.professorReply.myProfessorReplyPostList(userIndex);
            for (const row of result) {
                const [resultProfessorSubscriber] = yield Promise.all([
                    professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriberByUserIndex(userIndex, row.professorReplyIndex),
                ]);
                row.isGood = professorReplySubscriber_model_1.professorReplySubscriber[0] ? resultProfessorSubscriber[0].isGood : 0;
            }
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'myProfessorReplyPostList: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'myProfessorReplyPostList: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorReply 내가 쓴 교수평가
 * @param req
 * @param res
 */
function getProfessorReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorReplyIndex = req.params.professorReplyIndex;
        try {
            const result = yield professorReply_model_1.professorReply.getProfessorReply(professorReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'myProfessorReplyPost: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'myProfessorReplyPost: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteProfessorReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorReplyIndex = req.params.professorReplyIndex;
        try {
            const result = yield professorReply_model_1.professorReply.deleteProfessorReply(professorReplyIndex);
            const resultReply = yield professorReply_model_1.professorReply.getProfessorReply(professorReplyIndex);
            const resultProfessorInfoIndex = resultReply[0].professorInfoIndex;
            const [avgResult] = yield professorReply_model_1.professorReply.averageProfessorReply(resultProfessorInfoIndex);
            yield professorInfo_model_1.professorInfo.updateProfessorInfo(resultReply.professrInfoIndex, JSON.parse(JSON.stringify(avgResult)));
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'deleteProfessorReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteProfessorReply: 50000'
                    });
                    break;
            }
        }
    });
}
exports.professorReplyRoutes = new ProfessorReplyRoutes();
//# sourceMappingURL=professorReply.route.js.map
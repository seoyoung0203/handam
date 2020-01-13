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
class ProfessorInfoRoutes {
    constructor() {
        this.professorInfoRouter = express.Router();
        this.router();
    }
    router() {
        this.professorInfoRouter.post('/professorInfo', createProfessorInfo);
        this.professorInfoRouter.get('/professorInfo', pageListProfessorInfo);
        this.professorInfoRouter.get('/professorInfo/professorIndex/:professorIndex', getProfessorInfo);
        this.professorInfoRouter.put('/professorInfo/professorInfoIndex/:professorInfoIndex', updateProfessorInfo);
    }
}
exports.ProfessorInfoRoutes = ProfessorInfoRoutes;
/**
 * route: professorInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createProfessorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const professorInfoData = req.body;
            const result = yield professorInfo_model_1.professorInfo.createProfessorInfo(professorInfoData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'createProfessorInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createProfessorInfo: 50000'
                    });
            }
        }
    });
}
/**
 * route: professorInfo 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListProfessorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { page, count, filter, orderBy } = req.query;
            page = page ? parseInt(page) : 0;
            count = count ? parseInt(count) : 6;
            const { tokenIndex } = auth_util_1.auth(req);
            const resultCount = yield professorInfo_model_1.professorInfo.listProfessorInfo();
            const result = yield professorInfo_model_1.professorInfo.pageListProfessorInfo(page, count, filter, orderBy);
            for (const row of result) {
                const resultProfessorReply = yield professorReply_model_1.professorReply.getProfessorReplyByUserIndex(row.professorInfoIndex, tokenIndex);
                row.isGood = resultProfessorReply.length > 0 ? resultProfessorReply[0].recommendation === 1 : false;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result,
                message: 'pageListProfessorInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListProfessorInfo: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorInfo 조회
 * @param req
 * @param res
 */
function getProfessorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let professorIndex = req.params.professorIndex;
        try {
            const { tokenIndex } = auth_util_1.auth(req);
            const result = yield professorInfo_model_1.professorInfo.getProfessorInfo(professorIndex);
            for (const row of result) {
                console.log(row);
                const resultProfessorReply = yield professorReply_model_1.professorReply.getProfessorReplyByUserIndex(row.professorInfoIndex, tokenIndex);
                row.isGood = resultProfessorReply.length > 0 ? resultProfessorReply[0].recommendation : -1;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getProfessorInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getListProfessorInfo: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: professorInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateProfessorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { professorInfoIndex } = req.params;
        const professorInfoData = req.body;
        try {
            const result = yield professorInfo_model_1.professorInfo.updateProfessorInfo(professorInfoIndex, professorInfoData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'updateProfessorInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    console.log({ err });
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateProfessorInfo: 50000'
                    });
                    break;
            }
        }
    });
}
exports.professorInfoRoutes = new ProfessorInfoRoutes();
//# sourceMappingURL=professorInfo.route.js.map
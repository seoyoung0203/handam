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
const voteReply_model_1 = require("../model/voteReply.model");
class VoteReplyRoutes {
    constructor() {
        this.voteReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.voteReplyRouter.post('/voteReply/voteTopicIndex/:voteTopicIndex', createVoteReply);
        this.voteReplyRouter.get('/voteReply/voteTopicIndex/:voteTopicIndex', pageListVoteReply);
        this.voteReplyRouter.put('/voteReply/voteReplyIndex/:voteReplyIndex', updateVoteReply);
        this.voteReplyRouter.delete('/voteReply/voteReplyIndex/:voteReplyIndex', deleteVoteReply);
    }
}
exports.VoteReplyRoutes = VoteReplyRoutes;
/**
 * route: voteReply 생성
 * @param req
 * @param res
 */
function createVoteReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voteTopicIndex = req.params.voteTopicIndex;
            let userData = auth_util_1.auth(req);
            const result = yield voteReply_model_1.voteReply.createVoteReply({
                voteTopicIndex: voteTopicIndex,
                parentsVoteReplyIndex: req.body.parentsVoteReplyIndex,
                userIndex: userData.tokenIndex,
                content: req.body.content,
                status: 'ACTIVE'
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createVoteReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createVoteReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: voteReply 리스트 조회
 * @param req
 * @param res
 */
function pageListVoteReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voteTopicIndex = req.params.voteTopicIndex;
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
            const resultCount = yield voteReply_model_1.voteReply.listVoteReply(voteTopicIndex);
            const result = yield voteReply_model_1.voteReply.pageListVoteReply(voteTopicIndex, page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListVoteReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListVoteReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: voteReply 업데이
 * @param req
 * @param res
 */
function updateVoteReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let voteReplyIndex = req.params.voteReplyIndex;
            let voteReplyData = req.body;
            const result = yield voteReply_model_1.voteReply.updateVoteReply(voteReplyIndex, voteReplyData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateVoteReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateVoteReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: voteReply 삭제
 * @param req
 * @param res
 */
function deleteVoteReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let voteReplyIndex = req.params.voteReplyIndex;
            const result = yield voteReply_model_1.voteReply.deleteVoteReply(voteReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteVoteReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteVoteReply: 50000'
                    });
                    break;
            }
        }
    });
}
exports.voteReplyRoutes = new VoteReplyRoutes();
//# sourceMappingURL=voteReplyRoute.route.js.map
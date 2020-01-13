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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const slack_1 = require("../../../packages/core/slack/slack");
const postsReplyReport_resource_1 = require("../../../resources/postsReplyReport.resource");
const user_model_1 = require("../../user/model/user.model");
const postsReply_model_1 = require("../model/postsReply.model");
const postsReplyReport_model_1 = require("../model/postsReplyReport.model");
class PostsReplyReportRoute {
    constructor() {
        this.postsReplyReportRouter = express.Router();
        this.router();
    }
    router() {
        this.postsReplyReportRouter.post('/postsReplyReport', createPostsReplyReport);
        this.postsReplyReportRouter.get('/postsReplyReport', listPostsReplyReport);
        this.postsReplyReportRouter.get('/postsReplyReport/userId/:userId', getPostsReplyReportByUserId);
        this.postsReplyReportRouter.put('/postsReplyReport/postsReplyReportIndex/:postsReplyReportIndex', updatePostsReplyReport);
        this.postsReplyReportRouter.delete('/postsReplyReport', deletePostsReplyReport);
    }
}
exports.PostsReplyReportRoute = PostsReplyReportRoute;
/**
 * route: postsReplyReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createPostsReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = req.body, { userId } = _a, postReplyReportData = __rest(_a, ["userId"]);
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            postReplyReportData.userIndex = userIndex;
            const checkResult = yield postsReplyReport_model_1.postsReplyReport.checkPostsReplyReport(postReplyReportData.postsReplyIndex, userIndex);
            if (checkResult.length > 0) {
                throw 'report duplicated';
            }
            yield postsReplyReport_model_1.postsReplyReport.createPostsReplyReport(postReplyReportData);
            let countResult = yield postsReplyReport_model_1.postsReplyReport.getPostsReplyReportCount(postReplyReportData.postsReplyIndex);
            const replyLimitCount = 5;
            const reportCount = countResult[0]['reportCount'];
            if (reportCount === replyLimitCount) {
                const color = '#0013FF';
                const field = {
                    'title': `Reply Report 알림`,
                    'value': `postsIndex=${postReplyReportData.postsIndex}, postsReplyIndex=${postReplyReportData.postsReplyIndex}, reportCount=${reportCount}\nContent: ${postReplyReportData.content}`,
                    'short': false
                };
                yield Promise.all([
                    postsReply_model_1.postsReply.updatePostsReplyStatus(postReplyReportData.postsReplyIndex, 'INACTIVE'),
                    slack_1.slack.sendReportMessage('replyReport', field, color)
                ]);
            }
            res.send({
                success: true,
                statusCode: 200,
                result: postReplyReportData,
                message: 'createPostsReplyReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'report duplicated':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'createPostsReplyReport: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 50000,
                        message: 'createPostsReplyReport: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listPostsReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield postsReplyReport_model_1.postsReplyReport.listPostsReplyReport();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPostsReplyReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReplyReport: 50000'
                    });
            }
        }
    });
}
/**
 * route: UserId에 따른 postsReplyReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getPostsReplyReportByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const resultUser = yield user_model_1.user.getUser(userId);
        const { userIndex } = resultUser[0];
        try {
            const result = yield postsReplyReport_model_1.postsReplyReport.getPostsReplyReportByUserIndex(userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPostsReplyReportByUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReplyReportByUser: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsReplyReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updatePostsReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postsReplyReportIndex } = req.params;
        const { userId } = req.body;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            delete req.body.userId;
            req.body.userIndex = userIndex;
            const postsReplyReportData = new postsReplyReport_resource_1.PostsReplyReportResource(req.body);
            const result = yield postsReplyReport_model_1.postsReplyReport.updatePostsReplyReport(postsReplyReportIndex, postsReplyReportData.getPostsReplyReport());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updatePostsReplyReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updatePostsReplyReport: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsReplyReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deletePostsReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postsReplyIndex, userId } = req.body;
        const resultUser = yield user_model_1.user.getUser(userId);
        const { userIndex } = resultUser[0];
        try {
            const result = yield postsReplyReport_model_1.postsReplyReport.deletePostsReplyReport(postsReplyIndex, userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deletePostsReplyReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deletePostsReplyReport: 50000'
                    });
            }
        }
    });
}
exports.postsReplyReportRoutes = new PostsReplyReportRoute();
//# sourceMappingURL=postsReplyReport.route.js.map
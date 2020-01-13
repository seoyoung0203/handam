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
const postsReport_resource_1 = require("../../../resources/postsReport.resource");
const user_model_1 = require("../../user/model/user.model");
const posts_model_1 = require("../model/posts.model");
const postsReport_model_1 = require("../model/postsReport.model");
class PostsReportRoutes {
    constructor() {
        this.postsReportRouter = express.Router();
        this.router();
    }
    router() {
        this.postsReportRouter.post('/postsReport', createPostsReport);
        this.postsReportRouter.get('/postsReport', listPostsReport);
        this.postsReportRouter.get('/postsReport/userId/:userId', getPostsReportByUserIndex);
        this.postsReportRouter.get('/postsReport/postsIndex/:postsIndex', getPostsReportByPostIndex);
        this.postsReportRouter.put('/postsReport/postsReportIndex/:postsReportIndex', updatePostsReport);
        this.postsReportRouter.delete('/postsReport/', deletePostsReport);
    }
}
exports.PostsReportRoutes = PostsReportRoutes;
/**
 * route: postsReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createPostsReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = req.body, { userId } = _a, postData = __rest(_a, ["userId"]);
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            postData.userIndex = userIndex;
            const checkResult = yield postsReport_model_1.postsReport.checkPostsReport(postData.postsIndex, userIndex);
            if (checkResult.length > 0) {
                throw 'report duplicated';
            }
            yield postsReport_model_1.postsReport.createPostsReport(postData);
            let countResult = yield postsReport_model_1.postsReport.getPostsReportCount(postData.postsIndex);
            const alarmCount = 5;
            const reportCount = countResult[0]['reportCount'];
            if (reportCount === alarmCount) {
                const color = '#E82C0C';
                const field = {
                    'title': `Posts Report 알림`,
                    'value': `postsIndex=${postData.postsIndex}, reportCount=${reportCount}\nContent: ${postData.content}`,
                    'short': false
                };
                yield Promise.all([
                    posts_model_1.posts.updatePostsStatus(postData.postsIndex, 'INACTIVE'),
                    slack_1.slack.sendReportMessage('report', field, color)
                ]);
            }
            res.send({
                success: true,
                statusCode: 200,
                result: postData,
                message: 'createPostsReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'report duplicated':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'createPostsReport: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 50000,
                        message: 'createPostsReport: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listPostsReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield postsReport_model_1.postsReport.listPostsReport();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPostsReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReport: 50000'
                    });
            }
        }
    });
}
/**
 * route: UserIndex에 따른 postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getPostsReportByUserIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            const result = yield postsReport_model_1.postsReport.getPostsReportByUserIndex(userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPostsReportByUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReportByUser: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsIndex에 따른 postsReport 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getPostsReportByPostIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postsIndex = req.params.postsIndex;
        try {
            const result = yield postsReport_model_1.postsReport.getPostsReportByPostIndex(postsIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPostsReportByPost: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReportByPost: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updatePostsReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postsReportIndex } = req.params;
        const { userId } = req.body;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            delete req.body.userId;
            req.body.userIndex = userIndex;
            let postsReportData = new postsReport_resource_1.PostsReportResource(req.body);
            const result = yield postsReport_model_1.postsReport.updatePostsReport(postsReportIndex, postsReportData.getPostsReport());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updatePostsReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updatePostsReport: 50000'
                    });
            }
        }
    });
}
/**
 * route: postsReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deletePostsReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postsIndex, userId } = req.body;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            const result = yield postsReport_model_1.postsReport.deletePostsReport(postsIndex, userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deletePostsReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deletePostsReport: 50000'
                    });
            }
        }
    });
}
exports.postsReportRoutes = new PostsReportRoutes();
//# sourceMappingURL=postsReport.route.js.map
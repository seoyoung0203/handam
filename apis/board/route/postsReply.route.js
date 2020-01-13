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
const lodash = require("lodash");
const alarm_util_1 = require("../../../packages/utils/alarm.util");
const auth_util_1 = require("../../../packages/utils/auth.util");
const alarm_model_1 = require("../../alarm/model/alarm.model");
const user_model_1 = require("../../user/model/user.model");
const posts_model_1 = require("../model/posts.model");
const postsReply_model_1 = require("../model/postsReply.model");
const postsReplyReport_model_1 = require("../model/postsReplyReport.model");
class PostsReplyRoutes {
    constructor() {
        this.postsReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.postsReplyRouter.post('/postsReply/postsIndex/:postsIndex', createPostsReply);
        this.postsReplyRouter.get('/postsReply/postsIndex/:postsIndex', pageListPostsReply);
        this.postsReplyRouter.get('/postsReply/parentsPostsReplyIndex/:parentsPostsReplyIndex', pageChildPostsReply);
        this.postsReplyRouter.get('/postsReply/postsReplyIndex/:postsReplyIndex', getPostsReply);
        this.postsReplyRouter.put('/postsReply/postsReplyIndex/:postsReplyIndex', updatePostsReply);
        this.postsReplyRouter.delete('/postsReply/postsReplyIndex/:postsReplyIndex', deletePostsReply);
    }
}
exports.PostsReplyRoutes = PostsReplyRoutes;
/**
 * route : postsReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createPostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postsIndex = req.params.postsIndex;
        try {
            let userData = auth_util_1.auth(req);
            const result = yield postsReply_model_1.postsReply.createPostsReply({
                postsIndex: postsIndex,
                parentsPostsReplyIndex: req.body.parentsPostsReplyIndex,
                userIndex: userData.tokenIndex,
                content: req.body.content,
                status: 'ACTIVE',
                isAnonymous: req.body.isAnonymous
            });
            /** 댓글 작성 케이스 */
            if (result.postsIndex && result.parentsPostsReplyIndex === undefined) {
                /** 알림 수신자 추가 */
                let resultsPosts = yield posts_model_1.posts.getPostsIncludeUserIndex(postsIndex);
                /** 알림 수신자와 댓글 작성자가 다를 경우에만 알림 전송 */
                if (resultsPosts[0].userIndex !== userData.tokenIndex) {
                    let resultUser = yield user_model_1.user.getUserByUserIndex(resultsPosts[0].userIndex);
                    let appIds = [];
                    if (resultUser[0].isPostsAlarm && resultUser[0].status === 'ACTIVE') {
                        if (resultUser[0].appId !== null) {
                            appIds.push(resultUser[0].appId);
                        }
                    }
                    /** 알림 전송 */
                    if (appIds.length > 0) {
                        yield alarm_util_1.alarmUtil.sendAlarm({
                            include_player_ids: appIds,
                            contents: {
                                en: 'alarm',
                                ko: `내 글에 댓글이 달렸어요: ${req.body.content.substring(0, 30)}`
                            }
                        });
                        /** 알림 리스트 추가 */
                        yield alarm_model_1.alarm.createAlarm({
                            userIndex: resultsPosts[0].userIndex,
                            category: 'posts',
                            data: JSON.stringify({
                                postsIndex: parseInt(resultsPosts[0].postsIndex),
                                postsTitle: resultsPosts[0].title,
                                postsCategoryIndex: resultsPosts[0].postsCategoryIndex,
                                postsCategoryName: resultsPosts[0].postsCategoryName
                            }),
                            status: 'ACTIVE',
                            isRead: 0,
                            readAt: null
                        });
                    }
                }
            }
            /** 대댓글 작성 케이스 */
            if (result.postsIndex && result.parentsPostsReplyIndex) {
                /** 게시글 정보 */
                let resultsPosts = yield posts_model_1.posts.getPostsIncludeUserIndex(postsIndex);
                /** 알림 수신자와 댓글 작성자가 다를 경우에만 알림 전송 */
                const resultsPostsReply = yield postsReply_model_1.postsReply.listPostsReplyIncludeParentsPostsReply(postsIndex, result.parentsPostsReplyIndex);
                let appIds = [];
                let userIndexes = [];
                /** 알림 수신자 필터 및 추가 */
                for (const row of resultsPostsReply) {
                    if (row.userIndex !== userData.tokenIndex) {
                        let resultUser = yield user_model_1.user.getUserByUserIndex(row.userIndex);
                        if (resultUser[0].isPostsAlarm && resultUser[0].status === 'ACTIVE') {
                            if (resultUser[0].appId !== null) {
                                appIds.push(resultUser[0].appId);
                                userIndexes.push(resultUser[0].userIndex);
                            }
                        }
                    }
                }
                /** 중복 제거 */
                appIds = lodash._.uniq(appIds);
                userIndexes = lodash._.uniq(userIndexes);
                /** 알림 전송 */
                if (appIds.length > 0) {
                    yield alarm_util_1.alarmUtil.sendAlarm({
                        include_player_ids: appIds,
                        contents: {
                            en: 'alarm',
                            ko: `댓글에 답글이 달렸어요: ${req.body.content.substring(0, 30)}`
                        }
                    });
                    for (const row of userIndexes) {
                        /** 알림 리스트 추가 */
                        yield alarm_model_1.alarm.createAlarm({
                            userIndex: row,
                            category: 'postsReply',
                            data: JSON.stringify({
                                postsIndex: parseInt(resultsPostsReply[0].postsIndex),
                                postsReplyIndex: parseInt(resultsPostsReply[0].postsReplyIndex),
                                postsTitle: resultsPosts[0].title,
                                postsCategoryIndex: resultsPosts[0].postsCategoryIndex,
                                postsCategoryName: resultsPosts[0].postsCategoryName
                            }),
                            status: 'ACTIVE',
                            isRead: 0,
                            readAt: null
                        });
                    }
                }
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createPostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createPostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : postsReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListPostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let postsIndex = req.params.postsIndex;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const { tokenIndex: userIndex } = auth_util_1.auth(req);
            const pResultCount = yield postsReply_model_1.postsReply.listPostsReply(postsIndex);
            const result = yield postsReply_model_1.postsReply.pageListPostsReply(postsIndex, page, count);
            const pReportCheck = [];
            const pChildrenReply = [];
            for (const res of result) {
                pReportCheck.push(yield postsReplyReport_model_1.postsReplyReport.checkPostsReplyReport(res.postsReplyIndex, userIndex));
                pChildrenReply.push(yield postsReply_model_1.postsReply.pageListChildPostsReplyAll(res.postsReplyIndex));
            }
            for (let i = 0; i < pReportCheck.length; i++) {
                const reported = yield pReportCheck[i];
                result[i].reported = !!reported[0];
                result[i].childReplies = yield pChildrenReply[i];
                const pReplyReportCheck = [];
                result[i].childReplies.forEach(reply => {
                    pReplyReportCheck.push(postsReplyReport_model_1.postsReplyReport.checkPostsReplyReport(reply.postsReplyIndex, userIndex));
                });
                for (let j = 0; j < pReplyReportCheck.length; j++) {
                    const reported = yield pReplyReportCheck[j];
                    result[i].childReplies[j].reported = !!reported[0];
                }
            }
            const resultCount = yield pResultCount;
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListPostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListPostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: postsReply 대댓글 리스트 조회
 * @param req
 * @param res
 */
function pageChildPostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let parentsPostsReplyIndex = req.params.parentsPostsReplyIndex;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const userData = auth_util_1.auth(req);
            const pResultCount = postsReply_model_1.postsReply.listChildPostsReply(parentsPostsReplyIndex);
            const result = yield postsReply_model_1.postsReply.pageListChildPostsReply(parentsPostsReplyIndex, page, count);
            const pReportCheck = [];
            for (const res of result) {
                pReportCheck.push(postsReplyReport_model_1.postsReplyReport.checkPostsReplyReport(res.postsReplyIndex, userData.tokenIndex));
            }
            for (let i = 0; i < pReportCheck.length; i++) {
                const reported = yield pReportCheck[i];
                result[i].reported = !!reported[0];
            }
            const resultCount = yield pResultCount;
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageChildPostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageChildPostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: postsReply 조회
 * @param req
 * @param res
 */
function getPostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let postsReplyIndex = req.params.postsReplyIndex;
        try {
            const userData = auth_util_1.auth(req);
            const [result, reported] = yield Promise.all([
                postsReply_model_1.postsReply.getPostsReply(postsReplyIndex),
                postsReplyReport_model_1.postsReplyReport.checkPostsReplyReport(postsReplyIndex, userData.tokenIndex)
            ]);
            result[0].reported = !!reported[0];
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getPostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'This postsReply does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getPostsReply: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : postsReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updatePostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let postsReplyIndex = req.params.postsReplyIndex;
        let postsReplyData = req.body;
        try {
            const result = yield postsReply_model_1.postsReply.updatePostsReply(postsReplyIndex, postsReplyData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updatePostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updatePostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : postsReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deletePostsReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let postsReplyIndex = req.params.postsReplyIndex;
        try {
            const result = yield postsReply_model_1.postsReply.deletePostsReply(postsReplyIndex);
            yield postsReply_model_1.postsReply.deleteChildPostsReply(postsReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deletePostsReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deletePostsReply: 50000'
                    });
                    break;
            }
        }
    });
}
exports.postsReplyRoutes = new PostsReplyRoutes();
//# sourceMappingURL=postsReply.route.js.map
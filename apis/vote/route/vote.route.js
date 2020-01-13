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
const user_model_1 = require("../../user/model/user.model");
const vote_model_1 = require("../model/vote.model");
class VoteRoutes {
    constructor() {
        this.voteRouter = express.Router();
        this.router();
    }
    router() {
        this.voteRouter.post('/vote', createVote);
        this.voteRouter.get('/vote', getVote);
        this.voteRouter.get('/listVote', listVote);
        this.voteRouter.get('/pastVote', pageListPastVote);
        this.voteRouter.get('/pastVote/pastVoteTopicIndex/:pastVoteTopicIndex', getPastVote);
        this.voteRouter.get('/checkVote/voteTopicIndex/:voteTopicIndex/voteUserId/:voteUserId', checkVote);
    }
}
exports.VoteRoutes = VoteRoutes;
/**
 * route: vote 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voteTopicIndex = req.body.voteTopicIndex;
            const voteItemIndex = req.body.voteItemIndex;
            const voteUserId = req.body.userId;
            const voteUser = yield user_model_1.user.getUser(voteUserId);
            const result = yield vote_model_1.vote.createVoteUser({
                voteTopicIndex: voteTopicIndex,
                voteItemIndex: voteItemIndex,
                userIndex: voteUser[0].userIndex
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createVote: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: vote 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let voteTopic = yield vote_model_1.vote.getVoteTopic();
            let voteTopicIndex = voteTopic.voteTopicIndex;
            let voteItemIndex = yield vote_model_1.vote.listVoteItemIndex(voteTopicIndex);
            let totalCount = 0;
            let temp = [];
            for (let i = 0; i < voteItemIndex.length; i++) {
                let voteItem = yield vote_model_1.vote.listVoteItem(voteTopicIndex, voteItemIndex[i].voteItemIndex);
                totalCount = totalCount + voteItem.count;
                temp.push(voteItem);
            }
            voteTopic.totalCount = totalCount;
            /** 결과값 구조화 */
            const result = {
                voteTopic: voteTopic,
                voteItem: temp
            };
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getVote: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: vote 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const voteTopics = yield vote_model_1.vote.listVoteTopic();
            if (voteTopics.length === 0) {
                throw 'There is no list of topics ';
            }
            const [activeTopic] = voteTopics.filter(topic => topic.status === 'ACTIVE');
            const voteTopicIndex = activeTopic ? activeTopic.voteTopicIndex : voteTopics[0].voteTopicIndex;
            const voteItemIndex = yield vote_model_1.vote.listVoteItemIndex(voteTopicIndex);
            const voteItem = [];
            let totalCount = 0;
            for (let i = 0; i < voteItemIndex.length; i++) {
                const tempVoteItem = yield vote_model_1.vote.listVoteItem(voteTopicIndex, voteItemIndex[i].voteItemIndex);
                totalCount = totalCount + tempVoteItem.count;
                voteItem.push(tempVoteItem);
            }
            const voteTopic = activeTopic ? activeTopic : voteTopics[0];
            voteTopic.totalCount = totalCount;
            /** 결과값 구조화 */
            const result = {
                voteTopic,
                voteItem
            };
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'listVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listVote: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: pastVote page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListPastVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const resultCount = yield vote_model_1.vote.listVotePastTopic();
            const result = yield vote_model_1.vote.pageListVotePastTopic(page, count);
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListPastVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListPastVote: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: pastVote 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getPastVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const voteTopicIndex = req.params.pastVoteTopicIndex;
        try {
            let voteTopic = yield vote_model_1.vote.getVoteTopicByTopicIndex(voteTopicIndex);
            let voteItemIndex = yield vote_model_1.vote.listVoteItemIndex(voteTopicIndex);
            let totalCount = 0;
            let temp = [];
            for (let i = 0; i < voteItemIndex.length; i++) {
                let voteItem = yield vote_model_1.vote.listVoteItem(voteTopicIndex, voteItemIndex[i].voteItemIndex);
                totalCount = totalCount + voteItem.count;
                temp.push(voteItem);
            }
            voteTopic.totalCount = totalCount;
            /** 결과값 구조화 */
            const result = {
                voteTopic: voteTopic,
                voteItem: temp
            };
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getPastVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPastVote: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: vote 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const voteTopicIndex = req.params.voteTopicIndex;
        const voteUserId = req.params.voteUserId;
        try {
            const voteUser = yield user_model_1.user.getUser(voteUserId);
            const result = yield vote_model_1.vote.checkVote(voteTopicIndex, voteUser[0].userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'checkVote: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'user does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'checkVote: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkVote: 50000'
                    });
                    break;
            }
        }
    });
}
exports.voteRoutes = new VoteRoutes();
//# sourceMappingURL=vote.route.js.map
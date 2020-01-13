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
const voteReplySubscriber_model_1 = require("../model/voteReplySubscriber.model");
class VoteReplySubscriberRoutes {
    constructor() {
        this.voteReplySubscriberRouter = express.Router();
        this.router();
    }
    router() {
        this.voteReplySubscriberRouter.put('/voteReplySubscriber/voteReplyIndex/:voteReplyIndex', putVoteReplySubscriber);
    }
}
exports.VoteReplySubscriberRoutes = VoteReplySubscriberRoutes;
/**
 * route: voteReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function putVoteReplySubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { voteReplyIndex } = req.params;
            const { tokenIndex } = auth_util_1.auth(req);
            let result = yield voteReplySubscriber_model_1.voteReplySubscriber.updateVoteReplySubscriber(tokenIndex, +voteReplyIndex, req.body);
            if (result.changedRows == 0) {
                result = yield voteReplySubscriber_model_1.voteReplySubscriber.createVoteReplySubscriber({
                    userIndex: tokenIndex,
                    voteReplyIndex,
                    isGood: 0
                });
            }
            else {
                result = yield voteReplySubscriber_model_1.voteReplySubscriber.getVoteReplySubscriber(tokenIndex, voteReplyIndex);
                result = result[0];
                if (result.isGood == 0) {
                    yield voteReplySubscriber_model_1.voteReplySubscriber.deleteVoteReplySubscriber(tokenIndex, voteReplyIndex);
                }
            }
            const sumResult = yield voteReplySubscriber_model_1.voteReplySubscriber.getVoteReplySubscriberSumCount(voteReplyIndex);
            yield voteReply_model_1.voteReply.updateVoteReply(voteReplyIndex, sumResult[0]);
            delete result.userIndex;
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'putVoteReplySubscriber: 200'
            });
        }
        catch (err) {
            console.log({ err });
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'putVoteReplySubscriber : 50000'
                    });
                    break;
            }
        }
    });
}
exports.voteReplySubscriberRoutes = new VoteReplySubscriberRoutes();
//# sourceMappingURL=voteReplySubscriber.route.js.map
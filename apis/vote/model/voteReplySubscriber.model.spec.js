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
const chai_1 = require("chai");
const vote_model_1 = require("./vote.model");
const voteReply_model_1 = require("./voteReply.model");
const voteReplySubscriber_model_1 = require("./voteReplySubscriber.model");
describe('voteReplySubscriber 모델', () => {
    let resultVoteReplyIndex;
    let resultVoteTopicIndex;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resultVote = yield vote_model_1.vote.createVoteTopic({
                topicName: '좋아요 테스트 투표',
                status: 'ACTIVE',
                dueDate: '2018-07-01'
            });
            const resultVoteTopicByTopicName = yield vote_model_1.vote.getVoteTopicByTopicName('좋아요 테스트 투표');
            resultVoteTopicIndex = resultVoteTopicByTopicName[0].voteTopicIndex;
            yield voteReply_model_1.voteReply.createVoteReply({
                voteTopicIndex: resultVoteTopicIndex,
                userIndex: 553,
                content: '투표 댓글',
                status: 'ACTIVE'
            });
            const result = yield voteReply_model_1.voteReply.listVoteReply(resultVoteTopicIndex);
            resultVoteReplyIndex = result[0].voteReplyIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield vote_model_1.vote.deleteVoteTopic(resultVoteTopicIndex);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createVoteReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReplySubscriber_model_1.voteReplySubscriber.createVoteReplySubscriber({
            userIndex: 553,
            voteReplyIndex: resultVoteReplyIndex,
            isGood: 1,
        });
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getVoteReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReplySubscriber_model_1.voteReplySubscriber.getVoteReplySubscriber(553, resultVoteReplyIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getVoteReplySubscriberSumCount', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReplySubscriber_model_1.voteReplySubscriber.getVoteReplySubscriberSumCount(resultVoteReplyIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateVoteReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReplySubscriber_model_1.voteReplySubscriber.updateVoteReplySubscriber(553, resultVoteReplyIndex, {
            isGood: 0
        });
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteVoteReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReplySubscriber_model_1.voteReplySubscriber.deleteVoteReplySubscriber(553, resultVoteReplyIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=voteReplySubscriber.model.spec.js.map
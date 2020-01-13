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
const user_model_1 = require("../../user/model/user.model");
const vote_model_1 = require("./vote.model");
const voteReply_model_1 = require("./voteReply.model");
describe('voteReplyModel 모델', () => {
    let testVoteReplyIndex;
    let testParentsVoteReplyIndex;
    let testVoteTopicIndex;
    let testVoteTopicName = '한성대학교를 상징하는 동물은 무엇입니까?!';
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            /** voteTopic 생성 */
            const result = yield vote_model_1.vote.createVoteTopic({
                topicName: testVoteTopicName,
                status: 'ACTIVE',
                dueDate: '2018-07-01'
            });
            /** validation 체크 */
            chai_1.expect(result).instanceof(Object);
            /** voteTopic topicName 조회 */
            const resultVoteTopicByTopicName = yield vote_model_1.vote.getVoteTopicByTopicName(testVoteTopicName);
            /** validation 체크 */
            chai_1.expect(resultVoteTopicByTopicName).to.instanceof(Array);
            testVoteTopicIndex = resultVoteTopicByTopicName[0].voteTopicIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield vote_model_1.vote.deleteVoteTopic(testVoteTopicIndex);
            // console.log(result);
            chai_1.expect(result).instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const voteUser = yield user_model_1.user.getUser('kingdom0608@gmail.com');
        const result = yield voteReply_model_1.voteReply.createVoteReply({
            voteTopicIndex: testVoteTopicIndex,
            parentsVoteReplyIndex: 1,
            userIndex: voteUser[0].userIndex,
            content: '투표 댓글',
            status: 'ACTIVE'
        });
        delete result.voteTopicIndex;
        delete result.userIndex;
        chai_1.expect(result).to.eqls({
            parentsVoteReplyIndex: 1,
            content: '투표 댓글',
            status: 'ACTIVE'
        });
    }));
    it('listVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.listVoteReply(testVoteTopicIndex);
        testVoteReplyIndex = result[0].voteReplyIndex;
        testParentsVoteReplyIndex = result[0].parentsVoteReplyIndex;
        delete result[0].voteReplyIndex;
        delete result[0].voteTopicIndex;
        delete result[0].userIndex;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        chai_1.expect(result).to.eqls([{
                parentsVoteReplyIndex: 1,
                content: '투표 댓글',
                status: 'ACTIVE',
                userNickName: 'jade'
            }]);
    }));
    it('listChildVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.listChildVoteReply(testParentsVoteReplyIndex);
        delete result[0].voteReplyIndex;
        delete result[0].voteTopicIndex;
        delete result[0].userIndex;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        chai_1.expect(result).to.eqls([{
                parentsVoteReplyIndex: 1,
                content: '투표 댓글',
                status: 'ACTIVE',
                userNickName: 'jade'
            }]);
    }));
    it('pageListVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.pageListVoteReply(testVoteTopicIndex, 1, 10);
        // console.log({result});
        delete result[0].voteReplyIndex;
        delete result[0].voteTopicIndex;
        delete result[0].userIndex;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        chai_1.expect(result).to.eqls([{
                parentsVoteReplyIndex: 1,
                content: '투표 댓글',
                status: 'ACTIVE',
                userNickName: 'jade',
                childVoteReplyCount: 0
            }]);
    }));
    it('pageListChildVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.pageListChildVoteReply(testParentsVoteReplyIndex, 1, 10);
        // console.log(result);
        delete result[0].voteReplyIndex;
        delete result[0].voteTopicIndex;
        delete result[0].userIndex;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        chai_1.expect(result).to.eqls([{
                parentsVoteReplyIndex: 1,
                content: '투표 댓글',
                status: 'ACTIVE',
                userNickName: 'jade'
            }]);
    }));
    it('updateVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.updateVoteReply(testVoteReplyIndex, {
            content: '투표 댓글 업데이트'
        });
        // console.log(result);
        chai_1.expect(result).to.eqls({
            content: '투표 댓글 업데이트'
        });
    }));
    it('deleteVoteReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield voteReply_model_1.voteReply.deleteVoteReply(testVoteReplyIndex);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
});
//# sourceMappingURL=voteReply.model.spec.js.map
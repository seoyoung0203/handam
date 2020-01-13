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
describe('vote 모델', () => {
    let testVoteTopicIndex;
    let testVoteItemIndex;
    let testVoteItemIndex2;
    let testVoteTopicName = '한성대학교를 상징하는 동물은 무엇입니까?';
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
    /** 테스트 용도로 사용 */
    // it('createVoteTopic', async () => {
    // 	const result = await vote.createVoteTopic({
    // 		topicName: testVoteTopicName
    // 	});
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // });
    it('createVoteItem', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.createVoteItem({
            voteTopicIndex: testVoteTopicIndex,
            itemName: '호랑이',
            itemOrder: 1
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('createVoteItem2', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.createVoteItem({
            voteTopicIndex: testVoteTopicIndex,
            itemName: '거북이',
            itemOrder: 2
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('getVoteTopicByTopicIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteTopicByTopicIndex(testVoteTopicIndex);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('listVotePastTopic', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.listVotePastTopic();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListVotePastTopic', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.pageListVotePastTopic(1, 3);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('listVoteItemIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.listVoteItemIndex(testVoteTopicIndex);
        // console.log(result);
        testVoteItemIndex = result[0].voteItemIndex;
        testVoteItemIndex2 = result[1].voteItemIndex;
        chai_1.expect(result).instanceof(Array);
    }));
    it('createVoteUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const voteUser = yield user_model_1.user.getUser('kingdom0608@gmail.com');
        const result = yield vote_model_1.vote.createVoteUser({
            voteTopicIndex: testVoteTopicIndex,
            voteItemIndex: testVoteItemIndex,
            userIndex: voteUser[0].userIndex
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('createVoteUser2', () => __awaiter(void 0, void 0, void 0, function* () {
        const voteUser = yield user_model_1.user.getUser('tlswnsxo@naver.com');
        const result = yield vote_model_1.vote.createVoteUser({
            voteTopicIndex: testVoteTopicIndex,
            voteItemIndex: testVoteItemIndex2,
            userIndex: voteUser[0].userIndex
        });
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('listVoteItem', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.listVoteItem(testVoteTopicIndex, testVoteItemIndex);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('getVoteItem', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteItem(testVoteItemIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getVoteTopic', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteTopic();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getVoteTopicByStatus', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteTopicByStatus('ACTIVE');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getVoteUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteUser(testVoteTopicIndex, testVoteItemIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getVoteDateDiff', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteDateDiff('2018-07-16T21:28:00+0900', '2018-07-15T21:28:00+0900');
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listVoteUser', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.listVoteUser(testVoteTopicIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('checkVote', () => __awaiter(void 0, void 0, void 0, function* () {
        const voteUser = yield user_model_1.user.getUser('kingdom0608@gmail.com');
        const result = yield vote_model_1.vote.checkVote(testVoteTopicIndex, voteUser[0].userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getVoteUser2', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.getVoteUser(testVoteTopicIndex, testVoteItemIndex2);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateVoteTopic', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield vote_model_1.vote.updateVoteTopic(36, {
            status: 'INACTIVE'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    /** 테스트 용도로 사용 */
    // it('deleteVoteTopic', async () => {
    // 	const result = await vote.deleteVoteTopic(testVoteTopicIndex);
    // 	// console.log(result);
    // 	expect(result).instanceof(Object);
    // });
});
//# sourceMappingURL=vote.model.spec.js.map
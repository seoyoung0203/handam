import { expect } from 'chai';
import { vote } from './vote.model';
import { voteReply } from './voteReply.model'
import { voteReplySubscriber } from './voteReplySubscriber.model';

describe('voteReplySubscriber 모델', () => {
	let resultVoteReplyIndex;
	let resultVoteTopicIndex;
	before(async () => {
		try {
			const resultVote = await vote.createVoteTopic({
				topicName: '좋아요 테스트 투표',
				status: 'ACTIVE',
				dueDate: '2018-07-01'
			});
			const resultVoteTopicByTopicName = await vote.getVoteTopicByTopicName('좋아요 테스트 투표');
			resultVoteTopicIndex = resultVoteTopicByTopicName[0].voteTopicIndex;
			await voteReply.createVoteReply({
				voteTopicIndex: resultVoteTopicIndex,
				userIndex: 553,
				content: '투표 댓글',
				status: 'ACTIVE'
			});

			const result: any = await voteReply.listVoteReply(resultVoteTopicIndex);
			resultVoteReplyIndex = result[0].voteReplyIndex;
		} catch (err) {
			console.error('err', err);
		}
	})

	after(async () => {
		try {
			const result: any = await vote.deleteVoteTopic(resultVoteTopicIndex);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createVoteReplySubscriber', async () => {
		const result: any = await voteReplySubscriber.createVoteReplySubscriber({
			userIndex: 553,
			voteReplyIndex: resultVoteReplyIndex,
			isGood: 1,
		});
		expect(result).to.instanceof(Object);
	});
	it('getVoteReplySubscriber', async () => {
		const result: any = await voteReplySubscriber.getVoteReplySubscriber(553, resultVoteReplyIndex);
		expect(result).to.instanceof(Object);
	});
	it('getVoteReplySubscriberSumCount', async () => {
		const result: any = await voteReplySubscriber.getVoteReplySubscriberSumCount(resultVoteReplyIndex);
		expect(result).to.instanceof(Object);
	});
	it('updateVoteReplySubscriber', async () => {
		const result: any = await voteReplySubscriber.updateVoteReplySubscriber(553, resultVoteReplyIndex, {
			isGood: 0
		})
		expect(result).to.instanceof(Object);
	})
	it('deleteVoteReplySubscriber', async () => {
		const result: any = await voteReplySubscriber.deleteVoteReplySubscriber(553, resultVoteReplyIndex);
		expect(result).to.instanceof(Object);
	})

});
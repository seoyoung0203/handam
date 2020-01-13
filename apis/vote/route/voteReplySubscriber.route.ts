import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { voteReply } from '../model/voteReply.model'
import { voteReplySubscriber } from '../model/voteReplySubscriber.model';

export class VoteReplySubscriberRoutes {
	public voteReplySubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.voteReplySubscriberRouter.put('/voteReplySubscriber/voteReplyIndex/:voteReplyIndex', putVoteReplySubscriber);
	}
}

/**
 * route: voteReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function putVoteReplySubscriber(req, res): Promise<void> {
	try {
		const {voteReplyIndex} = req.params;
		const {tokenIndex} = auth(req);
		let result: any = await voteReplySubscriber.updateVoteReplySubscriber(tokenIndex, +voteReplyIndex, req.body);
		if (result.changedRows == 0) {
			result = await voteReplySubscriber.createVoteReplySubscriber({
				userIndex: tokenIndex,
				voteReplyIndex,
				isGood: 0
			});
		} else {
			result = await voteReplySubscriber.getVoteReplySubscriber(tokenIndex, voteReplyIndex);
			result = result[0];
			if (result.isGood == 0) {
				await voteReplySubscriber.deleteVoteReplySubscriber(tokenIndex, voteReplyIndex);
			}
		}
		const sumResult: any = await voteReplySubscriber.getVoteReplySubscriberSumCount(voteReplyIndex);
		await voteReply.updateVoteReply(voteReplyIndex, sumResult[0]);

		delete result.userIndex;
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'putVoteReplySubscriber: 200'
		})
	} catch (err) {
		console.log({err});
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
}

export const voteReplySubscriberRoutes: VoteReplySubscriberRoutes = new VoteReplySubscriberRoutes();
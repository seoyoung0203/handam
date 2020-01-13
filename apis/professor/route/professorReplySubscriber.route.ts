import * as express from 'express'
import { auth } from '../../../packages/utils/auth.util';
import { professorReply } from '../model/professorReply.model';
import { professorReplySubscriber } from '../model/professorReplySubscriber.model';

export class ProfessorReplySubscriberRoutes {
	public professorReplySubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.professorReplySubscriberRouter.put('/professorReplySubscriber/professorReply/:professorReplyIndex'
			, putProfessorReplySubscriber);
	}
}

/**
 * route: professorReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function putProfessorReplySubscriber(req, res): Promise<void> {
	try {
		const {professorReplyIndex} = req.params;
		const {tokenIndex} = auth(req);
		let result: any = await professorReplySubscriber.updateProfessorReplySubscriber(professorReplyIndex, tokenIndex, req.body);
		if (result.changedRows === 0) {
			result = await professorReplySubscriber.createProfessorReplySubscriber({
				userIndex: tokenIndex,
				professorReplyIndex: professorReplyIndex,
				isGood: 1
			});
		} else {
			result = await professorReplySubscriber.getProfessorReplySubscriber(tokenIndex, professorReplyIndex);

			result = result[0];
			if (result.isGood === 0) {
				await professorReplySubscriber.deleteProfessorReplySubscriber(tokenIndex, professorReplyIndex);
			}
		}

		const sumResult: any = await professorReplySubscriber.getProfessorReplySubscriberSumCount(professorReplyIndex);
		await professorReply.updateProfessorReply(professorReplyIndex, sumResult[0]);

		delete result.userIndex;

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'putProfessorReplySubscriber: 200'
		})

	} catch (err) {
		switch (err) {
			default:
				console.log(err);
				res.send({
					success: false,
					statusCode: 500,
					message: 'putProfessorReplySubscriber: 50000'
				});
				break;
		}
	}
}

export const professorReplySubscriberRoutes: ProfessorReplySubscriberRoutes = new ProfessorReplySubscriberRoutes();
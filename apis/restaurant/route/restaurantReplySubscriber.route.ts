import * as express from 'express'
import { auth } from '../../../packages/utils/auth.util';
import { restaurantReply } from '../model/restaurantReply.model';
import { restaurantReplySubscriber } from '../model/restaurantReplySubscriber.model';

export class RestaurantReplySubscriberRoutes {
	public restaurantReplySubscriberRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantReplySubscriberRouter.put('/restaurantReplySubscriber/restaurantReply/:restaurantReplyIndex', putRestaurantReplySubscriber);
	}
}

/**
 *route: restaurantReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

async function putRestaurantReplySubscriber(req, res): Promise<void> {
	try {
		const {restaurantReplyIndex} = req.params;
		const {tokenIndex} = auth(req);
		let result: any = await restaurantReplySubscriber.updateRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex, req.body);
		if (result.changedRows === 0) {
			result = await restaurantReplySubscriber.createRestaurantReplySubscriber({
				userIndex: tokenIndex,
				restaurantReplyIndex: restaurantReplyIndex,
				isGood: 1
			});
		} else {
			result = await restaurantReplySubscriber.getRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex);
			result = result[0];
			if (result.isGood === 0) {
				await restaurantReplySubscriber.deleteRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex)
			}
		}

		const sumResult: any = await restaurantReplySubscriber.getRestaurantReplySubscriberSumCount(restaurantReplyIndex);
		await restaurantReply.updateRestaurantReply(restaurantReplyIndex, sumResult[0]);

		delete result.userIndex;
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'putRestaurantReplySubscriber: 200'
		})

	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'putRestaurantReplySubscriber: 50000'
				});
				break;
		}
	}
}

export const restaurantReplySubscriberRoutes: RestaurantReplySubscriberRoutes = new RestaurantReplySubscriberRoutes()

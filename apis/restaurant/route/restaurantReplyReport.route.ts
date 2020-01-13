import * as express from 'express';
import { slack } from '../../../packages/core/slack/slack';
import { user } from '../../user/model/user.model'
import { restaurantReply } from '../model/restaurantReply.model';
import { restaurantReplyReport } from '../model/restaurantReplyReport.model';

export class RestaurantReplyReportRoute {
	public restaurantReplyReportRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.restaurantReplyReportRouter.post('/restaurantReplyReport', createRestaurantReplyReport);
		this.restaurantReplyReportRouter.get('/restaurantReplyReport', listRestaurantReplyReport);
		this.restaurantReplyReportRouter.get('/restaurantReplyReport/userId/:userId', getRestaurantReplyReportByUserId);
		this.restaurantReplyReportRouter.put('/restaurantReplyReport/restaurantReplyReportIndex/:restaurantReplyReportIndex',
			updateRestaurantReplyReport);
		this.restaurantReplyReportRouter.delete('/restaurantReplyReport', deleteRestaurantReplyReport);
	}
}

/**
 * route: restaurantReplyReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createRestaurantReplyReport(req, res): Promise<void> {
	const {userId, ...restaurantReplyReportData} = req.body;
	try {
		const resultUser = await user.getUser(userId);
		const {userIndex} = resultUser[0];
		restaurantReplyReportData.userIndex = userIndex;

		const checkResult: any = await restaurantReplyReport.checkRestaurantReplyReport(restaurantReplyReportData.restaurantReplyIndex, userIndex);
		if (checkResult.length > 0) {
			throw 'report duplicated';
		}

		await restaurantReplyReport.createRestaurantReplyReport(restaurantReplyReportData);

		let countResult: any = await restaurantReplyReport.getRestaurantReplyReport(restaurantReplyReportData.restaurantReplyIndex);

		const replyLimitCount = 5;
		const reportCount = countResult[0]['reportCount'];
		if (reportCount === replyLimitCount) {
			const color = '#0013FF';
			const field = {
				'title': `Restaurant Reply Report 알림`,
				'value': `restaurantReplyIndex=${restaurantReplyReportData.restaurantReplyIndex}, reportCount=${reportCount}\nContent:${restaurantReplyReportData.content}`,
				'short': false
			};
			await Promise.all([
				restaurantReply.updateRestaurantReplyStatus(restaurantReplyReportData.restaurantReplyIndex, 'INACTIVE'),
				slack.sendReportMessage('restaurantReplyReport', field, color)
			]);
		}
		res.send({
			success: true,
			statusCode: 200,
			result: restaurantReplyReportData,
			message: 'createRestaurantReplyReport : 200'
		});
	} catch (err) {
		switch (err) {
			case 'report duplicated':
				res.send({
					success: false,
					statusCode: 409,
					message: 'createRestaurantReplyReport: 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createRestaurantReplyReport : 50000'
				});
				break;
		}
	}
}

/**
 * route : restaurantReplyReport 조회
 * @param req
 * @param res
 * @return {Promise<any>}
 */
async function listRestaurantReplyReport(req, res): Promise<any> {
	try {
		const result: any = await restaurantReplyReport.listRestaurantReplyReport();
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantReplyResult: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantReplyReport : 50000'
				});
		}
	}
}

/**
 * route: UserId에 따른 restaurantReply 조회
 * @param req
 * @param res
 * @returns {Promise<anny>}
 */
async function getRestaurantReplyReportByUserId(req, res): Promise<any> {
	const {userId} = req.params;
	const [resultUser] = await user.getUser(userId);
	const {userIndex} = resultUser;
	try {
		const result: any = await restaurantReplyReport.getRestaurantReplyReportByUserIndex(userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getRestaurantReplyReportByUserId : 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getRestaurantReplyReport : 50000'
				});
		}
	}
}

/**
 * route: restaurantReplyReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateRestaurantReplyReport(req, res): Promise<void> {
	const {restaurantReplyReportIndex} = req.params;
	const {userId} = req.body;
	try {
		const [resultUser] = await user.getUser(userId);
		const {userIndex} = resultUser;

		delete req.body.userId;
		req.body.userIndex = userIndex;

		const restaurantReplyReportData: any = {
			userIndex: req.body.userIndex,
			restaurantReplyIndex: req.body.restaurantReplyIndex,
			content: req.body.content,
		};
		const result: any = await restaurantReplyReport.updateRestaurantReplyReport(restaurantReplyReportIndex, restaurantReplyReportData);
		res.send({
			success: true,
			status: 200,
			result: result,
			message: 'updateRestaurantReplyReport: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateRestaurantReplyReport : 50000'
				});
		}
	}
}

/**
 * route: restaurantReplyReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteRestaurantReplyReport(req, res): Promise<any> {
	const {restaurantReplyIndex, userId} = req.body;
	const [resultUser] = await user.getUser(userId);
	const {userIndex} = resultUser;
	try {
		const result: any = await restaurantReplyReport.deleteRestaurantReplyReport(restaurantReplyIndex, userIndex);
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'updateRestaurantReplyReport : 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteRestaurantReplyReport : 50000'
				});
		}
	}
}

export const restaurantReplyReportRoutes: RestaurantReplyReportRoute = new RestaurantReplyReportRoute();


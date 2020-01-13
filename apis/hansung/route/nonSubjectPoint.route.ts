import * as express from 'express';
import { nonSubjectPoint } from '../model/nonSubjectPoint.model';

export class NonSubjectPointRoutes {
	public nonSubjectPointRoute: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.nonSubjectPointRoute.get('/nonSubjectPoint', listNonSubjectPoint);
	}

}

/**
 * route: nonSubjectPoint 조회
 * @param req
 * @param res
 */
async function listNonSubjectPoint(req, res) {

	try {
		const result = await nonSubjectPoint.listNonSubjectPoint();

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getNonSubjectPoint : 200'
		});
	} catch (err) {
		res.send({
			success: false,
			statusCode: 500,
			message: 'getNonSubjectPoint : 50000'
		});
	}
}

export const nonSubjectPointRoutes: NonSubjectPointRoutes = new NonSubjectPointRoutes();
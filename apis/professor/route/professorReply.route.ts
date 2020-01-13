import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { IProfessorInfo } from '../../../resources/IProfessorInfo';
import { IProfessorReply } from '../../../resources/IProfessorReply';
import { professorInfo } from '../model/professorInfo.model';
import { professorReply } from '../model/professorReply.model';
import {professorReplySubscriber} from "../model/professorReplySubscriber.model";
import {professor} from "../model/professor.model";

export class ProfessorReplyRoutes {
	public professorReplyRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.professorReplyRouter.post('/professorReply/professorInfoIndex/:professorInfoIndex', createProfessorReply);
		this.professorReplyRouter.get('/professorReply/professorInfoIndex/:professorInfoIndex', pageListProfessorReply);
		this.professorReplyRouter.get('/professorReply/myProfessorReplyPostList', myProfessorReplyPostList);
		this.professorReplyRouter.get('/professorReply/getProfessorReply/:professorReplyIndex', getProfessorReply);
		this.professorReplyRouter.put('/professorReply/professorReplyIndex/:professorReplyIndex', updateProfessorReply);
		this.professorReplyRouter.delete('/professorReply/professorReplyIndex/:professorReplyIndex', deleteProfessorReply);
	}
}

/**
 * route: professorReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createProfessorReply(req, res): Promise<void> {
	try {
		const {professorInfoIndex} = req.params;
		const {tokenIndex: userIndex} = auth(req);
		const professorReplyData: IProfessorReply = {
			...req.body,
			userIndex,
			professorInfoIndex
		};
		const result = await professorReply.createProfessorReply(professorReplyData);
		const [averageResult]: IProfessorInfo[] = await professorReply.averageProfessorReply(professorInfoIndex);
		await professorInfo.updateProfessorInfo(professorInfoIndex, JSON.parse(JSON.stringify(averageResult)));

		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'createProfessorReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				console.log({err});
				res.send({
					success: false,
					statusCode: 500,
					message: 'createProfessorReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorReply page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListProfessorReply(req, res): Promise<void> {
	let professorInfoIndex: number = req.params.professorInfoIndex;
	let {page, count} = req.query;
	page = page ? parseInt(page) : 0;
	count = count ? parseInt(count) : 5;

	try {
		const {tokenIndex} = auth(req);
		const resultCount: any = await professorReply.listProfessorReply(professorInfoIndex);
		const result = await professorReply.pageListProfessorReply(professorInfoIndex, page, count);

		for (const row of result) {
			const resultProfessorSubscriber: any =
				await professorReplySubscriber.getProfessorReplySubscriberByUserIndex(row.professorReplyIndex, tokenIndex);
			row.isGood = resultProfessorSubscriber.length > 0 && resultProfessorSubscriber[0].isGood === 1;
		}

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result,
			message: 'pageListProfessorReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListProfessorReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateProfessorReply(req, res): Promise<void> {
	let professorReplyIndex: number = req.params.professorReplyIndex;
	let professorReplyData: IProfessorReply = req.body;
	try {
		const result: any = await professorReply.updateProfessorReply(professorReplyIndex, professorReplyData);
		const resultReply: any = await professorReply.getProfessorReply(professorReplyIndex);
		const resultProfessorInfoIndex = resultReply[0].professorInfoIndex;
		const [avgResult]: IProfessorInfo[] = await professorReply.averageProfessorReply(resultProfessorInfoIndex);
		await professorInfo.updateProfessorInfo(resultProfessorInfoIndex, JSON.parse(JSON.stringify(avgResult)));

		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'updateProfessorReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateProfessorReply: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorReply 내가 쓴 교수평가 리스트
 * @param req
 * @param res
 */
async function myProfessorReplyPostList(req, res): Promise<void> {
	try {
		const {tokenIndex: userIndex} = auth(req);
		const result: any = await professorReply.myProfessorReplyPostList(userIndex);

		for (const row of result) {
			const [resultProfessorSubscriber] = await Promise.all([
				professorReplySubscriber.getProfessorReplySubscriberByUserIndex(userIndex, row.professorReplyIndex),
			]);
			row.isGood = professorReplySubscriber[0] ? resultProfessorSubscriber[0].isGood: 0;
			let resultTrack = await professor.getProfessorTrackByProfessorIndex(row.professorIndex);
			resultTrack = resultTrack.map(m => m.trackName);
			row.track = resultTrack;
		}
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'myProfessorReplyPostList: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'myProfessorReplyPostList: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorReply 조회
 * @param req
 * @param res
 */
async function getProfessorReply(req, res): Promise<void> {
	let professorReplyIndex: number = req.params.professorReplyIndex;

	try {
		const result: any = await professorReply.getProfessorReply(professorReplyIndex);

		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'myProfessorReplyPost: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'myProfessorReplyPost: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteProfessorReply(req, res): Promise<void> {
	let professorReplyIndex: number = req.params.professorReplyIndex;
	try {
		const resultReply: any = await professorReply.getProfessorReply(professorReplyIndex);
		const result: IProfessorReply = await professorReply.deleteProfessorReply(professorReplyIndex);
		const resultProfessorInfoIndex = resultReply[0].professorInfoIndex;
		const resultCount: any = await professorReply.listProfessorReply(resultProfessorInfoIndex);
		let [avgResult]: IProfessorInfo[] = await professorReply.averageProfessorReply(resultProfessorInfoIndex);
		if (resultCount < 1) {
			avgResult = {
				avgLecturePower: 0,
				avgCommunication: 0,
				avgHomework: 0,
				avgElasticity: 0,
				avgGrade: 0,
				goodCount: 0,
				badCount: 0
			}
		}

		await professorInfo.updateProfessorInfo(resultProfessorInfoIndex, JSON.parse(JSON.stringify(avgResult)));

		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'deleteProfessorReply: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteProfessorReply: 50000'
				});
				break;
		}
	}
}

export const professorReplyRoutes: ProfessorReplyRoutes = new ProfessorReplyRoutes();

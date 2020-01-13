import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { IProfessorInfo } from '../../../resources/IProfessorInfo';
import { professorInfo } from '../model/professorInfo.model';
import { professor } from "../model/professor.model";
import { professorReply } from "../model/professorReply.model";

export class ProfessorInfoRoutes {
	public professorInfoRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.professorInfoRouter.post('/professorInfo', createProfessorInfo);
		this.professorInfoRouter.get('/professorInfo', pageListProfessorInfo);
		this.professorInfoRouter.get('/professorInfo/professorIndex/:professorIndex', getProfessorInfo);
		this.professorInfoRouter.put('/professorInfo/professorInfoIndex/:professorInfoIndex', updateProfessorInfo);
	}
}

/**
 * route: professorInfo 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createProfessorInfo(req, res): Promise<void> {

	try {
		const professorInfoData: IProfessorInfo = req.body;
		const result: IProfessorInfo = await professorInfo.createProfessorInfo(professorInfoData);
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'createProfessorInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createProfessorInfo: 50000'
				})
		}
	}
}

/**
 * route: professorInfo 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function pageListProfessorInfo(req, res): Promise<void> {
	try {
		let {page, count, filter, orderBy} = req.query;
		page = page ? parseInt(page) : 0;
		count = count ? parseInt(count) : 6;

		const {tokenIndex} = auth(req);
		const resultCount: any = await professorInfo.listProfessorInfo();
		const result: any = await professorInfo.pageListProfessorInfo(page, count, filter, orderBy);

		for (const row of result) {
			const resultProfessorReply: any = await professorReply.getProfessorReplyByUserIndex(row.professorInfoIndex, tokenIndex);
			row.isGood = resultProfessorReply.length > 0 ? resultProfessorReply[0].recommendation === 1 : false;
			let resultTrack = await professor.getProfessorTrackByProfessorIndex(row.professorIndex);
			resultTrack = resultTrack.map(m => m.trackName);
			row.track = resultTrack;

		}

		res.send({
			success: true,
			statusCode: 200,
			resultCount: resultCount.length,
			result,
			message: 'pageListProfessorInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'pageListProfessorInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorInfo 조회
 * @param req
 * @param res
 */
async function getProfessorInfo(req, res): Promise<any> {
	let professorIndex: number = req.params.professorIndex;
	try {
		const {tokenIndex} = auth(req);
		const result: any = await professorInfo.getProfessorInfo(professorIndex);

		for( const row of result){
			const resultProfessorReply: any =  await professorReply.getProfessorReplyByUserIndex(row.professorInfoIndex, tokenIndex);
			row.isGood = resultProfessorReply.length > 0 ? resultProfessorReply[0].recommendation : -1;
			let resultTrack = await professor.getProfessorTrackByProfessorIndex(professorIndex);
			resultTrack = resultTrack.map(m => m.trackName);
			row.track = resultTrack;
		}
		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getProfessorInfo: 200'
		})
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getListProfessorInfo: 50000'
				});
				break;
		}
	}
}

/**
 * route: professorInfo 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateProfessorInfo(req, res): Promise<void> {
	const {professorInfoIndex} = req.params;
	const professorInfoData: IProfessorInfo = req.body;
	try {
		const result: any = await professorInfo.updateProfessorInfo(professorInfoIndex, professorInfoData);
		res.send({
			success: true,
			statusCode: 200,
			result,
			message: 'updateProfessorInfo: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'updateProfessorInfo: 50000'
				});
				break;
		}
	}
}

export const professorInfoRoutes: ProfessorInfoRoutes = new ProfessorInfoRoutes();

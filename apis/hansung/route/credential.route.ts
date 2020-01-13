import * as express from 'express';
import { auth } from '../../../packages/utils/auth.util';
import { encryptHansungInfoPw } from '../../../packages/utils/encryption.util';
import { sqsUtil } from '../../../packages/utils/sqs.util';
import { user } from '../../user/model/user.model';
import { credential } from '../model/credential.model';

export class CredentialRoutes {
	public credentialRouter: express.Router = express.Router();

	constructor() {
		this.router();
	}

	public router() {
		this.credentialRouter.post('/hansung', createCredential);
		this.credentialRouter.get('/hansung', getCredential);
		this.credentialRouter.delete('/hansung', deleteCredential);
	}
}

/**
 * route: hansung 생성
 * @param req
 * @param res
 */
async function createCredential(req, res) {
	try {
		let userData = auth(req);
		let hansungInfoPw = req.body.hansungInfoPw;
		hansungInfoPw = encryptHansungInfoPw.encryptHansungInfoPw(hansungInfoPw);
		hansungInfoPw = hansungInfoPw.toString();
		const result: any = await credential.createCredential({
			userIndex: userData.tokenIndex,
			hansungInfoId: req.body.hansungInfoId
		});

		if (result !== null) {
			let params = sqsUtil.sendParams;
			sqsUtil.sendParams.MessageBody = `credential:${result.userIndex}:${result.hansungInfoId}:${hansungInfoPw}`;
			await sqsUtil.sendMessage(params);
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'createCredential: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item already exists':
				res.send({
					success: false,
					statusCode: 409,
					message: 'createCredential : 40901'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'createCredential : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansung 조회
 * @param req
 * @param res
 */
async function getCredential(req, res) {
	try {
		let userData = auth(req);
		const result: any = await credential.getCredential(userData.tokenIndex);

		if (result !== null) {
			delete result.credentialPw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'getCredential: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'getCredential : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'getCredential : 50000'
				});
				break;
		}
	}
}

/**
 * route: hansung 삭제
 * @param req
 * @param res
 */
async function deleteCredential(req, res) {
	try {
		let userData = auth(req);
		const result: any = await credential.deleteCredential(userData.tokenIndex);
		await user.updateUserByUserIndex(userData.tokenIndex, {
			isValidation: 0
		});

		if (result !== null) {
			delete result.credential.Pw;
		}

		res.send({
			success: true,
			statusCode: 200,
			result: result,
			message: 'deleteCredential: 200'
		});
	} catch (err) {
		switch (err) {
			case 'DynamoDB item does not exist':
				res.send({
					success: false,
					statusCode: 404,
					message: 'deleteCredential : 40401'
				});
				break;
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'deleteCredential : 50000'
				});
				break;
		}
	}
}

export const credentialRoutes: CredentialRoutes = new CredentialRoutes();
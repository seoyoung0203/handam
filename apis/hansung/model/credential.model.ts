import * as dynamo from 'dynamodb';
import * as fs from 'fs';
import * as Joi from 'joi';
import { Dynamo } from '../../../packages/utils/dynamo.util';

const file = './packages/utils/config/env.json';
let dynamoData: any = fs.readFileSync(file, 'utf8');
dynamoData = JSON.parse(dynamoData);

let stage;
if (dynamoData.stage === 'prod') {
	stage = 'prod'
} else {
	stage = 'dv'
}

let CredentialDynamo = dynamo.define(`${stage}-handam-credential`, {
	hashKey: 'userIndex',
	timestamps: true,
	createdAt: true,
	updatedAt: 'updateTimestamp',
	schema: {
		userIndex: Joi.number(),
		hansungInfoId: Joi.string(),
		name: Joi.string(),
		status: Joi.string(),
		errorMessage: Joi.string()
	},
	tableName: `${stage}-handam-credential`
});

interface ICredential {
	userIndex: number,
	hansungInfoId: string,
	name?: string,
	status?: string,
	errorMessage?: string
}

export class Credential extends Dynamo {
	constructor() {
		super(CredentialDynamo, {
			hashKey: 'userIndex'
		});
	}

	/**
	 * model: Credential 생성
	 * @param data
	 */
	async createCredential(data: ICredential) {
		data.status = data.status || 'UNVERIFIED';
		return await this.create(data);
	}

	/**
	 * model: Credential 리스트 조회
	 * @param userIndex
	 */
	async listCredential(userIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db
				.query(userIndex)
				.exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						let hansungInfo: any = this.getResults(result);
						resolve(hansungInfo);
					}
				})
		})
	}

	/**
	 * model: Credential 조회
	 * @param userIndex
	 */
	async getCredential(userIndex: number): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.db
				.query(userIndex)
				.exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						let hansungInfo: any = this.getResult(result);
						resolve(hansungInfo);
					}
				});
		});
	}

	/**
	 * model: Credential 업데이트
	 * @param userIndex
	 * @param credentialData
	 */
	async updateCredential(userIndex: number, credentialData: any) {
		credentialData.userIndex = userIndex;
		return super.update(credentialData);
	}

	/**
	 * model: Credential 삭제
	 * @param userIndex
	 */
	async deleteCredential(userIndex: number) {
		return super.destroy(userIndex);
	}
}

export const credential: Credential = new Credential();

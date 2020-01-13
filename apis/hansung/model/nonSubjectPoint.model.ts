import * as dynamo from 'dynamodb';
import * as fs from 'fs';
import * as Joi from 'joi';
import { Dynamo } from '../../../packages/utils/dynamo.util';

const file = './packages/utils/config/env.json';
let dynamoData: any = fs.readFileSync(file, 'utf8');
dynamoData = JSON.parse(dynamoData);

const stage = dynamoData.stage === 'prod' ? 'prod' : 'dv';

let nonSubjectPointDynamo = dynamo.define(`${stage}-handam-nonSubjectPoint`, {
	hashKey: 'nonSubjectPointIndex',
	timestamps: true,
	createdAt: true,
	schema: {
		nonSubjectPointIndex: Joi.string(),
		nonSubjectPointTitle: Joi.string(),
		nonSubjectPointPublisher: Joi.string(),
		nonSubjectPointCreatedAt: Joi.string()
	},
	tableName: `${stage}-handam-nonSubjectPoint`
});

interface INonSubjectPoint {
	nonSubjectPointIndex: string,
	nonSubjectPointTitle: string,
	nonSubjectPointPublisher: string,
	nonSubjectPointCreatedAt: string
}

export class NonSubjectPoint extends Dynamo {

	constructor() {
		super(nonSubjectPointDynamo, {
			hashKey: 'nonSubjectPointIndex'
		});
	}

	/**
	 * model: NonSubjectPoint 리스트 조회
	 * @param nonSubjectPointIndex
	 */
	async listNonSubjectPoint(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db
				.scan()
				.exec((err, result) => {
					if (err) {
						reject(err)
					} else {
						let nonSubjectPoint = this.getResults(result);
						resolve(nonSubjectPoint);
					}
				});
		});
	}

}

export const nonSubjectPoint: NonSubjectPoint = new NonSubjectPoint();
import { expect } from 'chai';
import { nonSubjectPoint } from './nonSubjectPoint.model';

describe('nonSubjectPoint 모델', async () => {

	it('listNonSubjectPoint', async () => {
		const result: any = await nonSubjectPoint.listNonSubjectPoint();
		// console.log(typeof result)
		expect(result).to.instanceof(Object);
	});

})
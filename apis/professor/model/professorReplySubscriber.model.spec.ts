import { expect } from 'chai';
import { professorReplySubscriber } from './professorReplySubscriber.model';

describe('professorReplySubscriber 모델 ', () => {
	let professorReplyIndex = 53;
	let userIndex = 1;

	it('createProfessorReplySubscriber', async () => {
		const result = await professorReplySubscriber.createProfessorReplySubscriber({
			professorReplyIndex: professorReplyIndex,
			userIndex: userIndex,
			isGood: 1
		});
		//console.log(result);
		expect(result).to.instanceof(Object)
	});

	it('getProfessorReplySubscriber', async () => {
		const result: any = await professorReplySubscriber.getProfessorReplySubscriber(userIndex, professorReplyIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorReplySubscriberSumCount', async () => {
		const result: any = await professorReplySubscriber.getProfessorReplySubscriberSumCount(professorReplyIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorReplySubscriberByUserIndex', async () => {
		const result: any = await professorReplySubscriber.getProfessorReplySubscriberByUserIndex(professorReplyIndex, userIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateProfessorReplySubscriber', async () => {
		const result: any = await professorReplySubscriber.updateProfessorReplySubscriber(professorReplyIndex, userIndex, {
			isGood: 0
		});
		//console.log({result});
		expect(result).to.instanceof(Object);
	});

	it('deleteProfessorReplySubscriber', async () => {
		const result: any = await professorReplySubscriber.deleteProfessorReplySubscriber(userIndex, professorReplyIndex);
		expect(result).to.instanceof(Object);
	})
});

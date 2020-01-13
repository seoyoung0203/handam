import { expect } from 'chai';
import { professorReply } from './professorReply.model';

describe('professorReply 모델', () => {

	let testProfessorInfoIndex: number = 1;
	let testUserIndex: number = 1;
	let testLecturePower: number = 3;
	let testHomework: number = 3;
	let testElasticity: number = 4;
	let testRecommendation: number = 3;
	let testCommunication: number = 4;
	let testGrade: number = 4;
	let testContent: string = 'professor content';

	it('createProfessorReply', async () => {
		const result = await professorReply.createProfessorReply({
			professorInfoIndex: testProfessorInfoIndex,
			userIndex: testUserIndex,
			lecturePower: testLecturePower,
			homework: testHomework,
			elasticity: testElasticity,
			communication: testCommunication,
			recommendation: testRecommendation,
			grade: testGrade,
			content: testContent
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listProfessorReply', async () => {
		const result = await professorReply.listProfessorReply(testProfessorInfoIndex);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('pageListProfessorReply', async () => {
		const result = await professorReply.pageListProfessorReply(testProfessorInfoIndex, 3, 0);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('myProfessorReplyPostList', async () => {
		const result = await professorReply.myProfessorReplyPostList(1);
		//console.log(result);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorReply', async () => {
		const result = await professorReply.getProfessorReply(4);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getProfessorReplyByUserIndex', async () => {
		const result = await professorReply.getProfessorReplyByUserIndex(testProfessorInfoIndex, testUserIndex);
		console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('averageProfessorReply', async () => {
		const result = await professorReply.averageProfessorReply(1);
		//console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('updateProfessorReply', async () => {
		const result = await professorReply.updateProfessorReply(0, {
			homework: 1,
			content: '테스트 수정'
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteProfessorReply', async () => {
		const result = await professorReply.deleteProfessorReply(0);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

});

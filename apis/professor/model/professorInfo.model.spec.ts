import { expect } from 'chai'
import { IProfessorInfo } from '../../../resources/IProfessorInfo';
import { professorInfo } from './professorInfo.model';

describe('professorInfo 모델', () => {
	let resultProfessorInfo;
	let professorIndex = 4;

	it('createProfessorInfo', async () => {
		const result: IProfessorInfo = await professorInfo.createProfessorInfo({
			professorIndex: professorIndex,
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('getProfessorInfo', async () => {
		const result = await professorInfo.getProfessorInfo(professorIndex);
		//console.log('getProfessorInfo', result);
		resultProfessorInfo = result;
		expect(result).to.instanceof(Array);
	});

	it('listProfessorInfo', async () => {
		const result = await professorInfo.listProfessorInfo();
		//console.log('listProfessorInfo', result);
		expect(result).to.instanceof(Array);
	});

	it('pageListProfessorInfo', async () => {
		const result = await professorInfo.pageListProfessorInfo(0, 6, `trackName like 정`);
		//console.log('pageListProfessorInfo', result);
		expect(result).to.instanceof(Array);
	});

	it('updateProfessorInfo', async () => {
		const result = await professorInfo.updateProfessorInfo(resultProfessorInfo[0].professorInfoIndex, {
			avgLecturePower: 1,
			avgHomework: 1,
		});
		//console.log(result);
		expect(result).to.instanceof(Object);
	});


	it('deleteProfessorInfo', async () => {
		const result = await professorInfo.deleteProfessorInfo(resultProfessorInfo[0].professorIndex);
		//console.log('deleteProfessorInfo',result);
		expect(result).to.instanceof(Object);
	});
});
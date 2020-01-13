import { expect } from 'chai';
import { credential } from './credential.model';

describe('hansung 모델', async () => {
	let createCredential;

	it('createCredential', async () => {
		const result: any = await credential.createCredential({
			userIndex: 1,
			hansungInfoId: 'testCredentialId'
		});
		createCredential = result;
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('listCredential', async () => {
		const result: any = await credential.listCredential(createCredential.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Array);
	});

	it('getCredential', async () => {
		const result: any = await credential.getCredential(createCredential.userIndex);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('updateCredential', async () => {
		const result: any = await credential.updateCredential(createCredential.userIndex, {
			accessCount: 5
		});
		// console.log(result);
		expect(result).to.instanceof(Object);
	});

	it('deleteCredential', async () => {
		const result: any = await credential.deleteCredential(1);
		// console.log(result);
		expect(result).to.instanceof(Object);
	});
});

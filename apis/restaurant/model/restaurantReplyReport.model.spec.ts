import { expect } from 'chai';
import { restaurantReplyReport } from './restaurantReplyReport.model';

describe('restaurantReplyReport 모델', () => {

	let userIndex: number = 1;
	let restaurantReplyIndex: number = 1;
	let resultRestaurantReplyReportIndex;

	it('createRestaurantReplyReport', async () => {
		const result = restaurantReplyReport.createRestaurantReplyReport({
			userIndex: userIndex,
			restaurantReplyIndex: restaurantReplyIndex,
			content: 'Test Report!'
		});
		expect(result).to.instanceof(Object);
	});

	it('checkRestaurantReplyReport', async () => {
		const result = await restaurantReplyReport.checkRestaurantReplyReport(restaurantReplyIndex, userIndex);
		console.log('checkResReplyReport', result);
		resultRestaurantReplyReportIndex = result[0].restaurantReplyReportIndex;
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantReplyReport', async () => {
		const result = await restaurantReplyReport.getRestaurantReplyReport(restaurantReplyIndex);
		expect(result).to.instanceof(Array);
	});

	it('listRestaurantReplyReport', async () => {
		const result = await restaurantReplyReport.listRestaurantReplyReport();
		expect(result).to.instanceof(Array);
	});
	it('getRestaurantReplyReportByUserIndex', async () => {
		const result = await restaurantReplyReport.getRestaurantReplyReportByUserIndex(userIndex);
		expect(result).to.instanceof(Array);
	});
	it('updateRestaurantReplyReport', async () => {
		const result = await restaurantReplyReport.updateRestaurantReplyReport(resultRestaurantReplyReportIndex, {
			userIndex: userIndex,
			restaurantReplyIndex: restaurantReplyIndex,
			content: 'Updated Test Report!'
		});
		expect(result).to.instanceof(Object);
	});
	it('deleteRestaurantReplyReport', async () => {
		const result = await restaurantReplyReport.deleteRestaurantReplyReport(restaurantReplyIndex, userIndex);
		expect(result).to.instanceof(Object);
	});
});
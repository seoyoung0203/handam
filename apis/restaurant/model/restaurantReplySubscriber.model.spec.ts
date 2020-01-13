import { expect } from 'chai';
import { restaurant } from './restaurant.model';
import { restaurantReply } from './restaurantReply.model';
import { restaurantReplySubscriber } from './restaurantReplySubscriber.model';

describe('restauratReplySubscriber 모델', () => {
	let restaurantIndex;
	let restaurantReplyIndex;

	before(async () => {
		try {

			await restaurant.createRestaurant({
				restaurantCategoryIndex: 1,
				name: 'Hyo',
				address: '서울시',
				locationUrl: '0',
				tel: '000-000-000',
				openingHours: ' 11:30 - 15:00 , 17:00 - 22:00 (일 휴무)',
				review: '테스트 리뷰',
				goodCount: '0'
			});
			const resultRestaurant: any = await restaurant.getRestaurantByName('Hyo')
			restaurantIndex = resultRestaurant[0].restaurantIndex;

			await restaurantReply.createRestaurantReply({
				restaurantIndex,
				userIndex: 1,
				content: '테스트 게시글 댓글',
				status: 'ACTIVE'
			});

			const result: any = await restaurantReply.listRestaurantReply(restaurantIndex);
			restaurantReplyIndex = result[0].restaurantReplyIndex;

		} catch (err) {
			console.error('err', err)
		}
	});

	after(async () => {
		try {
			const result: any = await restaurant.deleteRestaurant(restaurantIndex);
			expect(result).to.instanceof(Object);
		} catch (err) {
			console.error('err', err);
		}
	});

	it('createRestaurantReplySubscriber', async () => {
		const result: any = await restaurantReplySubscriber.createRestaurantReplySubscriber({
			userIndex: 1,
			restaurantReplyIndex: restaurantReplyIndex,
			isGood: 1
		});
		//console.log(result);
		expect(result).to.instanceof(Object)
	});

	it('getRestaurantReplySubscriber', async () => {
		const result: any = await restaurantReplySubscriber.getRestaurantReplySubscriber(1, restaurantReplyIndex)
		expect(result).to.instanceof(Array);
	});

	it('getRestaurantReplySubscriberSumCount', async () => {
		const result: any = await restaurantReplySubscriber.getRestaurantReplySubscriberSumCount(restaurantReplyIndex);
		expect(result).to.instanceof(Array);
	});

	it('updateRestaurantReplySubscriber', async () => {
		const result: any = await restaurantReplySubscriber.updateRestaurantReplySubscriber(1, restaurantReplyIndex, {
			isGood: 0
		});
		expect(result).to.instanceof(Object);
	});

	it('deleteRestaurantReplySubscriber', async () => {
		const result: any = await restaurantReplySubscriber.deleteRestaurantReplySubscriber(1, restaurantReplyIndex);
		expect(result).to.instanceof(Object);
	});
});
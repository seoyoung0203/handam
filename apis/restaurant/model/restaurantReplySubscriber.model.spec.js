"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const restaurant_model_1 = require("./restaurant.model");
const restaurantReply_model_1 = require("./restaurantReply.model");
const restaurantReplySubscriber_model_1 = require("./restaurantReplySubscriber.model");
describe('restauratReplySubscriber 모델', () => {
    let restaurantIndex;
    let restaurantReplyIndex;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield restaurant_model_1.restaurant.createRestaurant({
                restaurantCategoryIndex: 1,
                name: 'Hyo',
                address: '서울시',
                locationUrl: '0',
                tel: '000-000-000',
                openingHours: ' 11:30 - 15:00 , 17:00 - 22:00 (일 휴무)',
                review: '테스트 리뷰',
                goodCount: '0'
            });
            const resultRestaurant = yield restaurant_model_1.restaurant.getRestaurantByName('Hyo');
            restaurantIndex = resultRestaurant[0].restaurantIndex;
            yield restaurantReply_model_1.restaurantReply.createRestaurantReply({
                restaurantIndex,
                userIndex: 1,
                content: '테스트 게시글 댓글',
                status: 'ACTIVE'
            });
            const result = yield restaurantReply_model_1.restaurantReply.listRestaurantReply(restaurantIndex);
            restaurantReplyIndex = result[0].restaurantReplyIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield restaurant_model_1.restaurant.deleteRestaurant(restaurantIndex);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createRestaurantReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.createRestaurantReplySubscriber({
            userIndex: 1,
            restaurantReplyIndex: restaurantReplyIndex,
            isGood: 1
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getRestaurantReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.getRestaurantReplySubscriber(1, restaurantReplyIndex);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantReplySubscriberSumCount', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.getRestaurantReplySubscriberSumCount(restaurantReplyIndex);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurantReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.updateRestaurantReplySubscriber(1, restaurantReplyIndex, {
            isGood: 0
        });
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.deleteRestaurantReplySubscriber(1, restaurantReplyIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantReplySubscriber.model.spec.js.map
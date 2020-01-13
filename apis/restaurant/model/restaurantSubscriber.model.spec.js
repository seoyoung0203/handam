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
const restaurantSubscriber_model_1 = require("./restaurantSubscriber.model");
describe('restaurantSubscriber 모델', () => {
    let restaurantIndex;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield restaurant_model_1.restaurant.createRestaurant({
                restaurantCategoryIndex: 1,
                name: '테스트푸드',
                address: '성북구 삼선교로',
                locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
                tel: '02-760-1234',
                openingHours: '10:00 - 17:00',
                review: '괜츈'
            });
            const result = yield restaurant_model_1.restaurant.getRestaurantByName('테스트푸드');
            restaurantIndex = result[0].restaurantIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield restaurant_model_1.restaurant.deleteRestaurant(restaurantIndex);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createRestaurantSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantSubscriber_model_1.restaurantSubscriber.createRestaurantSubscriber({
            userIndex: 1,
            restaurantIndex: restaurantIndex,
            isGood: 1
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getRestaurantSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriber(1, restaurantIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantSubscriberSumCount', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriberSumCount(restaurantIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurantSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantSubscriber_model_1.restaurantSubscriber.updateRestaurantSubscriber(1, restaurantIndex, {
            isGood: 0
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantSubscriber_model_1.restaurantSubscriber.deleteRestaurantSubscriber(1, restaurantIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantSubscriber.model.spec.js.map
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
const restaurantTag_model_1 = require("./restaurantTag.model");
describe('restaurantTag 모델', () => {
    let restaurantIndex;
    let restaurantTagIndex;
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
            //console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield restaurant_model_1.restaurant.deleteRestaurant(restaurantIndex);
            //console.log(result);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    const tag = 'testTag';
    it('createRestaurantTag', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantTag_model_1.restaurantTag.createRestaurantTag({
            restaurantIndex: restaurantIndex,
            tag: tag
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getRestaurantTag', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantTag_model_1.restaurantTag.getRestaurantTag(restaurantIndex);
        //console.log(tag);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantTagByTag', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantTag_model_1.restaurantTag.getRestaurantTagByTag(tag);
        restaurantTagIndex = result[0].restaurantTagIndex;
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('deleteRestaurantTag', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantTag_model_1.restaurantTag.deleteRestaurantTag(restaurantTagIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantTag.model.spec.js.map
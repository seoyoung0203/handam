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
describe('restaurant 모델', () => __awaiter(void 0, void 0, void 0, function* () {
    let resultRestaurant;
    it('createRestaurant', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.createRestaurant({
            restaurantCategoryIndex: 1,
            name: '영웅분식',
            address: '서울시 성북구 삼선교로 10바길 38',
            locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
            tel: '02-760-2341',
            openingHours: '10:00 - 19:00',
            review: '음식이 전체적으로 좀 짜요.',
            goodCount: 0
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getRestaurantByName', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.getRestaurantByName('영웅분식');
        // console.log(result);
        resultRestaurant = result;
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listRestaurant', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.listRestaurant();
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListRestaurant', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.pageListRestaurant(`restaurantCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurant', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.updateRestaurant(resultRestaurant[0].restaurantIndex, {
            restaurantCategoryIndex: 1,
            name: '미스터돈가스',
            address: '서울시 성북구 삼선교로 10바길 38',
            locationUrl: 'https://goo.gl/maps/L3MtsMtV6r1',
            tel: '02-760-2341',
            openingHours: '10:00 - 19:00',
            review: '이젠 돈가스 팔아요',
            goodCount: 0
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurant', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurant_model_1.restaurant.deleteRestaurant(resultRestaurant[0].restaurantIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
}));
//# sourceMappingURL=restaurant.model.spec.js.map
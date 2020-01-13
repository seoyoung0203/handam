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
const restaurantMenu_model_1 = require("./restaurantMenu.model");
describe('restaurantMenu 모델', () => {
    let restaurantIndex;
    let restaurantMenuIndex;
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
            //console.log(result);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createRestaurantMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.createRestaurantMenu({
            restaurantIndex: restaurantIndex,
            name: '순대국',
            price: 6000,
            imageUrl: '://goo.gl/maps/L3MtsMtV6r1'
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listRestaurantMenus', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.listRestaurantMenus();
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listRestaurantMenusByRestaurantIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.listRestaurantMenusByRestaurantIndex(restaurantIndex);
        //console.log(result);
        restaurantMenuIndex = result[0].restaurantMenuIndex;
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.getRestaurantMenu(restaurantMenuIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantPriorityMenus', () => __awaiter(void 0, void 0, void 0, function* () {
        const testRestaurantIndex = 40;
        const result = yield restaurantMenu_model_1.restaurantMenu.getRestaurantPriorityMenus(testRestaurantIndex);
        console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurantMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.updateRestaurantMenu(restaurantMenuIndex, {
            restaurantIndex: restaurantIndex,
            name: '순대국',
            price: 7000,
            imageUrl: '://goo.gl/maps/L3MtsMtV6r1'
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantMenu_model_1.restaurantMenu.deleteRestaurantMenu(restaurantMenuIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantMenu.model.spec.js.map
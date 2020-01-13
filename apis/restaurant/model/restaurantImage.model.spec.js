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
const restaurantImage_model_1 = require("./restaurantImage.model");
describe('restaurantImage 모델', () => {
    let restaurantIndex;
    let restaurantImageIndex;
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
    it('createRestaurantImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const mainImage = 'https://main.png';
        const subImage = ['https://sub.png'];
        const result = yield restaurantImage_model_1.restaurantImage.createRestaurantImage({
            restaurantIndex: restaurantIndex,
            url: JSON.stringify({
                subImage,
                mainImage
            })
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listRestaurantImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantImage_model_1.restaurantImage.listRestaurantImage();
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listRestaurantImagesByRestaurantIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantImage_model_1.restaurantImage.listRestaurantImagesByRestaurantIndex(restaurantIndex);
        //console.log(result);
        restaurantImageIndex = result[0].restaurantImageIndex;
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantImage_model_1.restaurantImage.getRestaurantImage(restaurantImageIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurantImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const mainImage = 'https://mainup.png';
        const subImage = ['https://subup.png'];
        const result = yield restaurantImage_model_1.restaurantImage.updateRestaurantImage(restaurantImageIndex, {
            restaurantIndex: restaurantIndex,
            url: JSON.stringify({
                subImage,
                mainImage
            })
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantImage_model_1.restaurantImage.deleteRestaurantImage(restaurantImageIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantImage.model.spec.js.map
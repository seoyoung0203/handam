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
describe('restaurantReply 모델', () => {
    let restaurantIndex;
    let resultRestaurantReply;
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
            const result = yield restaurant_model_1.restaurant.getRestaurantByName('Hyo');
            restaurantIndex = result[0].restaurantIndex;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield restaurant_model_1.restaurant.deleteRestaurant(restaurantIndex);
            // console.log(result);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        resultRestaurantReply = {
            restaurantIndex,
            userIndex: 1,
            title: '테스트 댓글 제목',
            content: '테스트 게시글 댓글',
            status: 'ACTIVE'
        };
        const result = yield restaurantReply_model_1.restaurantReply.createRestaurantReply(resultRestaurantReply);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReply_model_1.restaurantReply.listRestaurantReply(restaurantIndex);
        restaurantReplyIndex = result[0].restaurantReplyIndex;
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReply_model_1.restaurantReply.pageListRestaurantReply(restaurantIndex, 0, 5);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReply_model_1.restaurantReply.getRestaurantReply(restaurantReplyIndex);
        // console.log(result[0]);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReply_model_1.restaurantReply.updateRestaurantReply(restaurantReplyIndex, {
            title: '업데이트 테스트 게시글 제목',
            content: '업데이트 테스트 게시글 댓글 내용'
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReply_model_1.restaurantReply.deleteRestaurantReply(restaurantReplyIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantReply.model.spec.js.map
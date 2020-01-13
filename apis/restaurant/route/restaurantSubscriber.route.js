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
const express = require("express");
const auth_util_1 = require("../../../packages/utils/auth.util");
const restaurant_model_1 = require("../model/restaurant.model");
const restaurantSubscriber_model_1 = require("../model/restaurantSubscriber.model");
class RestaurantSubscriberRoutes {
    constructor() {
        this.restaurantSubscriberRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantSubscriberRouter.put('/restaurantSubscriber/restaurantIndex/:restaurantIndex', putRestaurantSubscriber);
        ;
    }
}
exports.RestaurantSubscriberRoutes = RestaurantSubscriberRoutes;
/**
 * route: restaurantSubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function putRestaurantSubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantIndex } = req.params;
            const { tokenIndex } = auth_util_1.auth(req);
            let result = yield restaurantSubscriber_model_1.restaurantSubscriber.updateRestaurantSubscriber(tokenIndex, restaurantIndex, req.body);
            if (result.changedRows == 0) {
                result = yield restaurantSubscriber_model_1.restaurantSubscriber.createRestaurantSubscriber({
                    userIndex: tokenIndex,
                    restaurantIndex: restaurantIndex,
                    isGood: 1
                });
            }
            else {
                result = yield restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriber(tokenIndex, restaurantIndex);
                result = result[0];
                if (result.isGood == 0) {
                    yield restaurantSubscriber_model_1.restaurantSubscriber.deleteRestaurantSubscriber(tokenIndex, restaurantIndex);
                }
            }
            const sumResult = yield restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriberSumCount(restaurantIndex);
            yield restaurant_model_1.restaurant.updateRestaurant(restaurantIndex, sumResult[0]);
            delete result.userIndex;
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'putRestaurantSubscriber: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'putRestaurantSubscriber : 50000'
                    });
                    break;
            }
        }
    });
}
exports.restaurantSubscriberRoutes = new RestaurantSubscriberRoutes();
//# sourceMappingURL=restaurantSubscriber.route.js.map
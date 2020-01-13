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
const restaurantReply_model_1 = require("../model/restaurantReply.model");
const restaurantReplySubscriber_model_1 = require("../model/restaurantReplySubscriber.model");
class RestaurantReplySubscriberRoutes {
    constructor() {
        this.restaurantReplySubscriberRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantReplySubscriberRouter.put('/restaurantReplySubscriber/restaurantReply/:restaurantReplyIndex', putRestaurantReplySubscriber);
    }
}
exports.RestaurantReplySubscriberRoutes = RestaurantReplySubscriberRoutes;
/**
 *route: restaurantReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function putRestaurantReplySubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { restaurantReplyIndex } = req.params;
            const { tokenIndex } = auth_util_1.auth(req);
            let result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.updateRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex, req.body);
            if (result.changedRows === 0) {
                result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.createRestaurantReplySubscriber({
                    userIndex: tokenIndex,
                    restaurantReplyIndex: restaurantReplyIndex,
                    isGood: 1
                });
            }
            else {
                result = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.getRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex);
                result = result[0];
                if (result.isGood === 0) {
                    yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.deleteRestaurantReplySubscriber(tokenIndex, restaurantReplyIndex);
                }
            }
            const sumResult = yield restaurantReplySubscriber_model_1.restaurantReplySubscriber.getRestaurantReplySubscriberSumCount(restaurantReplyIndex);
            yield restaurantReply_model_1.restaurantReply.updateRestaurantReply(restaurantReplyIndex, sumResult[0]);
            delete result.userIndex;
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'putRestaurantReplySubscriber: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'putRestaurantReplySubscriber: 50000'
                    });
                    break;
            }
        }
    });
}
exports.restaurantReplySubscriberRoutes = new RestaurantReplySubscriberRoutes();
//# sourceMappingURL=restaurantReplySubscriber.route.js.map
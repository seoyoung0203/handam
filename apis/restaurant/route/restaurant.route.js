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
const restaurant_resource_1 = require("../../../resources/restaurant.resource");
const restaurant_model_1 = require("../model/restaurant.model");
const restaurantImage_model_1 = require("../model/restaurantImage.model");
const restaurantMenu_model_1 = require("../model/restaurantMenu.model");
const restaurantSubscriber_model_1 = require("../model/restaurantSubscriber.model");
const restaurantTag_model_1 = require("../model/restaurantTag.model");
class RestaurantRoutes {
    constructor() {
        this.restaurantRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantRouter.post('/restaurant', createRestaurant);
        this.restaurantRouter.get('/restaurant', pageListRestaurant);
        this.restaurantRouter.get('/restaurant/restaurantIndex/:restaurantIndex', getRestaurant);
        this.restaurantRouter.put('/restaurant/restaurantIndex/:restaurantIndex', updateRestaurant);
        this.restaurantRouter.delete('/restaurant/restaurantIndex/:restaurantIndex', deleteRestaurant);
    }
}
exports.RestaurantRoutes = RestaurantRoutes;
/**
 * route: restaurant 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurantData = new restaurant_resource_1.RestaurantResource(req.body);
        try {
            const result = yield restaurant_model_1.restaurant.createRestaurant(restaurantData.getRestaurant());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createRestaurant: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createRestaurant: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurant 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = req.query.filter;
        let orderBy = req.query.orderBy;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const { tokenIndex } = auth_util_1.auth(req);
            const [resultCount, result] = yield Promise.all([
                restaurant_model_1.restaurant.listRestaurant(filter), restaurant_model_1.restaurant.pageListRestaurant(filter, orderBy, page, count)
            ]);
            for (const row of result) {
                const [resultRestaurantImage, resultPriorityMenus, resultRestaurantTag, resultRestaurantSubscriber] = yield Promise.all([
                    restaurantImage_model_1.restaurantImage.listRestaurantImagesByRestaurantIndex(row.restaurantIndex),
                    restaurantMenu_model_1.restaurantMenu.getRestaurantPriorityMenus(row.restaurantIndex),
                    restaurantTag_model_1.restaurantTag.getRestaurantTag(row.restaurantIndex),
                    restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriber(tokenIndex, row.restaurantIndex)
                ]);
                row.restaurantImage = JSON.parse(resultRestaurantImage[0].url).mainImage;
                row.restaurantPriorityMenus = resultPriorityMenus;
                row.restaurantTag = resultRestaurantTag;
                row.isGood = resultRestaurantSubscriber[0] ? resultRestaurantSubscriber[0].isGood : 0;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'listRestaurant: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurant: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurant 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        try {
            const { tokenIndex } = auth_util_1.auth(req);
            const result = yield restaurant_model_1.restaurant.getRestaurant(restaurantIndex);
            const [resultRestaurantMenu, resultRestaurantImage, resultRestaurantTag, resultRestaurantSubscriber] = yield Promise.all([
                restaurantMenu_model_1.restaurantMenu.listRestaurantMenusByRestaurantIndex(result[0].restaurantIndex),
                restaurantImage_model_1.restaurantImage.listRestaurantImagesByRestaurantIndex(result[0].restaurantIndex),
                restaurantTag_model_1.restaurantTag.getRestaurantTag(result[0].restaurantIndex),
                restaurantSubscriber_model_1.restaurantSubscriber.getRestaurantSubscriber(tokenIndex, restaurantIndex)
            ]);
            result[0].restaurantMenu = resultRestaurantMenu;
            result[0].resultRestaurantImage = JSON.parse(resultRestaurantImage[0].url);
            result[0].resultRestaurantTag = resultRestaurantTag;
            result[0].isGood = resultRestaurantSubscriber[0] ? resultRestaurantSubscriber[0].isGood : 0;
            const location = result[0].locationUrl.split(',');
            delete result[0].locationUrl;
            result[0].latitude = location[0];
            result[0].longitude = location[1];
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getRestaurant: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurant: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurant 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        const restaurantData = new restaurant_resource_1.RestaurantResource(req.body);
        try {
            const result = yield restaurant_model_1.restaurant.updateRestaurant(restaurantIndex, restaurantData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateRestaurant: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateRestaurant: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurant 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        try {
            const result = yield restaurant_model_1.restaurant.deleteRestaurant(restaurantIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteRestaurant: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurant: 50000'
                    });
            }
        }
    });
}
exports.restaurantRoutes = new RestaurantRoutes();
//# sourceMappingURL=restaurant.route.js.map
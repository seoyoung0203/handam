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
const restaurantTag_model_1 = require("../model/restaurantTag.model");
class RestaurantTagRoute {
    constructor() {
        this.restaurantTagRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantTagRouter.post('/restaurantTag', createRestaurantTag);
        this.restaurantTagRouter.get('/restaurantTag/restaurantIndex/:restaurantIndex', getRestaurantTag);
        this.restaurantTagRouter.get('/restaurantTag/tag/:tag', getRestaurantTagByTag);
        this.restaurantTagRouter.delete('/restaurantTag/restaurantTagIndex/:restaurantTagIndex', deleteRestaurantTag);
    }
}
exports.RestaurantTagRoute = RestaurantTagRoute;
/**
 * route: restaurantTag 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurantTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield restaurantTag_model_1.restaurantTag.createRestaurantTag(req.body);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createRestaurantTag: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createRestaurantTag: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantIndex에 따른 restaurantTag 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getRestaurantTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        try {
            const result = yield restaurantTag_model_1.restaurantTag.getRestaurantTag(restaurantIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantTag: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantTag: 50000'
                    });
            }
        }
    });
}
/**
 * route: tag에 따른 restaurantTag 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getRestaurantTagByTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tag } = req.params;
        try {
            const result = yield restaurantTag_model_1.restaurantTag.getRestaurantTagByTag(tag);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantTagByTag: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantTagByTag: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantTag 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurantTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantTagIndex } = req.params;
        try {
            const result = yield restaurantTag_model_1.restaurantTag.deleteRestaurantTag(restaurantTagIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteRestaurantTag: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurantTag: 50000'
                    });
            }
        }
    });
}
exports.restaurantTagRoutes = new RestaurantTagRoute();
//# sourceMappingURL=restaurantTag.route.js.map
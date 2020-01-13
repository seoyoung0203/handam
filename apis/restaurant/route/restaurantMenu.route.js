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
const restaurantMenu_resource_1 = require("../../../resources/restaurantMenu.resource");
const restaurantMenu_model_1 = require("../model/restaurantMenu.model");
class RestaurantMenuRoute {
    constructor() {
        this.restaurantMenuRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantMenuRouter.post('/restaurantMenu', createRestaurantMenu);
        this.restaurantMenuRouter.get('/restaurantMenu', listRestaurantMenus);
        this.restaurantMenuRouter.get('/restaurantMenu/restaurantIndex/:restaurantIndex', listRestaurantMenusByRestaurantIndex);
        this.restaurantMenuRouter.get('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', getRestaurantMenu);
        this.restaurantMenuRouter.put('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', updateRestaurantMenu);
        this.restaurantMenuRouter.delete('/restaurantMenu/restaurantMenuIndex/:restaurantMenuIndex', deleteRestaurantMenu);
    }
}
exports.RestaurantMenuRoute = RestaurantMenuRoute;
/**
 * route: restaurantMenu 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurantMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let restaurantMenuData = new restaurantMenu_resource_1.RestaurantMenuResource(req.body);
        try {
            const result = yield restaurantMenu_model_1.restaurantMenu.createRestaurantMenu(restaurantMenuData.getRestaurantMenu());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createRestaurantMenu: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createRestaurantMenu: 50000'
                    });
            }
        }
    });
}
/**
 * route: 모든 restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listRestaurantMenus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield restaurantMenu_model_1.restaurantMenu.listRestaurantMenus();
            res.send({
                success: true,
                statusCode: 200,
                result: results,
                message: 'listRestaurantMenus: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurantMenus: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantIndex 에 따른 restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listRestaurantMenusByRestaurantIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        try {
            const results = yield restaurantMenu_model_1.restaurantMenu.listRestaurantMenusByRestaurantIndex(restaurantIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: results,
                message: 'listRestaurantMenusByRestaurantIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurantMenusByRestaurantIndex: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantMenu 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getRestaurantMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantMenuIndex } = req.params;
        try {
            const result = yield restaurantMenu_model_1.restaurantMenu.getRestaurantMenu(restaurantMenuIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantMenu: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantMenu: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantMenu 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateRestaurantMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantMenuIndex } = req.params;
        const restaurantMenuData = new restaurantMenu_resource_1.RestaurantMenuResource(req.body);
        try {
            const result = yield restaurantMenu_model_1.restaurantMenu.updateRestaurantMenu(restaurantMenuIndex, restaurantMenuData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateRestaurantMenu: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateRestaurantMenu: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantMenu 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurantMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantMenuIndex } = req.params;
        try {
            const result = yield restaurantMenu_model_1.restaurantMenu.deleteRestaurantMenu(restaurantMenuIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteRestaurantMenu: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurantMenu: 50000'
                    });
            }
        }
    });
}
exports.restaurantMenuRoutes = new RestaurantMenuRoute();
//# sourceMappingURL=restaurantMenu.route.js.map
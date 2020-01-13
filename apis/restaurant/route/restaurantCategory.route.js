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
const restaurantCategory_model_1 = require("../model/restaurantCategory.model");
class RestaurantCategoryRoutes {
    constructor() {
        this.restaurantCategoryRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantCategoryRouter.get('/restaurantCategory', listRestaurantCategory);
    }
}
exports.RestaurantCategoryRoutes = RestaurantCategoryRoutes;
/**
 * route: restaurantCategory 리스트 조회
 * @param req
 * @param res
 */
function listRestaurantCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield restaurantCategory_model_1.restaurantCategory.listRestaurantCategory();
            res.send({
                success: true,
                statusCode: 200,
                resultCount: result.length,
                result: result,
                message: 'listRestaurantCategory: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurantCategory: 50000'
                    });
            }
        }
    });
}
exports.restaurantCategoryRoutes = new RestaurantCategoryRoutes();
//# sourceMappingURL=restaurantCategory.route.js.map
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
const fs = require("fs");
const s3_util_1 = require("../../../packages/utils/s3.util");
const restaurantImage_resource_1 = require("../../../resources/restaurantImage.resource");
const restaurantImage_model_1 = require("../model/restaurantImage.model");
class RestaurantImageRoute {
    constructor() {
        this.restaurantImageRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantImageRouter.post('/restaurantImage/:restaurantIndex', createRestaurantImage);
        this.restaurantImageRouter.get('/restaurantImage', listRestaurantImages);
        this.restaurantImageRouter.get('/restaurantImage/restaurantIndex/:restaurantIndex', listRestaurantImagesByRestaurantIndex);
        this.restaurantImageRouter.get('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', getRestaurantImage);
        this.restaurantImageRouter.put('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', updateRestaurantImage);
        this.restaurantImageRouter.delete('/restaurantImage/restaurantImageIndex/:restaurantImageIndex', deleteRestaurantImage);
    }
}
exports.RestaurantImageRoute = RestaurantImageRoute;
/**
 * route: restaurantImage 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurantImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        const upload = s3_util_1.s3Util.restaurantUpload('restaurant').fields([{
                name: 'main_image',
                maxCount: 1
            }, {
                name: 'sub_image',
                maxCount: 5
            }]);
        yield upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    throw 'upload error';
                }
                const file = './packages/utils/config/env.json';
                const { s3Url } = JSON.parse(fs.readFileSync(file, 'utf8'));
                let [mainImage] = req.files['main_image'];
                mainImage = `${s3Url}resized-restaurant/${mainImage.key}`;
                const subImage = req.files['sub_image'].map(file => `${s3Url}resized-restaurant/${file.key}`);
                const url = JSON.stringify({
                    subImage,
                    mainImage,
                });
                const result = yield restaurantImage_model_1.restaurantImage.createRestaurantImage({
                    restaurantIndex,
                    url
                });
                res.send({
                    success: true,
                    statusCode: 200,
                    result,
                    message: 'createRestaurant: 200'
                });
            }
            catch (err) {
                switch (err) {
                    case 'upload error':
                        res.send({
                            success: false,
                            statusCode: 500,
                            message: 'createRestaurantImage: 50001'
                        });
                        break;
                    default:
                        res.send({
                            success: false,
                            statusCode: 500,
                            message: 'createRestaurantImage: 50000'
                        });
                }
            }
        }));
    });
}
/**
 * route: 모든 restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listRestaurantImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield restaurantImage_model_1.restaurantImage.listRestaurantImage();
            res.send({
                success: true,
                statusCode: 200,
                result: results,
                message: 'listRestaurantImages: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurantImages: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantIndex 에 따른 restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listRestaurantImagesByRestaurantIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantIndex } = req.params;
        try {
            const result = yield restaurantImage_model_1.restaurantImage.listRestaurantImagesByRestaurantIndex(restaurantIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'listRestaurantImagesByRestaurantIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listRestaurantImagesByRestaurantIndex: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantImage 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getRestaurantImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantImageIndex } = req.params;
        try {
            const result = yield restaurantImage_model_1.restaurantImage.getRestaurantImage(restaurantImageIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantImage: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantImage: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantImage 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateRestaurantImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantImageIndex } = req.params;
        const restaurantImageData = new restaurantImage_resource_1.RestaurantImageResource(req.body);
        try {
            const result = yield restaurantImage_model_1.restaurantImage.updateRestaurantImage(restaurantImageIndex, restaurantImageData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateRestaurantImage: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateRestaurantImage: 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantImage 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurantImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantImageIndex } = req.params;
        try {
            const result = restaurantImage_model_1.restaurantImage.deleteRestaurantImage(restaurantImageIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteRestaurantImage: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurantImage: 50000'
                    });
            }
        }
    });
}
exports.restaurantImageRoutes = new RestaurantImageRoute();
//# sourceMappingURL=restaurantImage.route.js.map
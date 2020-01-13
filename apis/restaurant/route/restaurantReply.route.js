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
class restaurantReplyRouter {
    constructor() {
        this.restaurantReplyRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantReplyRouter.post('/restaurantReply/restaurantIndex/:restaurantIndex', createRestaurantReply);
        this.restaurantReplyRouter.get('/restaurantReply/restaurantIndex/:restaurantIndex', pageListRestaurantReply);
        this.restaurantReplyRouter.get('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', getRestaurantReply);
        this.restaurantReplyRouter.put('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', updateRestaurantReply);
        this.restaurantReplyRouter.delete('/restaurantReply/restaurantReplyIndex/:restaurantReplyIndex', deleteRestaurantReply);
    }
}
exports.restaurantReplyRouter = restaurantReplyRouter;
/**
 * route : restaurantReply 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurantReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurantIndex = req.params.restaurantIndex;
        try {
            const userData = auth_util_1.auth(req);
            const result = yield restaurantReply_model_1.restaurantReply.createRestaurantReply({
                restaurantIndex,
                userIndex: userData.tokenIndex,
                title: req.body.title,
                content: req.body.content,
                status: 'ACTIVE'
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createRestaurantReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createRestaurantReply: 50000',
                    });
                    break;
            }
        }
    });
}
/**
 * route : restaurantReply 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListRestaurantReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let restaurantIndex = req.params.restaurantIndex;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        try {
            const userData = auth_util_1.auth(req);
            const pResultCount = restaurantReply_model_1.restaurantReply.listRestaurantReply(restaurantIndex);
            const result = yield restaurantReply_model_1.restaurantReply.pageListRestaurantReply(restaurantIndex, page, count);
            const resultCount = yield pResultCount;
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListRestaurantReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListRestaurantReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: restaurantReply 조회
 * @param req
 * @param res
 */
function getRestaurantReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let restaurantReplyIndex = req.params.restaurantReplyIndex;
        try {
            const userData = auth_util_1.auth(req);
            const result = yield restaurantReply_model_1.restaurantReply.getRestaurantReply(restaurantReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getRestaurantReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'This restaurantReply does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getRestaurantReply: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : restaurantReply 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateRestaurantReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantReplyIndex } = req.params;
        const restaurantReplyData = req.body;
        try {
            const result = yield restaurantReply_model_1.restaurantReply.updateRestaurantReply(restaurantReplyIndex, restaurantReplyData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'updateRestaurantReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateRestaurantReply: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : postsReply 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurantReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurantReplyIndex = req.params.restaurantReplyIndex;
        try {
            const result = yield restaurantReply_model_1.restaurantReply.deleteRestaurantReply(restaurantReplyIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteRestaurantReply: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurantReply: 50000'
                    });
                    break;
            }
        }
    });
}
exports.restaurantReplyRoutes = new restaurantReplyRouter();
//# sourceMappingURL=restaurantReply.route.js.map
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const slack_1 = require("../../../packages/core/slack/slack");
const user_model_1 = require("../../user/model/user.model");
const restaurantReply_model_1 = require("../model/restaurantReply.model");
const restaurantReplyReport_model_1 = require("../model/restaurantReplyReport.model");
class RestaurantReplyReportRoute {
    constructor() {
        this.restaurantReplyReportRouter = express.Router();
        this.router();
    }
    router() {
        this.restaurantReplyReportRouter.post('/restaurantReplyReport', createRestaurantReplyReport);
        this.restaurantReplyReportRouter.get('/restaurantReplyReport', listRestaurantReplyReport);
        this.restaurantReplyReportRouter.get('/restaurantReplyReport/userId/:userId', getRestaurantReplyReportByUserId);
        this.restaurantReplyReportRouter.put('/restaurantReplyReport/restaurantReplyReportIndex/:restaurantReplyReportIndex', updateRestaurantReplyReport);
        this.restaurantReplyReportRouter.delete('/restaurantReplyReport', deleteRestaurantReplyReport);
    }
}
exports.RestaurantReplyReportRoute = RestaurantReplyReportRoute;
/**
 * route: restaurantReplyReport 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createRestaurantReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = req.body, { userId } = _a, restaurantReplyReportData = __rest(_a, ["userId"]);
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser[0];
            restaurantReplyReportData.userIndex = userIndex;
            const checkResult = yield restaurantReplyReport_model_1.restaurantReplyReport.checkRestaurantReplyReport(restaurantReplyReportData.restaurantReplyIndex, userIndex);
            if (checkResult.length > 0) {
                throw 'report duplicated';
            }
            yield restaurantReplyReport_model_1.restaurantReplyReport.createRestaurantReplyReport(restaurantReplyReportData);
            let countResult = yield restaurantReplyReport_model_1.restaurantReplyReport.getRestaurantReplyReport(restaurantReplyReportData.restaurantReplyIndex);
            const replyLimitCount = 5;
            const reportCount = countResult[0]['reportCount'];
            if (reportCount === replyLimitCount) {
                const color = '#0013FF';
                const field = {
                    'title': `Restaurant Reply Report 알림`,
                    'value': `restaurantReplyIndex=${restaurantReplyReportData.restaurantReplyIndex}, reportCount=${reportCount}\nContent:${restaurantReplyReportData.content}`,
                    'short': false
                };
                yield Promise.all([
                    restaurantReply_model_1.restaurantReply.updateRestaurantReplyStatus(restaurantReplyReportData.restaurantReplyIndex, 'INACTIVE'),
                    slack_1.slack.sendReportMessage('restaurantReplyReport', field, color)
                ]);
            }
            res.send({
                success: true,
                statusCode: 200,
                result: restaurantReplyReportData,
                message: 'createRestaurantReplyReport : 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'report duplicated':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'createRestaurantReplyReport: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createRestaurantReplyReport : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route : restaurantReplyReport 조회
 * @param req
 * @param res
 * @return {Promise<any>}
 */
function listRestaurantReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield restaurantReplyReport_model_1.restaurantReplyReport.listRestaurantReplyReport();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantReplyResult: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantReplyReport : 50000'
                    });
            }
        }
    });
}
/**
 * route: UserId에 따른 restaurantReply 조회
 * @param req
 * @param res
 * @returns {Promise<anny>}
 */
function getRestaurantReplyReportByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const [resultUser] = yield user_model_1.user.getUser(userId);
        const { userIndex } = resultUser;
        try {
            const result = yield restaurantReplyReport_model_1.restaurantReplyReport.getRestaurantReplyReportByUserIndex(userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getRestaurantReplyReportByUserId : 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getRestaurantReplyReport : 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantReplyReport 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateRestaurantReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantReplyReportIndex } = req.params;
        const { userId } = req.body;
        try {
            const [resultUser] = yield user_model_1.user.getUser(userId);
            const { userIndex } = resultUser;
            delete req.body.userId;
            req.body.userIndex = userIndex;
            const restaurantReplyReportData = {
                userIndex: req.body.userIndex,
                restaurantReplyIndex: req.body.restaurantReplyIndex,
                content: req.body.content,
            };
            const result = yield restaurantReplyReport_model_1.restaurantReplyReport.updateRestaurantReplyReport(restaurantReplyReportIndex, restaurantReplyReportData);
            res.send({
                success: true,
                status: 200,
                result: result,
                message: 'updateRestaurantReplyReport: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateRestaurantReplyReport : 50000'
                    });
            }
        }
    });
}
/**
 * route: restaurantReplyReport 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteRestaurantReplyReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { restaurantReplyIndex, userId } = req.body;
        const [resultUser] = yield user_model_1.user.getUser(userId);
        const { userIndex } = resultUser;
        try {
            const result = yield restaurantReplyReport_model_1.restaurantReplyReport.deleteRestaurantReplyReport(restaurantReplyIndex, userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateRestaurantReplyReport : 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteRestaurantReplyReport : 50000'
                    });
            }
        }
    });
}
exports.restaurantReplyReportRoutes = new RestaurantReplyReportRoute();
//# sourceMappingURL=restaurantReplyReport.route.js.map
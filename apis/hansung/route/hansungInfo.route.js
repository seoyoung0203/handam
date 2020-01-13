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
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const sqs_util_1 = require("../../../packages/utils/sqs.util");
const user_model_1 = require("../../user/model/user.model");
const hansungInfo_model_1 = require("../model/hansungInfo.model");
class HansungInfoRoutes {
    constructor() {
        this.hansungInfoRouter = express.Router();
        this.router();
    }
    router() {
        this.hansungInfoRouter.post('/hansungInfo', createHansungInfo);
        this.hansungInfoRouter.post('/hansungInfo/schedule', createHansungInfoSchedule);
        this.hansungInfoRouter.post('/hansungInfo/grades', createHansungInfoGrades);
        this.hansungInfoRouter.post('/hansungInfo/nonSubjectPoint', createHansungInfoNonSubjectPoint);
        this.hansungInfoRouter.get('/hansungInfo', getHansungInfo);
        this.hansungInfoRouter.get('/hansungInfo/grades', getHansungInfoGrades);
        this.hansungInfoRouter.delete('/hansungInfo', deleteHansungInfo);
    }
}
exports.HansungInfoRoutes = HansungInfoRoutes;
/**
 * route: hansungInfo 생성
 * @param req
 * @param res
 */
function createHansungInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            let hansungInfoPw = req.body.hansungInfoPw;
            hansungInfoPw = encryption_util_1.encryptHansungInfoPw.encryptHansungInfoPw(hansungInfoPw);
            hansungInfoPw = hansungInfoPw.toString();
            const result = yield hansungInfo_model_1.hansungInfo.createHansungInfo({
                userIndex: userData.tokenIndex,
                hansungInfoId: req.body.hansungInfoId,
                hansungInfoPw: hansungInfoPw,
                accessCount: 0,
                schedule: {},
                summaryGrades: {},
                detailGrades: [],
                nonSubjectPoint: {}
            });
            if (result !== null) {
                let params = sqs_util_1.sqsUtil.sendParams;
                sqs_util_1.sqsUtil.sendParams.MessageBody = `hansungInfo:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
                yield sqs_util_1.sqsUtil.sendMessage(params);
                delete result.hansungInfoPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createHansungInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'createHansungInfo : 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createHansungInfo : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo schedule 생성
 * @param req
 * @param res
 */
function createHansungInfoSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            let result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            if (result === null) {
                res.send({
                    success: false,
                    statusCode: 404,
                    message: 'createHansungInfoSchedule : 40401'
                });
            }
            if (result && result.status === 'SUCCESS') {
                yield hansungInfo_model_1.hansungInfo.updateHansungInfo(result.userIndex, {
                    schedule: {}
                });
                let params = sqs_util_1.sqsUtil.sendParams;
                sqs_util_1.sqsUtil.sendParams.MessageBody = `hansungInfoSchedule:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
                yield sqs_util_1.sqsUtil.sendMessage(params);
                delete result.hansungInfoPw;
            }
            result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createHansungInfoSchedule: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'createHansungInfoSchedule : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createHansungInfoSchedule : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo grades 생성
 * @param req
 * @param res
 */
function createHansungInfoGrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            let result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            if (result === null) {
                res.send({
                    success: false,
                    statusCode: 404,
                    message: 'createHansungInfoGrades : 40401'
                });
            }
            if (result && result.status === 'SUCCESS') {
                yield hansungInfo_model_1.hansungInfo.updateHansungInfo(result.userIndex, {
                    summaryGrades: {},
                    detailGrades: []
                });
                let params = sqs_util_1.sqsUtil.sendParams;
                sqs_util_1.sqsUtil.sendParams.MessageBody = `hansungInfoGrades:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
                yield sqs_util_1.sqsUtil.sendMessage(params);
                delete result.hansungInfoPw;
            }
            result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createHansungInfoGrades: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'createHansungInfoGrades : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createHansungInfoGrades : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo nonSubjectPoint 생성
 * @param req
 * @param res
 */
function createHansungInfoNonSubjectPoint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            let result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            if (result === null) {
                res.send({
                    success: false,
                    statusCode: 404,
                    message: 'createHansungInfoNonSubjectPoint : 40401'
                });
            }
            if (result && result.status === 'SUCCESS') {
                yield hansungInfo_model_1.hansungInfo.updateHansungInfo(result.userIndex, {
                    nonSubjectPoint: {}
                });
                let params = sqs_util_1.sqsUtil.sendParams;
                sqs_util_1.sqsUtil.sendParams.MessageBody = `hansungInfoNonSubjectPoint:${result.userIndex}:${result.hansungInfoId}:${result.hansungInfoPw}`;
                yield sqs_util_1.sqsUtil.sendMessage(params);
                delete result.hansungInfoPw;
            }
            result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createHansungInfoNonSubjectPoint: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'createHansungInfoNonSubjectPoint : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createHansungInfoNonSubjectPoint : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo 조회
 * @param req
 * @param res
 */
function getHansungInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            const result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            if (result !== null) {
                delete result.hansungInfoPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getHansungInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getHansungInfo : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getHansungInfo : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo grades 조회
 * @param req
 * @param res
 */
function getHansungInfoGrades(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            const result = yield hansungInfo_model_1.hansungInfo.getHansungInfo(userData.tokenIndex);
            if (result !== null) {
                delete result.hansungInfoPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result.grades || null,
                message: 'getHansungInfoGrades: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getHansungInfoGrades : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getHansungInfoGrades : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: hansungInfo 삭제
 * @param req
 * @param res
 */
function deleteHansungInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            const result = yield hansungInfo_model_1.hansungInfo.deleteHansungInfo(userData.tokenIndex);
            yield user_model_1.user.updateUserByUserIndex(userData.tokenIndex, {
                isValidation: 0
            });
            if (result !== null) {
                delete result.hansungInfoPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteHansungInfo: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'deleteHansungInfo : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteHansungInfo : 50000'
                    });
                    break;
            }
        }
    });
}
exports.hansungInfoRoutes = new HansungInfoRoutes();
//# sourceMappingURL=hansungInfo.route.js.map
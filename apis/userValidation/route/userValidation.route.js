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
const randomInt_util_1 = require("../../../packages/utils/randomInt.util");
const uuid_util_1 = require("../../../packages/utils/uuid.util");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("../model/userValidation.model");
class UserValidationRoutes {
    constructor() {
        this.userValidationRouter = express.Router();
        this.router();
    }
    router() {
        this.userValidationRouter.get('/userValidation/userId/:userId', checkUserId);
        this.userValidationRouter.get('/userValidation/userNickName/:userNickName', checkUserNickName);
        this.userValidationRouter.post('/userValidation/userId/:userId/userPw', checkUserPw);
        this.userValidationRouter.get('/userValidation/blockUserNickName/:blockUserNickName', getBlockUserNickName);
        this.userValidationRouter.get('/userValidation/sendPasswordMail/:userId', sendPasswordMail);
        this.userValidationRouter.post('/userValidation/sendValidationMail', sendValidationMail);
        this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
    }
}
exports.UserValidationRoutes = UserValidationRoutes;
/**
 * route: 아이디 중복 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            yield userValidation_model_1.userValidation.checkUserId(userId);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserId: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Id already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkUserId: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserId: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 닉네임 중복 체크
 * @param req
 * @param res
 */
function checkUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userNickName = req.params.userNickName;
        try {
            yield userValidation_model_1.userValidation.checkUserNickName(userNickName);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserNickName: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'NickName already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkUserNickName: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserNickName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 비밀번호 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
function checkUserPw(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const userPw = req.body.userPw;
        try {
            yield userValidation_model_1.userValidation.checkUserPw(userId, userPw);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserPw: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The ID does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'checkUserPw: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserPw: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: blockUserNickName 조회
 * @param req
 * @param res
 */
function getBlockUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userNickName = req.params.blockUserNickName;
        try {
            yield userValidation_model_1.userValidation.getBlockUserNickName(userNickName);
            res.send({
                success: true,
                statusCode: 200,
                message: 'getBlockUserNicName: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The NickName is not allowed':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'getBlockUserNicName: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getBlockUserNicName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 새로운 비밀번호 이메일 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function sendPasswordMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newPassword = String(randomInt_util_1.getRandomInt());
            let userId = req.params.userId;
            let html = `${userId} 님 안녕하세요.<br><br> 임시비밀번호는 ${newPassword} 입니다.<br><br>`;
            let mailOptions = {
                to: userId,
                subject: '한담 비밀번호 재발급 메일',
                html: html
            };
            /** 비밀번호 재발급 메일 발송 */
            yield userValidation_model_1.userValidation.sendPasswordMail(mailOptions).catch(err => {
                throw err;
            });
            /** 비밀번호 업데이트 */
            yield user_model_1.user.updateUserPassword(userId, newPassword);
            res.send({
                success: true,
                statusCode: 200,
                message: 'sendPasswordMail'
            });
        }
        catch (err) {
            switch (err) {
                case 'sendPasswordMail error':
                    res.send({
                        success: false,
                        statusCode: 40001,
                        message: 'sendPasswordMail: 40001'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'sendPasswordMail: 50000'
                    });
            }
        }
    });
}
/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function sendValidationMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let host = req.get('host');
            let uuid = uuid_util_1.uuidV1();
            let userId = req.body.userId.toLowerCase();
            let link = 'http://' + host + '/userValidation/verify/' + uuid;
            let email = req.body.email;
            yield userValidation_model_1.userValidation.setUuid(userId, uuid);
            let html = userId + '님 안녕하세요.<br><br> 한담을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
            html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
            html = html + '<a href=' + link + '>' + link + '</a>';
            let mailOptions = {
                to: email,
                subject: '한담 한성인 인증 메일',
                html: html
            };
            yield userValidation_model_1.userValidation.sendValidationMail(mailOptions);
            res.send({
                success: true,
                statusCode: 200,
                message: 'sendValidationMail: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'setUuid query error':
                    res.send({
                        success: false,
                        statusCode: 400,
                        message: 'setUuid: 40001'
                    });
                    break;
                case 'sendValidationMail error':
                    res.send({
                        success: false,
                        statusCode: 400,
                        message: 'sendValidationMail: 40002'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'sendValidationMail: 50000'
                    });
            }
        }
    });
}
/**
 * route: 인증코드 검증
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function verifyValidation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let verifiedUuid = req.params.uuid;
            yield userValidation_model_1.userValidation.verifyValidation(verifiedUuid);
            res.send({
                success: true,
                statusCode: 200,
                message: 'verifyValidation:200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Unvalidated code Error!':
                    res.send({
                        success: false,
                        statusCode: 403,
                        message: 'verifyValidation:40301'
                    });
                    break;
                case 'Validation date expired.':
                    res.send({
                        success: false,
                        statusCode: 403,
                        message: 'verifyValidation:40302'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'verifyValidation:500'
                    });
                    break;
            }
        }
    });
}
exports.userValidationRoutes = new UserValidationRoutes();
//# sourceMappingURL=userValidation.route.js.map
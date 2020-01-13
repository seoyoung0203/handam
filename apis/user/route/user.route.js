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
const aws = require("aws-sdk");
const express = require("express");
const s3_util_1 = require("../../../packages/utils/s3.util");
const uuid_util_1 = require("../../../packages/utils/uuid.util");
const user_resource_1 = require("../../../resources/user.resource");
const user_model_1 = require("../model/user.model");
let s3 = new aws.S3();
let avatar = s3_util_1.s3Util.upload('avatar').single('avatar');
class UserRoutes {
    constructor() {
        this.userRouter = express.Router();
        this.router();
    }
    router() {
        this.userRouter.post('/user', createUser);
        this.userRouter.post('/user/userId/:userId/uploadAvatar', uploadAvatar);
        this.userRouter.get('/user', pageListUser);
        this.userRouter.get('/user/userId/:userId', getUser);
        this.userRouter.get('/user/userId/:userId/signIn', getUserForSignIn);
        this.userRouter.put('/user/userId/:userId', updateUser);
        this.userRouter.put('/user/userId/:userId/nickName', updateUserNickName);
        this.userRouter.put('/user/userId/:userId/password', updateUserPassword);
        this.userRouter.delete('/user/userId/:userId', deleteUser);
        this.userRouter.delete('/user/userId/:userId/deleteAvatar', deleteAvatar);
    }
}
exports.UserRoutes = UserRoutes;
/**
 * route: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = new user_resource_1.UserResource(req.body);
        try {
            const result = yield user_model_1.user.createUser(userData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
            const result = yield user_model_1.user.pageListUser(page, count);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'pageListUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user userId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.getUser(userId);
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user userId 조회 및 appId 업데이트
 * @param req
 * @param res
 */
function getUserForSignIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let appId = req.query.appId !== undefined ? req.query.appId.toString() : null;
        try {
            const result = yield user_model_1.user.getUser(userId);
            /** userLog */
            yield user_model_1.user.createUserLog({
                userId: userId,
                log: 'signIn'
            });
            /** userAppId 업데이트 */
            yield user_model_1.user.updateUser(userId, {
                appId: appId || null
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getUserForSignIn: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getUserForSignIn: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.updateUser(userId, req.body);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 비밀번호 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let userPw = req.body.userPw;
        let userNewPw = req.body.userNewPw;
        try {
            yield user_model_1.user.getUserPassword(userId, userPw);
            const result = yield user_model_1.user.updateUserPassword(userId, userNewPw);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateUserPassword: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The password is incorrect':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'updateUserPassword: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateUserPassword: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 닉네임 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const userNickname = req.body.userNickName;
        try {
            const resultCheck = yield user_model_1.user.checkUserNickNameForUpdate(userNickname);
            /** 닉네임 중복 검증 */
            if (resultCheck.length > 0 && resultCheck[0].userNickName === userNickname) {
                throw 'NickName already exists';
            }
            const result = yield user_model_1.user.updateUserNickName(userId, userNickname);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateUserNickName: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'NickName already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'updateUserNickName: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateUserNickName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.updateUser(userId, {
                userId: uuid_util_1.uuidV1(),
                userNickName: '탈퇴한 회원',
                status: 'INACTIVE',
                appId: null
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user avatar 업로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function uploadAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        avatar(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
                        res.send({
                            success: false,
                            statusCode: 403,
                            message: 'uploadAvatar: 40301'
                        });
                    }
                    if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
                        res.send({
                            success: false,
                            statusCode: 403,
                            message: 'uploadAvatar: 40302'
                        });
                    }
                }
                try {
                    let result = req.file;
                    /** 아바타 등록 */
                    yield user_model_1.user.updateUser(userId, {
                        avatar: result.location
                    });
                    res.send({
                        success: true,
                        statusCode: 200,
                        result: result.location,
                        message: 'uploadAvatar: 200'
                    });
                }
                catch (err) {
                    switch (err) {
                        default:
                            res.send({
                                success: false,
                                statusCode: 500,
                                message: 'uploadAvatar: 50000'
                            });
                            break;
                    }
                }
            });
        });
    });
}
function deleteAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            if (resultUser[0].avatar) {
                let splitAvatar = resultUser[0].avatar.split('/');
                let splitAvatarStage = splitAvatar[2].split('.');
                yield s3.deleteObject({
                    Bucket: `${splitAvatarStage[0]}/${splitAvatar[3]}`,
                    Key: `${splitAvatar[4]}`
                }, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                const result = yield user_model_1.user.updateUser(userId, {
                    avatar: null
                });
                res.send({
                    success: true,
                    statusCode: 200,
                    result: result,
                    message: 'deleteAvatar: 200'
                });
            }
            else {
                res.send({
                    success: true,
                    statusCode: 404,
                    message: 'deleteAvatar: 40401'
                });
            }
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteAvatar: 50000'
                    });
                    break;
            }
        }
    });
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.route.js.map
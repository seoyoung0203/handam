"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_util_1 = require("../../../packages/utils/auth.util");
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const sqs_util_1 = require("../../../packages/utils/sqs.util");
const user_model_1 = require("../../user/model/user.model");
const credential_model_1 = require("../model/credential.model");
class CredentialRoutes {
    constructor() {
        this.credentialRouter = express.Router();
        this.router();
    }
    router() {
        this.credentialRouter.post('/credential', createCredential);
        this.credentialRouter.get('/credential', getCredential);
        this.credentialRouter.delete('/credential', deleteCredential);
    }
}
exports.CredentialRoutes = CredentialRoutes;
/**
 * route: credential 생성
 * @param req
 * @param res
 */
function createCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            let hansungInfoPw = req.body.hansungInfoPw;
            hansungInfoPw = encryption_util_1.encryptHansungInfoPw.encryptHansungInfoPw(hansungInfoPw);
            hansungInfoPw = hansungInfoPw.toString();
            const result = yield credential_model_1.credential.createCredential({
                userIndex: userData.tokenIndex,
                hansungInfoId: req.body.hansungInfoId
            });
            if (result !== null) {
                let params = sqs_util_1.sqsUtil.sendParams;
                sqs_util_1.sqsUtil.sendParams.MessageBody = `credential:${result.userIndex}:${result.hansungInfoId}:${hansungInfoPw}`;
                yield sqs_util_1.sqsUtil.sendMessage(params);
                delete result.hansungInfoPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createCredential: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'createCredential : 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createCredential : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: credential 조회
 * @param req
 * @param res
 */
function getCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            const result = yield credential_model_1.credential.getCredential(userData.tokenIndex);
            if (result !== null) {
                delete result.credentialPw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getCredential: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getCredential : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getCredential : 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: credential 삭제
 * @param req
 * @param res
 */
function deleteCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userData = auth_util_1.auth(req);
            const result = yield credential_model_1.credential.deleteCredential(userData.tokenIndex);
            yield user_model_1.user.updateUserByUserIndex(userData.tokenIndex, {
                isValidation: 0
            });
            if (result !== null) {
                delete result.credential.Pw;
            }
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteCredential: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'DynamoDB item does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'deleteCredential : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteCredential : 50000'
                    });
                    break;
            }
        }
    });
}
exports.credentialRoutes = new CredentialRoutes();
//# sourceMappingURL=credential.route.js.map
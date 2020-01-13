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
const user_model_1 = require("../../user/model/user.model");
const signIn_model_1 = require("../model/signIn.model");
class SignInRoutes {
    constructor() {
        this.signInRouter = express.Router();
        this.router();
    }
    router() {
        this.signInRouter.post('/signIn', getUser);
    }
}
exports.SignInRoutes = SignInRoutes;
/**
 * route: 로그인
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield signIn_model_1.signIn.getUser(req.body);
            /** appId 추가 */
            yield user_model_1.user.updateUser(req.body.userId, {
                appId: req.body.appId || null
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The ID does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getUser: 40401'
                    });
                    break;
                case 'The password is incorrect':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getUser: 40402'
                    });
                    break;
                case 'The jwt is incorrect':
                    res.send({
                        success: false,
                        statusCode: 403,
                        message: 'getUser: 40301'
                    });
                    break;
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
exports.signInRoutes = new SignInRoutes();
//# sourceMappingURL=signIn.route.js.map
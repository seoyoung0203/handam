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
const user_resource_1 = require("../../../resources/user.resource");
const userValidation_model_1 = require("../../userValidation/model/userValidation.model");
const signUp_model_1 = require("../model/signUp.model");
class SignUpRoutes {
    constructor() {
        this.signUpRouter = express.Router();
        this.router();
    }
    router() {
        this.signUpRouter.post('/signUp', createUser);
    }
}
exports.SignUpRoutes = SignUpRoutes;
/**
 * route: 회원가입
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.body.userId = req.body.userId.toLowerCase();
        req.body.status = 'ACTIVE';
        req.body.isValidation = false;
        req.body.isPostsAlarm = req.body.isPostsAlarm === undefined ? true : req.body.isPostsAlarm;
        req.body.isNonSubjectPointAlarm = req.body.isNonSubjectPointAlarm === undefined ? true : req.body.isNonSubjectPointAlarm;
        let userResource = new user_resource_1.UserResource(req.body);
        try {
            const result = yield signUp_model_1.signUp.createUser(userResource.getSignUp());
            yield userValidation_model_1.userValidation.createUserValidation({
                userId: req.body.userId
            });
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
exports.signUpRoutes = new SignUpRoutes();
//# sourceMappingURL=signUp.route.js.map
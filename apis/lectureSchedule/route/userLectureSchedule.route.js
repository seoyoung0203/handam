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
const userLectureSchedule_model_1 = require("../model/userLectureSchedule.model");
const auth_util_1 = require("../../../packages/utils/auth.util");
class UserLectureScheduleRoute {
    constructor() {
        this.userLectureScheduleRouter = express.Router();
        this.router();
    }
    router() {
        this.userLectureScheduleRouter.post('userLectureSchedule/lectureScheduleIndex/:lectureScheduleIndex', createUserLectureSchedule);
        this.userLectureScheduleRouter.get('userLectureSchedule/getUserLectureSchedule', getUserLectureSchedule);
        this.userLectureScheduleRouter.put('userLectureSchedule/userLectureSchedule/:userLectureScheduleIndex', updateUserLectureSchedule);
        this.userLectureScheduleRouter.delete('/userLectureSchedule/userLectureScheduleIndex/:userLectureScheduleIndex', deleteUserLectureSchedule);
    }
}
exports.UserLectureScheduleRoute = UserLectureScheduleRoute;
/**
 * route: UserLectureSchedule 생성
 * @param req
 * @param res
 */
function createUserLectureSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokenIndex: userIndex } = auth_util_1.auth(req);
            const { lectureScheduleIndex } = req.params;
            const userLectureScheduleData = Object.assign(Object.assign({}, req.body), { userIndex,
                lectureScheduleIndex });
            const result = userLectureSchedule_model_1.userLectureSchedule.createUserLectureSchedule(userLectureScheduleData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'createUserLectureSchedule: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createUserLectureSchedule: 500'
                    });
            }
        }
    });
}
function getUserLectureSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokenIndex: userIndex } = auth_util_1.auth(req);
            const result = userLectureSchedule_model_1.userLectureSchedule.getUserLectureSchedule(userIndex);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'getUserLectureSchedule: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getUserLectureSchedule: 500'
                    });
            }
        }
    });
}
function updateUserLectureSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { userLectureScheduleIndex } = req.params;
            let userLectureScheduleData = req.body;
            const result = userLectureSchedule_model_1.userLectureSchedule.updateUserLectureSchedule(userLectureScheduleIndex, userLectureScheduleData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'updateUserLectureSchedule: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateUserLectureSchedule: 500'
                    });
            }
        }
    });
}
function deleteUserLectureSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { userLectureScheduleIndex } = req.params;
            const result = userLectureSchedule_model_1.userLectureSchedule.deleteUserLectureSchedule(userLectureScheduleIndex);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'deleteUserLectureSchedule: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteUserLectureSchedule: 500'
                    });
            }
        }
    });
}
exports.userLectureScheduleRouter = new UserLectureScheduleRoute();
//# sourceMappingURL=userLectureSchedule.route.js.map
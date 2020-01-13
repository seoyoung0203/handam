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
const alarm_util_1 = require("../../../packages/utils/alarm.util");
const auth_util_1 = require("../../../packages/utils/auth.util");
const json_util_1 = require("../../../packages/utils/json.util");
const user_model_1 = require("../../user/model/user.model");
const alarm_model_1 = require("../model/alarm.model");
class AlarmRoutes {
    constructor() {
        this.alarmRouter = express.Router();
        this.router();
    }
    router() {
        this.alarmRouter.post('/alarm', pushAlarm);
        this.alarmRouter.get('/alarm', pageListAlarm);
        this.alarmRouter.get('/alarm/isRead', pageListAlarmByIsRead);
        this.alarmRouter.put('/alarm/alarmIndex/:alarmIndex', updateAlarm);
    }
}
exports.AlarmRoutes = AlarmRoutes;
/**
 * route: alarm 푸시
 * @param req
 * @param res
 */
function pushAlarm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIndex = auth_util_1.auth(req).tokenIndex;
            const content = req.body.content;
            const resultUser = yield user_model_1.user.getUserByUserIndex(userIndex);
            const pushableUserId = ['h6handam@gmail.com'];
            const appIds = [];
            /** 푸시 가능 여부 */
            if (pushableUserId.indexOf(resultUser[0].userId) > -1) {
                let resultUsers = yield user_model_1.user.listUserByExistAppId();
                /** 타겟 유저 */
                for (const row of resultUsers) {
                    if (row.appId && row.status === 'ACTIVE') {
                        appIds.push(row.appId);
                    }
                }
                /** 메세지 전송 */
                if (appIds.length > 0 && content !== undefined) {
                    yield alarm_util_1.alarmUtil.sendAlarm({
                        include_player_ids: appIds,
                        contents: {
                            en: 'alarm',
                            ko: `${content}`
                        }
                    });
                }
            }
            else {
                throw 'Access is limited';
            }
            res.send({
                success: true,
                statusCode: 200,
                message: 'pushAlarm: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Access is limited':
                    res.send({
                        success: false,
                        statusCode: 403,
                        message: 'pushAlarm: 40301'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pushAlarm: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: alarm 리스트 조회
 * @param req
 * @param res
 */
function pageListAlarm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userIndex = auth_util_1.auth(req).tokenIndex;
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
            const resultCount = yield alarm_model_1.alarm.listAlarm(userIndex);
            const result = yield alarm_model_1.alarm.pageListAlarm(userIndex, page, count);
            /** 읽지 않은 알림 갯수 */
            let notReadAlarmCount = 0;
            for (const row of resultCount) {
                if (row.readAt === 'null') {
                    notReadAlarmCount = notReadAlarmCount + 1;
                }
            }
            /** 읽지 않은 알림 갯수 결과 값에 추가 */
            result.notReadAlarmCount = notReadAlarmCount;
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListAlarm: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListAlarm: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: alarm isRead 리스트 조회
 * @param req
 * @param res
 */
function pageListAlarmByIsRead(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userIndex = auth_util_1.auth(req).tokenIndex;
            let isRead = parseInt(req.query.isRead);
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
            let resultCount = yield alarm_model_1.alarm.listAlarmByIsRead(userIndex, isRead);
            let result = yield alarm_model_1.alarm.pageListAlarmByIsRead(userIndex, isRead, page, count);
            /** 읽지 않은 알림 갯수 */
            const resultAlarm = yield alarm_model_1.alarm.listAlarm(userIndex);
            let notReadAlarmCount = 0;
            for (const row of resultAlarm) {
                if (row.readAt === null) {
                    notReadAlarmCount = notReadAlarmCount + 1;
                }
            }
            /** 읽지 않은 알림 갯수 결과 값에 추가 */
            result.notReadAlarmCount = notReadAlarmCount;
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListAlarmByIsRead: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListAlarmByIsRead: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: alarm 업데이트
 * @param req
 * @param res
 */
function updateAlarm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let alarmIndex = req.params.alarmIndex;
            let alarmData = json_util_1.jsonUtil.cleanObject(req.body);
            /** alarmData JSON 파싱 */
            if (alarmData.data) {
                alarmData.data = JSON.parse(alarmData.data);
            }
            const result = yield alarm_model_1.alarm.updateAlarm(alarmIndex, alarmData);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'updateAlarm: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateAlarm: 50000'
                    });
                    break;
            }
        }
    });
}
exports.alarmRoutes = new AlarmRoutes();
//# sourceMappingURL=alarm.route.js.map
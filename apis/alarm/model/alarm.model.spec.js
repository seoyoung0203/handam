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
const chai_1 = require("chai");
const alarm_model_1 = require("./alarm.model");
describe('alarm 모델', () => __awaiter(void 0, void 0, void 0, function* () {
    let resultAlarm;
    it('createAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.createAlarm({
            userIndex: 446,
            category: 'posts',
            data: JSON.stringify({
                postsIndex: 1,
                content: 'content'
            }),
            status: 'ACTIVE',
            isRead: 0,
            readAt: null
        });
        resultAlarm = result;
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.listAlarm(446);
        // console.log(result);
        resultAlarm = result[0];
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.pageListAlarm(446, 1, 1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listAlarmByIsRead', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.listAlarmByIsRead(resultAlarm.userIndex, 0);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.getAlarm(resultAlarm.alarmIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updateAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.updateAlarm(resultAlarm.alarmIndex, {
            isRead: 1,
            readAt: '2019-12-31'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteAlarm', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield alarm_model_1.alarm.deleteAlarm(resultAlarm.alarmIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
}));
//# sourceMappingURL=alarm.model.spec.js.map
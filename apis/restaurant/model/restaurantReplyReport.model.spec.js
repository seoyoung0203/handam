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
const restaurantReplyReport_model_1 = require("./restaurantReplyReport.model");
describe('restaurantReplyReport 모델', () => {
    let userIndex = 1;
    let restaurantReplyIndex = 1;
    let resultRestaurantReplyReportIndex;
    it('createRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = restaurantReplyReport_model_1.restaurantReplyReport.createRestaurantReplyReport({
            userIndex: userIndex,
            restaurantReplyIndex: restaurantReplyIndex,
            content: 'Test Report!'
        });
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('checkRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.checkRestaurantReplyReport(restaurantReplyIndex, userIndex);
        console.log('checkResReplyReport', result);
        resultRestaurantReplyReportIndex = result[0].restaurantReplyReportIndex;
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.getRestaurantReplyReport(restaurantReplyIndex);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.listRestaurantReplyReport();
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getRestaurantReplyReportByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.getRestaurantReplyReportByUserIndex(userIndex);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.updateRestaurantReplyReport(resultRestaurantReplyReportIndex, {
            userIndex: userIndex,
            restaurantReplyIndex: restaurantReplyIndex,
            content: 'Updated Test Report!'
        });
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteRestaurantReplyReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield restaurantReplyReport_model_1.restaurantReplyReport.deleteRestaurantReplyReport(restaurantReplyIndex, userIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=restaurantReplyReport.model.spec.js.map
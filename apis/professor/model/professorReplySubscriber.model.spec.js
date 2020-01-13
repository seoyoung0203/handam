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
const professorReplySubscriber_model_1 = require("./professorReplySubscriber.model");
describe('professorReplySubscriber 모델 ', () => {
    let professorReplyIndex = 53;
    let userIndex = 1;
    it('createProfessorReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.createProfessorReplySubscriber({
            professorReplyIndex: professorReplyIndex,
            userIndex: userIndex,
            isGood: 1
        });
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getProfessorReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriber(userIndex, professorReplyIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorReplySubscriberSumCount', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriberSumCount(professorReplyIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getProfessorReplySubscriberByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriberByUserIndex(professorReplyIndex, userIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updateProfessorReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.updateProfessorReplySubscriber(professorReplyIndex, userIndex, {
            isGood: 0
        });
        //console.log({result});
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteProfessorReplySubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield professorReplySubscriber_model_1.professorReplySubscriber.deleteProfessorReplySubscriber(userIndex, professorReplyIndex);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=professorReplySubscriber.model.spec.js.map
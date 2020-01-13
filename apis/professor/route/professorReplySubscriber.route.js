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
const auth_util_1 = require("../../../packages/utils/auth.util");
const professorReply_model_1 = require("../model/professorReply.model");
const professorReplySubscriber_model_1 = require("../model/professorReplySubscriber.model");
class ProfessorReplySubscriberRoutes {
    constructor() {
        this.professorReplySubscriberRouter = express.Router();
        this.router();
    }
    router() {
        this.professorReplySubscriberRouter.put('/professorReplySubscriber/professorReply/:professorReplyIndex', putProfessorReplySubscriber);
    }
}
exports.ProfessorReplySubscriberRoutes = ProfessorReplySubscriberRoutes;
/**
 * route: professorReplySubscriber 생성 및 업데이트
 * @param req
 * @param res
 * @return {Promise<void>}
 */
function putProfessorReplySubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { professorReplyIndex } = req.params;
            const { tokenIndex } = auth_util_1.auth(req);
            let result = yield professorReplySubscriber_model_1.professorReplySubscriber.updateProfessorReplySubscriber(professorReplyIndex, tokenIndex, req.body);
            if (result.changedRows === 0) {
                result = yield professorReplySubscriber_model_1.professorReplySubscriber.createProfessorReplySubscriber({
                    userIndex: tokenIndex,
                    professorReplyIndex: professorReplyIndex,
                    isGood: 1
                });
            }
            else {
                result = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriber(tokenIndex, professorReplyIndex);
                result = result[0];
                if (result.isGood === 0) {
                    yield professorReplySubscriber_model_1.professorReplySubscriber.deleteProfessorReplySubscriber(tokenIndex, professorReplyIndex);
                }
            }
            const sumResult = yield professorReplySubscriber_model_1.professorReplySubscriber.getProfessorReplySubscriberSumCount(professorReplyIndex);
            yield professorReply_model_1.professorReply.updateProfessorReply(professorReplyIndex, sumResult[0]);
            delete result.userIndex;
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'putProfessorReplySubscriber: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    console.log(err);
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'putProfessorReplySubscriber: 50000'
                    });
                    break;
            }
        }
    });
}
exports.professorReplySubscriberRoutes = new ProfessorReplySubscriberRoutes();
//# sourceMappingURL=professorReplySubscriber.route.js.map
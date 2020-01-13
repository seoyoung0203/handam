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
const nonSubjectPoint_model_1 = require("../model/nonSubjectPoint.model");
class NonSubjectPointRoutes {
    constructor() {
        this.nonSubjectPointRoute = express.Router();
        this.router();
    }
    router() {
        this.nonSubjectPointRoute.get('/nonSubjectPoint', listNonSubjectPoint);
    }
}
exports.NonSubjectPointRoutes = NonSubjectPointRoutes;
/**
 * route: nonSubjectPoint 조회
 * @param req
 * @param res
 */
function listNonSubjectPoint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield nonSubjectPoint_model_1.nonSubjectPoint.listNonSubjectPoint();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getNonSubjectPoint : 200'
            });
        }
        catch (err) {
            res.send({
                success: false,
                statusCode: 500,
                message: 'getNonSubjectPoint : 50000'
            });
        }
    });
}
exports.nonSubjectPointRoutes = new NonSubjectPointRoutes();
//# sourceMappingURL=nonSubjectPoint.route.js.map
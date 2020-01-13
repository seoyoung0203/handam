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
const terms_model_1 = require("../model/terms.model");
class TermsRoutes {
    constructor() {
        this.termsRouter = express.Router();
        this.router();
    }
    router() {
        this.termsRouter.get('/terms/:termsName', getTerms);
    }
}
exports.TermsRoutes = TermsRoutes;
/**
 * route: terms 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getTerms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let termsName = req.params.termsName;
        try {
            const result = yield terms_model_1.loadTermsHtml(termsName);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getTerms: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Terms does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getTerms: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getTerms: 50000'
                    });
                    break;
            }
        }
    });
}
exports.termsRoutes = new TermsRoutes();
//# sourceMappingURL=terms.route.js.map
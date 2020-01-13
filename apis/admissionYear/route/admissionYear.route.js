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
const admissionYear_model_1 = require("../model/admissionYear.model");
class AdmissionYearRoutes {
    constructor() {
        this.admissionYearRouter = express.Router();
        this.router();
    }
    router() {
        this.admissionYearRouter.get('/admissionYear', listAdmissionYear);
    }
}
exports.AdmissionYearRoutes = AdmissionYearRoutes;
/**
 * route: admissionYear 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listAdmissionYear(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield admissionYear_model_1.admissionYear.listAdmissionYear();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'listAdmissionYear: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listAdmissionYear: 50000'
                    });
                    break;
            }
        }
    });
}
exports.admissionRoutes = new AdmissionYearRoutes();
//# sourceMappingURL=admissionYear.route.js.map
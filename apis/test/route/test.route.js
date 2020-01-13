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
const express_1 = require("express");
const test_model_1 = require("../model/test.model");
class TestRoutes {
    constructor() {
        this.testRouter = express_1.Router();
        this.router();
    }
    router() {
        this.testRouter.post('/test', createTest);
        this.testRouter.get('/test', getTest);
        this.testRouter.put('/test/testIndex/:testIndex', updateTest);
        this.testRouter.delete('/test/testIndex/:testIndex', deleteTest);
    }
}
function createTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testData = req.body;
        try {
            const result = yield test_model_1.test.createTest(testData);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'createTest: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createTest: 50000'
                    });
            }
        }
    });
}
function getTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield test_model_1.test.getTest();
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'getTest: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getTest: 50000'
                    });
            }
        }
    });
}
function updateTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { testIndex } = req.params;
        const testData = req.body;
        try {
            const result = yield test_model_1.test.updateTest(testData, testIndex);
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'updateTest: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateTest: 50000'
                    });
            }
        }
    });
}
function deleteTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { testIndex } = req.params;
        try {
            const result = yield test_model_1.test.deleteTest(parseInt(testIndex));
            res.send({
                success: true,
                statusCode: 200,
                result,
                message: 'deleteTest: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteTest: 50000'
                    });
            }
        }
    });
}
exports.testRoutes = new TestRoutes();
//# sourceMappingURL=test.route.js.map
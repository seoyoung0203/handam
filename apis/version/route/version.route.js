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
const version_resource_1 = require("../../../resources/version.resource");
const version_model_1 = require("../model/version.model");
class VersionRoutes {
    constructor() {
        this.versionRouter = express.Router();
        this.router();
    }
    router() {
        this.versionRouter.post('/version', createVersion);
        this.versionRouter.get('/version', getVersion);
        this.versionRouter.delete('/version/versionIndex/:versionIndex', deleteVersion);
    }
}
exports.VersionRoutes = VersionRoutes;
/**
 * route: version 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createVersion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let versionData = new version_resource_1.VersionResource(req.body);
        try {
            const result = yield version_model_1.version.createVersion(versionData.getVersion());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createVersion: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createVersion: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: version 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getVersion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield version_model_1.version.getVersion();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'getVersion: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getVersion: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: version 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteVersion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let versionIndex = req.params.versionIndex;
        try {
            const result = yield version_model_1.version.deleteVersion(versionIndex);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteVersion: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteVersion: 50000'
                    });
                    break;
            }
        }
    });
}
exports.versionRoutes = new VersionRoutes();
//# sourceMappingURL=version.route.js.map
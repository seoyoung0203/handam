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
const track_resource_1 = require("../../../resources/track.resource");
const track_model_1 = require("../model/track.model");
class TrackRoutes {
    constructor() {
        this.trackRouter = express.Router();
        this.router();
    }
    router() {
        this.trackRouter.post('/track', createTrack);
        this.trackRouter.get('/track', listTrack);
        this.trackRouter.delete('/track/trackName/:trackName', deleteTrack);
    }
}
exports.TrackRoutes = TrackRoutes;
/**
 * route: track 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let trackData = new track_resource_1.TrackResource(req.body);
        try {
            const result = yield track_model_1.track.createTrack(trackData.getTrack());
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createTrack: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createTrack: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: track 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function listTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield track_model_1.track.listTrack();
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'pageListTrack: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListTrack: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: track 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let trackName = req.params.trackName;
        try {
            const result = yield track_model_1.track.deleteTrack(trackName);
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'deleteTrack: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteTrack: 50000'
                    });
                    break;
            }
        }
    });
}
exports.trackRoutes = new TrackRoutes();
//# sourceMappingURL=track.route.js.map
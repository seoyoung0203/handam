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
const s3_util_1 = require("../../../packages/utils/s3.util");
const notice_model_1 = require("../model/notice.model");
const upload = s3_util_1.s3Util.upload('notice').single('notice');
class NoticeRoutes {
    constructor() {
        this.noticeRouter = express.Router();
        this.router();
    }
    router() {
        this.noticeRouter.post('/notice', upload, createNotice);
        this.noticeRouter.get('/notice', listNotice);
        this.noticeRouter.get('/notice/img', listNoticeImg);
    }
}
exports.NoticeRoutes = NoticeRoutes;
const createNotice = (req, res) => {
    const { noticeUrl, noticeSubject } = req.body;
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
                res.send({
                    success: false,
                    statusCode: 403,
                    message: 'createNotice: 40301'
                });
            }
            if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
                res.send({
                    success: false,
                    statusCode: 403,
                    message: 'createNotice: 40302'
                });
            }
        }
        try {
            const file = req.file;
            const result = yield notice_model_1.notice.createNotice({
                noticeImg: file.location,
                info: JSON.stringify({
                    noticeUrl: noticeUrl,
                    noticeSubject: noticeSubject
                })
            });
            res.send({
                success: true,
                statusCode: 200,
                result: result,
                message: 'createNotice: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'createNotice: 50000'
                    });
                    break;
            }
        }
    }));
};
const listNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notice_model_1.notice.listNotice();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listNotice 200'
        });
    }
    catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'listNotice: 50000'
                });
        }
    }
});
const listNoticeImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notice_model_1.notice.listNoticeImg();
        res.send({
            success: true,
            statusCode: 200,
            result: result,
            message: 'listNoticeImg: 200'
        });
    }
    catch (err) {
        switch (err) {
            default:
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'listNoticeImg: 50000'
                });
                break;
        }
    }
});
exports.noticeRoutes = new NoticeRoutes();
//# sourceMappingURL=notice.route.js.map
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
/** Not Found */
function notFoundError(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         *  Error 이라는 정의가 있지만 Error 에는 status 라는 정의가 없어서 any 설정
         */
        const err = new Error('Not Found');
        err.status = 404;
        res.send({
            success: false,
            statusCode: 404,
            message: 'Not Found'
        });
        next(err);
    });
}
exports.notFoundError = notFoundError;
/** 에러 처리 */
function serverError(err, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        err.status = err.status || 500;
        console.error(`error on request ${req.method} | ${req.url} | ${err.status}`);
        console.error(err.stack || `${err.message}`);
        err.message = err.stack == 500 ? 'SomeThing bad happened.' : err.message;
        res.status(err.status).send(err.message);
    });
}
exports.serverError = serverError;
//# sourceMappingURL=error.middleware.js.map
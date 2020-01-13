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
const tokenVerify_1 = require("./tokenVerify/tokenVerify");
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: 'verify: 403'
            });
        }
        try {
            yield tokenVerify_1.verifyUser(token);
            return next();
        }
        catch (err) {
            res.status(403).json({
                success: false,
                statusCode: 403,
                message: 'verify: 403'
            });
        }
    });
}
exports.verify = verify;
//# sourceMappingURL=tokenVerify.middleware.js.map
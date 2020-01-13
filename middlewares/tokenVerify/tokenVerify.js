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
const jwt = require("jsonwebtoken");
const jwt_util_1 = require("../../packages/utils/jwt.util");
function verifyUser(token) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield jwt.verify(token, jwt_util_1.jwtToken.secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    }));
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=tokenVerify.js.map
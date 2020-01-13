"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwt_util_1 = require("./jwt.util");
function auth(request) {
    const token = request.get('x-access-token');
    const secret = jwt_util_1.jwtToken.secret;
    let auth = jwt.verify(token, secret);
    return auth;
}
exports.auth = auth;
//# sourceMappingURL=auth.util.js.map
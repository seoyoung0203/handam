"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const nodemailer = require("nodemailer");
var emailUtil;
(function (emailUtil) {
    const file = './packages/utils/config/env.json';
    let emailData = fs.readFileSync(file, 'utf8');
    emailData = JSON.parse(emailData);
    emailUtil.smtpTransport = nodemailer.createTransport({
        service: emailData.service,
        auth: {
            user: emailData.auth.user,
            pass: emailData.auth.pass
        }
    });
})(emailUtil = exports.emailUtil || (exports.emailUtil = {}));
//# sourceMappingURL=email.util.js.map
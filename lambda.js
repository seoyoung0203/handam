"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverless = require("serverless-http");
const app_1 = require("./app");
const app = new app_1.Server().app;
module.exports.handler = serverless(app, {
    binary: ['image/png', 'image/gif']
});
//# sourceMappingURL=lambda.js.map
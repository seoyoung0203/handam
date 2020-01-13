"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const redis = require("redis");
var cacheUtil;
(function (cacheUtil) {
    const file = './packages/utils/config/env.json';
    let cacheData = fs.readFileSync(file, 'utf8');
    cacheData = JSON.parse(cacheData);
    cacheData.cache.port = parseInt(cacheData.cache.port);
    cacheUtil.client = redis.createClient(cacheData.cache.port, cacheData.cache.endpoint);
})(cacheUtil = exports.cacheUtil || (exports.cacheUtil = {}));
//# sourceMappingURL=cache.util.js.map
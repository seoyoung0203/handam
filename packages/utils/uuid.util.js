"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("node-uuid");
/**
 * UUID 생성
 * @returns string
 */
function uuidV1() {
    return uuid.v1();
}
exports.uuidV1 = uuidV1;
/**
 * UUID 검사
 * @param uuid
 * @returns {boolean}
 */
function checkUuid(uuid) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
}
exports.checkUuid = checkUuid;
//# sourceMappingURL=uuid.util.js.map
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
const fs = require("graceful-fs");
const path = require('path');
/**
 * model: 약관 HTML 파일 로드
 * @param {string} termsName
 * @returns {any}
 */
function loadTermsHtml(termsName) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const file = path.join(__dirname, '..', 'template', `${termsName}.html`);
        if (!fs.existsSync(file)) {
            return reject('Terms does not exist');
        }
        const result = fs.readFileSync(file, 'utf8');
        return resolve(result);
    }));
}
exports.loadTermsHtml = loadTermsHtml;
//# sourceMappingURL=terms.model.js.map
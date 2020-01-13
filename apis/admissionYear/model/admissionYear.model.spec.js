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
const chai_1 = require("chai");
const admissionYear_model_1 = require("./admissionYear.model");
describe('admissionYear 모델', () => {
    it('listAdmissionYear', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield admissionYear_model_1.admissionYear.listAdmissionYear();
        // console.log(result);
        chai_1.expect(result).instanceof(Array);
    }));
});
//# sourceMappingURL=admissionYear.model.spec.js.map
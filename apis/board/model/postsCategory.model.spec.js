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
const postsCategory_model_1 = require("./postsCategory.model");
describe('postsCategory 모델', () => __awaiter(void 0, void 0, void 0, function* () {
    it('listPostsCategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsCategory_model_1.postsCategory.listPostsCategory();
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
}));
//# sourceMappingURL=postsCategory.model.spec.js.map
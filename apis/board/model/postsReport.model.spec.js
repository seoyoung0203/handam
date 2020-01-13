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
const postsReport_model_1 = require("./postsReport.model");
describe('postsReport 모델', () => {
    let userIndex = 1;
    let postsIndex = 37;
    let content = 'Report!!';
    /*** 테스트 용도로 사용 ***/
    it('createPostsReport', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield postsReport_model_1.postsReport.createPostsReport({
                userIndex: userIndex,
                postsIndex: postsIndex,
                content: content
            });
            chai_1.expect(result).to.be.eqls({
                userIndex: userIndex,
                postsIndex: postsIndex,
                content: content
            });
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('checkPostsReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReport_model_1.postsReport.checkPostsReport(postsIndex, userIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listPostsReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReport_model_1.postsReport.listPostsReport();
        //console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    const updateContent = 'changes content';
    const postsReportIndex = 27;
    it('updatePostsReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReport_model_1.postsReport.updatePostsReport(postsReportIndex, {
            userIndex: userIndex,
            postsIndex: postsIndex,
            content: updateContent
        });
        //console.log(result);
        chai_1.expect(result).to.be.eqls({
            userIndex: userIndex,
            postsIndex: postsIndex,
            content: updateContent
        });
    }));
    it('deletePostsReport', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReport_model_1.postsReport.deletePostsReport(postsIndex, userIndex);
        //console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=postsReport.model.spec.js.map
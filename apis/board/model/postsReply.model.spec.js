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
const posts_model_1 = require("./posts.model");
const postsReply_model_1 = require("./postsReply.model");
describe('postsReply 모델', () => {
    let resultPosts;
    let resultPostsReply;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield posts_model_1.posts.createPosts({
                userIndex: 1,
                postsCategoryIndex: 1,
                title: '테스트 게시글 제목',
                content: '테스트 게시글 내용',
                status: 'ACTIVE',
                isAnonymous: 0
            });
            const result = yield posts_model_1.posts.getPostsByTitle('테스트 게시글 제목');
            resultPosts = result;
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield posts_model_1.posts.deletePosts(resultPosts[0].postsIndex);
            // console.log(result);
            chai_1.expect(result).to.instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('createPostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.createPostsReply({
            postsIndex: resultPosts[0].postsIndex,
            parentsPostsReplyIndex: null,
            userIndex: 1,
            content: '테스트 게시글 댓글',
            status: 'ACTIVE',
            isAnonymous: 0
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listPostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.listPostsReply(resultPosts[0].postsIndex);
        resultPostsReply = result;
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListPostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.pageListPostsReply(resultPosts[0].postsIndex, 1, 1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getPostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.getPostsReply(resultPostsReply[0].postsReplyIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updatePostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.updatePostsReply(resultPostsReply[0].postsReplyIndex, {
            content: '업데이트 테스트 게시글 댓글 내용'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deletePostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.deletePostsReply(resultPostsReply[0].postsReplyIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deleteChildPostsReply', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsReply_model_1.postsReply.deleteChildPostsReply(resultPostsReply[0].postsReplyIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=postsReply.model.spec.js.map
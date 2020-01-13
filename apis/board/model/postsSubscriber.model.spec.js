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
const postsSubscriber_model_1 = require("./postsSubscriber.model");
describe('postsSubscriber', () => {
    let resultPosts;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield posts_model_1.posts.createPosts({
                userIndex: 1,
                postsCategoryIndex: 1,
                title: '테스트 게시글 제목',
                content: '테스트 게시글 내용'
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
    it('createPostsSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.createPostsSubscriber({
            postsIndex: resultPosts[0].postsIndex,
            userIndex: 1,
            isGood: true,
            isBad: false,
            isScrap: true
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('createPostsSubscriber2', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.createPostsSubscriber({
            postsIndex: resultPosts[0].postsIndex,
            userIndex: 2,
            isGood: true,
            isBad: false,
            isScrap: false
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getPostsSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriber(resultPosts[0].postsIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getPostsSubscriberByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(resultPosts[0].postsIndex, 1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('updatePostsSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.updatePostsSubscriber(resultPosts[0].postsIndex, 1, {
            isBad: true
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deletePostsSubscriber', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsSubscriber_model_1.postsSubscriber.deletePostsSubscriber(resultPosts[0].postsIndex, 1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
});
//# sourceMappingURL=postsSubscriber.model.spec.js.map
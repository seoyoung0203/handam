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
describe('posts 모델', () => __awaiter(void 0, void 0, void 0, function* () {
    let resultPosts;
    it('createPosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.createPosts({
            userIndex: 1,
            postsCategoryIndex: 1,
            title: '테스트 게시글 제목',
            content: '테스트 게시글 내용',
            status: 'ACTIVE',
            isAnonymous: 0
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('listPosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.listPosts(`postsCategoryIndex eq 1`);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListPosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.pageListPosts(`postsCategoryIndex eq 1 AND title like 테스트`, `createdAt ASC`, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listPostsByIsScrap', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.listPostsByIsScrap(1, `postsCategoryIndex eq 1`);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListPostsByIsScrap', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.pageListPostsByIsScrap(1, `postsCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('listPostsByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.listPostsByUserIndex(1, `postsCategoryIndex eq 1`);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('pageListPostsByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.pageListPostsByUserIndex(1, `postsCategoryIndex eq 1`, `createdAt ASC`, 1, 3);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Array);
    }));
    it('getPostsByTitle', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.getPostsByTitle('테스트 게시글 제목');
        // console.log(result);
        resultPosts = result;
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getPostsByUserIndex', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.getPostsByUserIndex(1);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getPosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.getPosts(resultPosts[0].postsIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('updatePosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.updatePosts(resultPosts[0].postsIndex, {
            content: '업데이트 테스트 게시글 내용'
        });
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deletePosts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield posts_model_1.posts.deletePosts(resultPosts[0].postsIndex);
        // console.log(result);
        chai_1.expect(result).to.instanceof(Object);
    }));
}));
//# sourceMappingURL=posts.model.spec.js.map
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
const postsImage_model_1 = require("./postsImage.model");
describe('postsImage 모델', () => {
    const userIndex = 1;
    let postsIndex = undefined;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield posts_model_1.posts.createPosts({
                userIndex,
                postsCategoryIndex: 1,
                title: '테스트 게시글 이미지 업로드',
                content: '테스트 게시글 이미지 업로드 내용',
                status: 'ACTIVE'
            });
            const result = yield posts_model_1.posts.getPostsByTitle('테스트 게시글 이미지 업로드');
            postsIndex = result[0].postsIndex;
        }
        catch (err) {
            console.error('postsImage before ', err);
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield posts_model_1.posts.deletePosts(postsIndex);
            //console.log(result);
        }
        catch (err) {
            console.error('postsImage after ', err);
        }
    }));
    it('createPostsImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const arr = [];
        arr.push('https://goo.gl/maps/L3MtsMtV6r1/test1');
        arr.push('https://goo.gl/maps/L3MtsMtV6r1/test2');
        const data = {
            image: arr
        };
        const result = yield postsImage_model_1.postsImage.createPostsImage({
            postsIndex,
            path: JSON.stringify(data)
        });
        //console.log('create ', typeof result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('getPostsImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsImage_model_1.postsImage.getPostsImage(postsIndex);
        //console.log('get ', typeof result);
        chai_1.expect(result).to.instanceOf(Object);
    }));
    it('updatePostsImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            image: ['https://goo.gl/maps/L3MtsMtV6r1/test3', 'https://goo.gl/maps/L3MtsMtV6r1/test4']
        };
        const result = yield postsImage_model_1.postsImage.updatePostsImage(postsIndex, {
            postsIndex,
            path: JSON.stringify(data)
        });
        //console.log('update ', typeof result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('deletePostsImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield postsImage_model_1.postsImage.deletePostsImage(postsIndex);
        //console.log('delete ', typeof result);
        chai_1.expect(result).to.instanceof(Object);
    }));
    it('createRemovedPostsImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const path = [];
        path.push('https://goo.gl/maps/L3MtsMtV6r1/test1');
        path.push('https://goo.gl/maps/L3MtsMtV6r1/test2');
        const data = {
            image: path
        };
        const result = yield postsImage_model_1.postsImage.createPostsRemovedImage({
            postsIndex,
            path: JSON.stringify(data)
        });
    }));
});
//# sourceMappingURL=postsImage.model.spec.js.map
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
const express_1 = require("express");
const moment = require("moment");
const postsCategory_model_1 = require("../model/postsCategory.model");
class PostsCategoryRoutes {
    constructor() {
        this.postsCategoryRouter = express_1.Router();
        this.router();
    }
    router() {
        this.postsCategoryRouter.get('/postsCategory', listPostsCategory);
    }
}
exports.PostsCategoryRoutes = PostsCategoryRoutes;
/**
 * route: postsCategory 리스트 조회
 * @param req
 * @param res
 */
function listPostsCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield postsCategory_model_1.postsCategory.listPostsCategory();
            const recentPosts = yield Promise.all(results.map(result => {
                return postsCategory_model_1.postsCategory.getRecentPostByPostsCategoryIndex(result.postsCategoryIndex);
            }));
            const today = moment();
            const categoryIndexToDays = new Map();
            recentPosts.forEach(post => {
                const { postsCategoryIndex, createdAt } = post[0];
                const diff = today.diff(moment(createdAt).subtract(9, 'h'), 'days');
                categoryIndexToDays.set(postsCategoryIndex, diff);
            });
            const result = results.map(result => {
                const { postsCategoryIndex } = result;
                return Object.assign(Object.assign({}, result), { hasNewPost: categoryIndexToDays.get(postsCategoryIndex) === 0 });
            });
            res.send({
                success: true,
                statusCode: 200,
                resultCount: results.length,
                result,
                message: 'listPostsCategory: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'listPostsCategory: 50000'
                    });
            }
        }
    });
}
exports.postsCategoryRoutes = new PostsCategoryRoutes();
//# sourceMappingURL=postsCategory.route.js.map
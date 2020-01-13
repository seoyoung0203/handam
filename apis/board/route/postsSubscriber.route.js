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
const express = require("express");
const auth_util_1 = require("../../../packages/utils/auth.util");
const posts_model_1 = require("../model/posts.model");
const postsSubscriber_model_1 = require("../model/postsSubscriber.model");
class PostsSubscriberRoutes {
    constructor() {
        this.postsSubscriberRouter = express.Router();
        this.router();
    }
    router() {
        this.postsSubscriberRouter.put('/postsSubscriber/postsIndex/:postsIndex', putPostsSubscriber);
    }
}
exports.PostsSubscriberRoutes = PostsSubscriberRoutes;
/**
 * route: postsSubscriber 생성 및 업데이트
 * @param req
 * @param res
 */
function putPostsSubscriber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postsIndex = req.params.postsIndex;
            let userData = auth_util_1.auth(req);
            const userIndex = userData.tokenIndex;
            let result = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userIndex);
            if (result[0] == null) {
                yield postsSubscriber_model_1.postsSubscriber.createPostsSubscriber({
                    postsIndex: postsIndex,
                    userIndex: userIndex,
                    isGood: req.body.isGood === undefined ? 0 : 1,
                    isBad: req.body.isBad === undefined ? 0 : 1,
                    isScrap: req.body.isScrap === undefined ? 0 : 1
                });
            }
            else {
                yield postsSubscriber_model_1.postsSubscriber.updatePostsSubscriber(postsIndex, userIndex, req.body);
            }
            result = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userIndex);
            if (result[0].isGood === 0 && result[0].isBad === 0 && result[0].isScrap === 0) {
                yield postsSubscriber_model_1.postsSubscriber.deletePostsSubscriber(postsIndex, userIndex);
            }
            /** posts goodCount, badCount 업데이트 */
            const subscriberCount = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberSumCount(postsIndex);
            yield posts_model_1.posts.updatePosts(postsIndex, {
                goodCount: subscriberCount[0].goodCount,
                badCount: subscriberCount[0].badCount
            });
            delete result[0].userIndex;
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'putPostsSubscriber: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The ID does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'putPostsSubscriber : 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'putPostsSubscriber : 50000'
                    });
                    break;
            }
        }
    });
}
exports.postsSubscriberRoutes = new PostsSubscriberRoutes();
//# sourceMappingURL=postsSubscriber.route.js.map
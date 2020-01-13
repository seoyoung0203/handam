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
const s3_util_1 = require("../../../packages/utils/s3.util");
const posts_model_1 = require("../model/posts.model");
const postsImage_model_1 = require("../model/postsImage.model");
const postsReport_model_1 = require("../model/postsReport.model");
const postsSubscriber_model_1 = require("../model/postsSubscriber.model");
class PostsRoutes {
    constructor() {
        this.postsRouter = express.Router();
        this.router();
    }
    router() {
        this.postsRouter.post('/posts', createPosts);
        this.postsRouter.get('/posts', pageListPosts);
        this.postsRouter.get('/posts/scrap', pageListPostsByIsScrap);
        this.postsRouter.get('/posts/publisher', pageListPostsByUserIndex);
        this.postsRouter.get('/posts/postsIndex/:postsIndex', getPosts);
        this.postsRouter.put('/posts/postsIndex/:postsIndex', updatePosts);
        this.postsRouter.delete('/posts/postsIndex/:postsIndex', deletePosts);
    }
}
exports.PostsRoutes = PostsRoutes;
/**
 * route: posts 생성
 * @param req
 * @param res
 */
function createPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = 5;
        const userData = auth_util_1.auth(req);
        const upload = s3_util_1.s3Util.imageUpload(`postsImage`, userData.tokenIndex).array('upload', limit);
        yield upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    throw 'upload error';
                }
                const postsData = {
                    userIndex: userData.tokenIndex,
                    postsCategoryIndex: req.body.postsCategoryIndex,
                    title: req.body.title,
                    content: req.body.content,
                    status: 'ACTIVE',
                    isAnonymous: req.body.isAnonymous
                };
                const postsResult = yield posts_model_1.posts.createPosts(postsData);
                const { files } = req;
                const imagePath = [];
                for (const file of files) {
                    const [url, fileName] = file.location.split('postsImage');
                    imagePath.push(`${url}resized-postsImage${fileName}`);
                }
                if (imagePath.length > 0) {
                    const imageData = {
                        image: imagePath
                    };
                    const path = JSON.stringify(imageData);
                    const postsImageData = {
                        postsIndex: postsResult.insertId,
                        path
                    };
                    yield postsImage_model_1.postsImage.createPostsImage(postsImageData);
                }
                const result = Object.assign(postsData, { image: imagePath });
                /** 불필요한 데이터 삭제 */
                delete postsData.userIndex;
                res.send({
                    success: true,
                    statusCode: 200,
                    result,
                    message: 'createPosts: 200'
                });
            }
            catch (err) {
                switch (err) {
                    case 'This posts does not exist':
                        res.send({
                            success: false,
                            statusCode: 404,
                            message: 'createPosts: 40401'
                        });
                        break;
                    default:
                        res.send({
                            success: false,
                            statusCode: 500,
                            message: 'createPosts: 50000'
                        });
                        break;
                }
            }
        }));
    });
}
/**
 * route: posts page 리스트 조회
 * @param req
 * @param res
 */
function pageListPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = req.query.filter;
        let orderBy = req.query.orderBy;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        let userData = auth_util_1.auth(req);
        try {
            const resultCount = yield posts_model_1.posts.listPosts(filter);
            const result = yield posts_model_1.posts.pageListPosts(filter, orderBy, page, count);
            for (const row of result) {
                const scrapData = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
                const imagePath = yield postsImage_model_1.postsImage.getPostsImage(row.postsIndex);
                if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
                    row.isScrap = true;
                }
                else {
                    row.isScrap = false;
                }
                const ip = JSON.parse(JSON.stringify(imagePath))[0];
                row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListPosts: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListPosts: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: posts page isScrap 리스트 조회
 * @param req
 * @param res
 */
function pageListPostsByIsScrap(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = req.query.filter;
        let orderBy = req.query.orderBy;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        let userData = auth_util_1.auth(req);
        try {
            const resultCount = yield posts_model_1.posts.listPostsByIsScrap(userData.tokenIndex, filter);
            const result = yield posts_model_1.posts.pageListPostsByIsScrap(userData.tokenIndex, filter, orderBy, page, count);
            for (const row of result) {
                const imagePath = yield postsImage_model_1.postsImage.getPostsImage(row.postsIndex);
                const ip = JSON.parse(JSON.stringify(imagePath))[0];
                row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
                row.isScrap = row.isScrap === 1 ? true : false;
                delete row.userIndex;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListPostsByIsScrap: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListPostsByIsScrap: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: posts userIndex 리스트 조회
 * @param req
 * @param res
 */
function pageListPostsByUserIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = req.query.filter;
        let orderBy = req.query.orderBy;
        let page = parseInt(req.query.page);
        let count = parseInt(req.query.count);
        let userData = auth_util_1.auth(req);
        try {
            const resultCount = yield posts_model_1.posts.listPostsByUserIndex(userData.tokenIndex, filter);
            const result = yield posts_model_1.posts.pageListPostsByUserIndex(userData.tokenIndex, filter, orderBy, page, count);
            for (const row of result) {
                const scrapData = yield postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(row.postsIndex, userData.tokenIndex);
                const imagePath = yield postsImage_model_1.postsImage.getPostsImage(row.postsIndex);
                if (scrapData.length > 0 && scrapData[0].isScrap === 1) {
                    row.isScrap = true;
                }
                else {
                    row.isScrap = false;
                }
                const ip = JSON.parse(JSON.stringify(imagePath))[0];
                row.imageCount = ip ? JSON.parse(ip.path).image.length : 0;
            }
            res.send({
                success: true,
                statusCode: 200,
                resultCount: resultCount.length,
                result: result,
                message: 'pageListPostsByUserIndex: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'pageListPostsByUserIndex: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: posts 조회
 * @param req
 * @param res
 */
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let postsIndex = req.params.postsIndex;
        try {
            const userData = auth_util_1.auth(req);
            const [result, reportCheck, scrapData, imagePath, unused] = yield Promise.all([
                posts_model_1.posts.getPosts(postsIndex),
                postsReport_model_1.postsReport.checkPostsReport(postsIndex, userData.tokenIndex),
                postsSubscriber_model_1.postsSubscriber.getPostsSubscriberByUserIndex(postsIndex, userData.tokenIndex),
                postsImage_model_1.postsImage.getPostsImage(postsIndex),
                posts_model_1.posts.updatePostsByCount(postsIndex)
            ]);
            if (scrapData[0]) {
                result[0].isGood = !!scrapData[0].isGood;
                result[0].isBad = !!scrapData[0].isBad;
                result[0].isScrap = !!scrapData[0].isScrap;
            }
            else {
                result[0].isGood = false;
                result[0].isBad = false;
                result[0].isScrap = false;
            }
            result[0].reported = !!reportCheck[0];
            result[0].imagePath = imagePath;
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getPosts: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'This posts does not exist':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'getPosts: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getPosts: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: posts 업데이트
 * @param req
 * @param res
 */
function updatePosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = 5;
        const { postsIndex } = req.params;
        const userData = auth_util_1.auth(req);
        const upload = s3_util_1.s3Util.imageUpload(`postsImage`, userData.tokenIndex).array('upload', limit);
        yield upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    throw 'upload error';
                }
                const { files } = req;
                const { prevPath, removedPath } = req.body;
                const imagePath = [];
                if (removedPath) {
                    delete req.body.removedPath;
                    const tempPath = [];
                    const removedFiles = JSON.parse(removedPath).image;
                    removedFiles.forEach(removedFile => tempPath.push(removedFile));
                    const removedImageData = {
                        image: tempPath
                    };
                    const path = JSON.stringify(removedImageData);
                    const postsRemovedImageData = {
                        postsIndex,
                        path
                    };
                    yield postsImage_model_1.postsImage.createPostsRemovedImage(postsRemovedImageData);
                }
                if (prevPath) {
                    delete req.body.prevPath;
                    const prevFiles = JSON.parse(prevPath).image;
                    prevFiles.forEach(prevFile => imagePath.push(prevFile));
                }
                if (files) {
                    files.forEach(file => {
                        const [url, fileName] = file.location.split('postsImage');
                        imagePath.push(`${url}resized-postsImage${fileName}`);
                    });
                }
                const result = yield posts_model_1.posts.updatePosts(postsIndex, req.body);
                if (imagePath.length > 0) {
                    const imageData = {
                        image: imagePath
                    };
                    const path = JSON.stringify(imageData);
                    const postsImageData = {
                        postsIndex,
                        path
                    };
                    if (!prevPath && !removedPath) {
                        yield postsImage_model_1.postsImage.createPostsImage(postsImageData);
                    }
                    else {
                        yield postsImage_model_1.postsImage.updatePostsImage(postsIndex, postsImageData);
                    }
                }
                else {
                    yield postsImage_model_1.postsImage.deletePostsImage(postsIndex);
                }
                res.send({
                    success: true,
                    statusCode: 200,
                    result: Object.assign(result, { image: imagePath }),
                    message: 'updatePosts: 200'
                });
            }
            catch (err) {
                switch (err) {
                    default:
                        res.send({
                            success: false,
                            statusCode: 500,
                            message: 'updatePosts: 50000'
                        });
                        break;
                }
            }
        }));
    });
}
/**
 * route: posts 삭제
 * @param req
 * @param res
 */
function deletePosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { postsIndex } = req.params;
        try {
            const unused = auth_util_1.auth(req);
            const temp = yield postsImage_model_1.postsImage.getPostsImage(postsIndex);
            if (temp[0]) {
                yield postsImage_model_1.postsImage.createPostsRemovedImage({
                    postsIndex,
                    path: temp[0].path
                });
                yield postsImage_model_1.postsImage.deletePostsImage(postsIndex);
            }
            yield posts_model_1.posts.deletePosts(postsIndex);
            res.send({
                success: true,
                statusCode: 200,
                message: 'deletePosts: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deletePosts: 50000'
                    });
            }
        }
    });
}
exports.postsRoutes = new PostsRoutes();
//# sourceMappingURL=posts.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const { pool } = mysql_util_1.mysqlUtil;
class PostsImage {
    /**
     * model: postsImage 생성
     * @param {PostsImageData} postsImageData
     * @returns {Promise<PostsImageData|string>}
     */
    createPostsImage(postsImageData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO postsImage SET ?`, [postsImageData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsImageData);
                    }
                });
            });
        });
    }
    /**
     * model: postsImage 조회
     * @param {number} postsIndex
     * @returns {Promise<object|string>}
     */
    getPostsImage(postsIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT path FROM postsImage where postsIndex = ?`, [postsIndex], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    /**
     * model: postsImage 업데이트
     * @param {number} postsIndex
     * @param {PostsImageData} postsData
     * @returns {Promise<PostsImageData|string>}
     */
    updatePostsImage(postsIndex, postsImageData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE postsImage SET ? WHERE postsIndex = ?`, [postsImageData, postsIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsImageData);
                    }
                });
            });
        });
    }
    /**
     * model: postsImage 삭제
     * @param {number} postsIndex
     * @returns {Promise<object|string>}
     */
    deletePostsImage(postsIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM postsImage WHERE postsIndex = ?`, [postsIndex], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    /**
     * model: postsRemovedImage 생성
     * @param {PostsImageData} postsRevmoedData
     * @returns {Promise<object|string>}
     */
    createPostsRemovedImage(postsRemovedImageData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO postsRemovedImage SET ?`, [postsRemovedImageData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsRemovedImageData);
                    }
                });
            });
        });
    }
}
exports.PostsImage = PostsImage;
exports.postsImage = new PostsImage();
//# sourceMappingURL=postsImage.model.js.map
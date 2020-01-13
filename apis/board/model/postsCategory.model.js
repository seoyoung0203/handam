"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class PostsCategory {
    /**
     * model: postsCategory 리스트 조회
     */
    listPostsCategory() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from postsCategory ORDER BY postsCategory.order ASC`, (err, data) => {
                    connection.release();
                    err ? reject(err) : resolve(data);
                });
            });
        });
    }
    /**
     * model: 카테고리 인덱스에 따른 최신 post 조회
     * @param postsCategoryIndex
     */
    getRecentPostByPostsCategoryIndex(postsCategoryIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM posts WHERE postsCategoryIndex = ? ORDER BY createdAt DESC limit 1;`, [postsCategoryIndex], (err, data) => {
                    connection.release();
                    err ? reject(err) : resolve(data);
                });
            });
        });
    }
}
exports.PostsCategory = PostsCategory;
exports.postsCategory = new PostsCategory();
//# sourceMappingURL=postsCategory.model.js.map
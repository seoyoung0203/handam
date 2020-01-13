"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class PostsSubscriber {
    /**
     * model: postsSubscriber 생성
     * @param postsSubscriberData
     */
    createPostsSubscriber(postsSubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO postsSubscriber SET ?`, [postsSubscriberData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsSubscriberData);
                    }
                });
            });
        });
    }
    /**
     * model: postsSubscriber 게시글별 조회
     * @param postsIndex
     */
    getPostsSubscriber(postsIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
				t1.postsIndex,
				t1.isGood,
				t1.isBad,
				t1.isScrap,
				t2.userIndex,
				t2.userId,
				t2.userNickName
				FROM postsSubscriber AS t1
				INNER JOIN user AS t2 ON t2.userIndex = t1.userIndex
        		WHERE t1.postsIndex = ?`, [postsIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model: postsSubscriber 개수 조회
     * @param postsIndex
     */
    getPostsSubscriberSumCount(postsIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
				SUM(postsSubscriber.isGood) AS goodCount,
			  SUM(postsSubscriber.isBad) AS badCount
			  FROM postsSubscriber
        WHERE postsSubscriber.postsIndex = ?
        `, [postsIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model: postsSubscriber 사용자별 개수 조회
     * @param postsIndex
     * @param userIndex
     */
    getPostsSubscriberByUserIndex(postsIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
				t1.postsIndex,
				t1.isGood,
				t1.isBad,
				t1.isScrap,
				t2.userIndex,
				t2.userId,
				t2.userNickName
				FROM postsSubscriber AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.postsIndex = ?
        AND t1.userIndex = ?
        `, [postsIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model: postsSubscriber 업데이트
     * @param postsIndex
     * @param userIndex
     * @param postsSubscriberData
     */
    updatePostsSubscriber(postsIndex, userIndex, postsSubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE 
				postsSubscriber SET ? 
				WHERE postsIndex = ? 
				AND userIndex = ?`, [postsSubscriberData, postsIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model: postsSubscriber 삭제
     * @param postsIndex
     * @param userIndex
     */
    deletePostsSubscriber(postsIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM postsSubscriber WHERE postsIndex = ? AND userIndex = ?`, [postsIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
}
exports.PostsSubscriber = PostsSubscriber;
exports.postsSubscriber = new PostsSubscriber();
//# sourceMappingURL=postsSubscriber.model.js.map
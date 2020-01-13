"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class PostsReplyReport {
    /**
     * model: postsReplyReport 생성
     * @param : postsReplyReportData
     * @returns {Promise<any>}
     */
    createPostsReplyReport(postsReplyReportData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO postsReplyReport SET ?`, [postsReplyReportData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsReplyReportData);
                    }
                });
            });
        });
    }
    /**
     * model: PostsReplyReport 중복 신고 확인
     * @param : {number} postsReplyIndex
     * @param : {number} userIndex
     * @returns {Promise<any>}
     */
    checkPostsReplyReport(postsReplyIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from postsReplyReport where postsReplyIndex=? AND userIndex=?`, [postsReplyIndex,
                    userIndex], (err, data) => {
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
     * model: postsReplyIndex 신고횟수 조회
     * @param : {number} postsReplyIndex
     * @returns {Promise<any>}
     */
    getPostsReplyReportCount(postsReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT postsReplyIndex, count(*) as reportCount
              from postsReplyReport where postsReplyIndex=? group by postsReplyIndex`, [postsReplyIndex], (err, data) => {
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
     * model : PostsReplyReport 모든 신고 리스트 조회
     * @returns {Promise<any>}
     */
    listPostsReplyReport() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from postsReplyReport`, (err, data) => {
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
     * model : PostsReplyReport By User 특정 유저의 댓글 신고 리스트 조회
     * @param : {number} userIndex
     * @returns {Promise<any>}
     */
    getPostsReplyReportByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from postsReplyReport where userIndex=?`, [userIndex], (err, data) => {
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
     * model: postsReplyReport 업데이트
     * @param : {number} postsReplyReportIndex
     * @param : {any}    postsReportData
     * @returns {Promise<any>}
     */
    updatePostsReplyReport(postsReplyReportIndex, postsReplyReportData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE postsReplyReport SET ? where postsReplyReportIndex=?`, [postsReplyReportData, postsReplyReportIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(postsReplyReportData);
                    }
                });
            });
        });
    }
    /**
     * model: postsReplyReport 삭제 (신고 철회)
     * @param : {number} postsReplyIndex
     * @param : {number} userIndex
     * @returns {Promise<any>}
     */
    deletePostsReplyReport(postsReplyIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM postsReplyReport WHERE postsReplyIndex=? AND userIndex=?`, [postsReplyIndex, userIndex], (err, data) => {
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
exports.PostsReplyReport = PostsReplyReport;
exports.postsReplyReport = new PostsReplyReport();
//# sourceMappingURL=postsReplyReport.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class voteReplySubscriberModel {
    /**
     * model : voteReplySubscriber 생성
     * @param voteReplySubscriberData
     * return { Promise<any>}
     */
    createVoteReplySubscriber(voteReplySubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO voteReplySubscriber SET ?`, [voteReplySubscriberData], (err, data) => {
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
    /** model: voteReplySubscriber 조회
     * @param {number} userIndex
     * @param {number} voteReplyIndex
     * return: {Promise<any>}
     */
    getVoteReplySubscriber(userIndex, voteReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM voteReplySubscriber WHERE userIndex=? AND voteReplyIndex=?`, [userIndex, voteReplyIndex], (err, data) => {
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
    /** model: voteReplySubscriber 투표 댓글 별 good 갯수 합 조회
     * @param: {number} voteReplyIndex
     * return: {Promise<any>}
     */
    getVoteReplySubscriberSumCount(voteReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT SUM(isGood) as goodCount FROM voteReplySubscriber WHERE voteReplyIndex=? `, [voteReplyIndex], (err, data) => {
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
    /** model: voteReplySubscriber 업데이트
     * @param {number} userIndex
     * @param {number} voteReplyIndex
     * @param voteReplySubscriberData
     * return: {Promise<any>}
     */
    updateVoteReplySubscriber(userIndex, voteReplyIndex, voteReplySubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE voteReplySubscriber SET ? WHERE userIndex=? AND voteReplyIndex=?`, [voteReplySubscriberData, userIndex, voteReplyIndex], (err, data) => {
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
    /** model: voteReplySubscriber 삭제
     * @param {number} userIndex
     * @param {number} voteReplyIndex
     * return {Promise<any>}
     */
    deleteVoteReplySubscriber(userIndex, voteReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM voteReplySubscriber WHERE userIndex=? AND voteReplyIndex=?`, [userIndex, voteReplyIndex], (err, data) => {
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
exports.voteReplySubscriberModel = voteReplySubscriberModel;
exports.voteReplySubscriber = new voteReplySubscriberModel();
//# sourceMappingURL=voteReplySubscriber.model.js.map
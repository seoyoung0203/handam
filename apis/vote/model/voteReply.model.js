"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class VoteReplyModel {
    /**
     * model: 투표 댓글 생성
     * @param voteReplyData
     */
    createVoteReply(voteReplyData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO voteReply SET ?`, [voteReplyData], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        // resolve({...voteReplyData, index: result.insertId});
                        resolve(voteReplyData);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopicIndex 투표 댓글 리스트 조회
     * @param voteTopicIndex
     */
    listVoteReply(voteTopicIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
				t1.voteReplyIndex,
				t1.voteTopicIndex,
				t1.parentsVoteReplyIndex,
				t1.userIndex,
				t1.content,
				t1.status,
				t1.goodCount,
				t1.createdAt,
				t1.updatedAt,
				t2.userNickName
				FROM voteReply AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.voteTopicIndex = ?
				AND t1.parentsVoteReplyIndex IS NULL
				ORDER BY t1.createdAt ASC
				`, [voteTopicIndex], (err, data) => {
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
     * model: parentsVoteReplyIndex 댓글 리스트 조회
     * @param parentsVoteReplyIndex
     */
    listChildVoteReply(parentsVoteReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
				t1.voteReplyIndex,
				t1.voteTopicIndex,
				t1.parentsVoteReplyIndex,
				t1.userIndex,
				t1.content,
				t1.status,
				t1.createdAt,
				t1.updatedAt,
				t2.userNickName
				FROM voteReply AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.parentsVoteReplyIndex = ?
				ORDER BY t1.createdAt ASC
				`, [parentsVoteReplyIndex], (err, data) => {
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
     * model: voteTopicIndex 투표 댓글 page 리스트 조회
     * @param voteTopicIndex
     * @param page
     * @param count
     */
    pageListVoteReply(voteTopicIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT
				t1.voteReplyIndex,
				t1.voteTopicIndex,
				t1.parentsVoteReplyIndex,
				t1.userIndex,
				t1.content,
				t1.status,
				t1.createdAt,
				t1.updatedAt,
				t2.userNickName,
				(SELECT COUNT(*) AS count FROM voteReply WHERE t1.voteReplyIndex = voteReply.parentsVoteReplyIndex) AS childVoteReplyCount
				FROM voteReply AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.voteTopicIndex = ?
				AND t1.parentsVoteReplyIndex IS NULL
				ORDER BY t1.createdAt ASC LIMIT ${start}, ${count}
				`, [voteTopicIndex], (err, data) => {
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
     * model: voteReplyIndex 투표 댓글 page 리스트 조회
     * @param parentsVoteReplyIndex
     * @param page
     * @param count
     */
    pageListChildVoteReply(parentsVoteReplyIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT
				t1.voteReplyIndex,
				t1.voteTopicIndex,
				t1.parentsVoteReplyIndex,
				t1.userIndex,
				t1.content,
				t1.status,
				t1.createdAt,
				t1.updatedAt,
				t2.userNickName
				FROM voteReply AS t1
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.parentsVoteReplyIndex = ?
				ORDER BY t1.createdAt ASC LIMIT ${start}, ${count}
				`, [parentsVoteReplyIndex], (err, data) => {
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
     * model: voteTopicIndex 투표 댓글 업데이트
     * @param voteReplyIndex
     * @param voteReplyData
     */
    updateVoteReply(voteReplyIndex, voteReplyData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE voteReply SET ? WHERE voteReplyIndex = ?`, [voteReplyData, voteReplyIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(voteReplyData);
                    }
                });
            });
        });
    }
    /**
     * model: voteReplyModel 투표 댓글 삭제
     * @param voteReplyIndex
     */
    deleteVoteReply(voteReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM voteReply WHERE voteReplyIndex = ?`, [voteReplyIndex], (err, data) => {
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
exports.VoteReplyModel = VoteReplyModel;
exports.voteReply = new VoteReplyModel();
//# sourceMappingURL=voteReply.model.js.map
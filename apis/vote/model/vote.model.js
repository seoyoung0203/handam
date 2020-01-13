"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class VoteModel {
    /**
     * model: voteTopic 생성
     * @param voteTopicData
     * @returns {Promise<void>}
     */
    createVoteTopic(voteTopicData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO voteTopic SET ?', [voteTopicData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(voteTopicData);
                    }
                });
            });
        });
    }
    /**
     * model: voteItem 생성
     * @param voteItemData
     * @returns {Promise<void>}
     */
    createVoteItem(voteItemData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO voteItem SET ?', [voteItemData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(voteItemData);
                    }
                });
            });
        });
    }
    /**
     * model: voteUser 생성
     * @param voteUserData
     * @returns {Promise<void>}
     */
    createVoteUser(voteUserData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO voteUser SET ?', [voteUserData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(voteUserData);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic 조회
     * @returns {Promise<void>}
     */
    getVoteTopic() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM voteTopic WHERE status = 'ACTIVE'`, function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows[0]);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic 리스트 조회
     * @returns {Promise<void>}
     */
    listVoteTopic() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                else {
                    connection.query(`SELECT * FROM voteTopic WHERE status<>'WAITING'  ORDER BY createdAt DESC`, (err, rows) => {
                        connection.release();
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                }
            });
        });
    }
    /**
     * model: voteTopic status 조회
     * @param {string} status
     * @returns {Promise<void>}
     */
    getVoteTopicByStatus(status) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM voteTopic WHERE status = ?`, [status], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows[0]);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic voteTopicIndex 조회
     * @param {number} voteTopicIndex
     * @returns {Promise<void>}
     */
    getVoteTopicByTopicIndex(voteTopicIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM voteTopic WHERE voteTopicIndex = ?`, [voteTopicIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows[0]);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic topicName 조회
     * @param {string} topicName
     * @returns {Promise<void>}
     */
    getVoteTopicByTopicName(topicName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM voteTopic WHERE topicName = ? AND status = 'ACTIVE'`, [topicName], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: 시간 차이 조회
     * @param dueDate
     * @param nowDate
     * @returns {Promise<void>}
     */
    getVoteDateDiff(dueDate, nowDate) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT DATEDIFF('${dueDate}', '${nowDate}') AS dateDiff`, function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows[0]);
                    }
                });
            });
        });
    }
    /**
     * model: pastVote 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    listVotePastTopic() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM voteTopic WHERE status = 'INACTIVE'`, function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: pastVote page 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListVotePastTopic(page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT * FROM voteTopic WHERE status = 'INACTIVE' ORDER BY createdAt DESC LIMIT ${start}, ${count}`, function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: voteItem voteItemIndex 리스트 조회
     * @param {number} voteTopicIndex
     * @returns {Promise<void>}
     */
    listVoteItemIndex(voteTopicIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT voteItemIndex FROM voteItem WHERE voteTopicIndex = ?`, [voteTopicIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: voteItem 리스트 조회
     * @param {number} voteTopicIndex
     * @returns {Promise<void>}
     */
    listVoteItem(voteTopicIndex, voteItemIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT voteTopicIndex, voteItemIndex, itemName, itemOrder, createdAt, updatedAt, 
				( 
					SELECT 
					COUNT(voteItemIndex) AS count
					FROM voteUser
					WHERE voteItemIndex = ?
				) count
				FROM voteItem WHERE voteTopicIndex = ? AND voteItemIndex = ?`, [voteItemIndex, voteTopicIndex,
                    voteItemIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows[0]);
                    }
                });
            });
        });
    }
    /**
     * model: voteItem 조회
     * @param {number} voteItemIndex
     * @returns {Promise<void>}
     */
    getVoteItem(voteItemIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM voteItem WHERE voteItemIndex = ? ORDER BY itemOrder ASC', [voteItemIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: voteUser 조회
     * @param {number} voteTopicIndex
     * @param {number} voteItemIndex
     * @returns {Promise<void>}
     */
    getVoteUser(voteTopicIndex, voteItemIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM voteUser WHERE voteTopicIndex = ? AND voteItemIndex = ?', [voteTopicIndex,
                    voteItemIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: voteUser 리스트 조회
     * @param {number} voteTopicIndex
     * @returns {Promise<void>}
     */
    listVoteUser(voteTopicIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM voteUser WHERE voteTopicIndex = ?', [voteTopicIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic 업데이트
     * @param {number} voteTopicIndex
     * @param voteTopicData
     * @returns {Promise<void>}
     */
    updateVoteTopic(voteTopicIndex, voteTopicData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('UPDATE voteTopic SET ? WHERE voteTopicIndex = ?', [voteTopicData,
                    voteTopicIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: vote 체크
     * @param {number} voteTopicIndex
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    checkVote(voteTopicIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM voteUser WHERE voteTopicIndex = ? AND userIndex = ?', [voteTopicIndex,
                    userIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        if (rows[0]) {
                            resolve(rows[0]);
                        }
                        reject('user does not exist');
                    }
                });
            });
        });
    }
    /**
     * model: voteTopic 삭제
     * @param {number} voteTopicIndex
     * @returns {Promise<void>}
     */
    deleteVoteTopic(voteTopicIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM voteTopic WHERE voteTopicIndex = ?', [voteTopicIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
}
exports.VoteModel = VoteModel;
exports.vote = new VoteModel();
//# sourceMappingURL=vote.model.js.map
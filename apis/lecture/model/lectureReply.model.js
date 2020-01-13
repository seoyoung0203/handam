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
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class LectureReply {
    /**
     * model: lectureReply 생성
     * @param lectureReplyData
     * @returns {Promise<void>}
     */
    createLectureReply(lectureReplyData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const preview = yield lectureReplyData.review.substring(0, 50);
            lectureReplyData.preview = preview;
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO lectureReply SET ?`, [lectureReplyData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(lectureReplyData);
                    }
                });
            });
        }));
    }
    /**
     * model: lectureReply 카운트 조회
     * @param {string} lectureInfoIndex
     * @returns {Promise<void>}
     */
    countGetLectureReplyByLectureInfoIndex(lectureInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT COUNT(*) AS replyCount FROM lectureReply WHERE lectureReply.lectureInfoIndex = ?`, [lectureInfoIndex], function (err, rows) {
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
     * model: lectureReply 중복 검사
     * @param {number} lectureInfoIndex
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    checkGetLectureReply(lectureInfoIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT COUNT(*) AS replyCount 
				FROM lectureReply 
				WHERE lectureReply.lectureInfoIndex = ? AND lectureReply.userIndex = ?`, [lectureInfoIndex,
                    userIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        if (rows[0].replyCount === 0) {
                            return resolve(rows[0]);
                        }
                        else {
                            return reject('LectureReply already exists');
                        }
                    }
                });
            });
        });
    }
    checkUpdateLectureReply(lectureInfoIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * 
				FROM lectureReply 
				WHERE lectureReply.lectureInfoIndex = ? AND lectureReply.userIndex = ?`, [lectureInfoIndex,
                    userIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        if (rows[0] === undefined) {
                            return reject('LectureReply does not exist');
                        }
                        else {
                            return resolve(rows[0]);
                        }
                    }
                });
            });
        });
    }
    /**
     * model: lectureReply 리스트 조회
     * @returns {Promise<void>}
     */
    listLectureReply() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex`, function (err, rows) {
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
     * model: lectureReply page 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListLectureReply(page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * model: lectureReply index 조회
     * @param {number} lectureReplyIndex
     * @returns {Promise<void>}
     */
    getLectureReplyByLectureReplyIndex(lectureReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t1.lectureReplyIndex = ?`, [lectureReplyIndex], function (err, rows) {
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
     * model: lectureReply replyIndex page 조회
     * @param {number} lectureReplyIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByLectureReplyIndex(lectureReplyIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureReplyIndex LIKE ?
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, [`%${lectureReplyIndex}%`], function (err, rows) {
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
     * model: lectureReply lectureInfoIndex 리스트 조회
     * @param {number} lectureInfoIndex
     * @returns {Promise<void>}
     */
    listLectureReplyByLectureInfoIndex(lectureInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t1.lectureInfoIndex = ?`, [lectureInfoIndex], function (err, rows) {
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
     * model: lectureReply lectureInfoIndex page 리스트 조회
     * @param {number} lectureInfoIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListLectureReplyByLectureInfoIndex(lectureInfoIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureInfoIndex = ?
				ORDER BY t1.lectureReplyIndex DESC LIMIT ${start}, ${count}`, [lectureInfoIndex], function (err, rows) {
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
     * model: lectureReply userIndex 조회
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    getLectureReplyByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userIndex = ?`, [userIndex], function (err, rows) {
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
     * model: lectureReply userIndex page 조회
     * @param {number} userIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByUserIndex(userIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.userIndex LIKE ?
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, [`%${userIndex}%`], function (err, rows) {
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
     * model: lectureReply userId 리스트 조회
     * @param {string} userId
     * @returns {Promise<void>}
     */
    listLectureReplyByUserId(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userId LIKE ?`, [`%${userId}%`], function (err, rows) {
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
     * model: lectureReply userId page 리스트 조회
     * @param {number} userId
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListLectureReplyByUserId(userId, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userId LIKE ?
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, [`%${userId}%`], function (err, rows) {
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
     * model: lectureReply userNickName 리스트 조회
     * @param {string} userNickName
     * @returns {Promise<void>}
     */
    listLectureReplyByUserNickName(userNickName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 
				INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex 
				WHERE t2.userNickName LIKE ?`, [`%${userNickName}%`], function (err, rows) {
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
     * model: lectureReply userNickName page 리스트 조회
     * @param {number} userNickName
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListLectureReplyByUserNickName(userNickName, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.preview, t1.review, t1.score, t1.createdAt, t2.userId, t2.userNickName 
				FROM lectureReply AS t1 INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userNickName LIKE ?
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, [`%${userNickName}%`], function (err, rows) {
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
     * model: lectureReply 업데이트
     * @param {number} lectureReplyIndex
     * @param lectureReplyData
     * @returns {Promise<void>}
     */
    updateLectureReply(lectureReplyIndex, lectureReplyData) {
        let result;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (lectureReplyData.review) {
                const preview = yield lectureReplyData.review.substring(0, 50);
                lectureReplyData.preview = preview;
            }
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE lectureReply SET ? WHERE lectureReplyIndex = ?`, [lectureReplyData,
                    lectureReplyIndex], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        result = {
                            success: true,
                            statusCode: 200,
                            message: 'createLectureReply: 리플 업데이트 성공'
                        };
                        resolve(result);
                    }
                });
            });
        }));
    }
    /**
     * model: lectureReply 삭제
     * @param {number} lectureReplyIndex
     * @returns {Promise<void>}
     */
    deleteLectureReply(lectureReplyIndex) {
        let result;
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM lectureReply WHERE lectureReplyIndex = ?', [lectureReplyIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        result = {
                            success: true,
                            statusCode: 200,
                            message: 'createLectureReply: 리플 삭제 성공'
                        };
                        resolve(result);
                    }
                });
            });
        });
    }
    /**
     * model: lectureReply userIndex 로 삭제
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    deleteLectureReplyByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM lectureReply WHERE userIndex = ?', [userIndex], function (err, rows) {
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
     * model: lectureReply 점수 조회
     * @param {string} lectureInfoIndex
     * @returns {Promise<void>}
     */
    scoreGetLectureReply(lectureInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT AVG(score) AS totalScore FROM lectureReply WHERE lectureInfoIndex = ?`, [lectureInfoIndex], function (err, rows) {
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
exports.LectureReply = LectureReply;
exports.lectureReply = new LectureReply();
//# sourceMappingURL=lectureReply.model.js.map
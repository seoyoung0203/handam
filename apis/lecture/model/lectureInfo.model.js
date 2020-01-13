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
const lectureReply_model_1 = require("./lectureReply.model");
const pool = mysql_util_1.mysqlUtil.pool;
// TODO(@jade): textbook 칼럼 추가  date: 2018. 2. 21. 오후 6:11
class LectureInfo {
    /**
     * model: lectureInfo 생성
     * @param lectureInfoData
     * @returns {Promise<void>}
     */
    createLectureInfo(lectureInfoData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO lectureInfo SET ?`, [lectureInfoData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(lectureInfoData);
                    }
                });
            });
        });
    }
    /**
     * model: lectureInfo 리스트 조회
     * @returns {Promise<void>}
     */
    listLectureInfo() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureName, t2.track, t3.professorName 
					FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
					INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex
					ORDER BY t1.updatedAt DESC`, function (err, rows) {
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
     * model: lectureInfo page 리스트 조회
     * @returns {Promise<any>}
     */
    pageListLectureInfo(page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureName, t2.track, t3.professorName
          FROM lectureInfo AS t1 
          INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
          INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
          ORDER BY t1.updatedAt DESC LIMIT ${start}, ${count}`, function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: lectureInfo searchTerm 리스트 조회
     * @param {string} searchTerm
     * @returns {Promise<void>}
     */
    listLectureInfoBySearchTerm(searchTerm) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureCode, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureCode LIKE ?
				OR t2.lectureName LIKE ?
				OR t2.track LIKE ? 
				OR t3.professorName LIKE ?`, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`,
                    `%${searchTerm}%`], function (err, rows) {
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
     * model: lectureInfo searchTerm page 리스트 조회
     * @param {string} searchTerm
     * @param {number} page
     * @param {number} count
     * @returns {Promise<void>}
     */
    pageListLectureInfoBySearchTerm(searchTerm, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t1.updatedAt, t2.lectureCode, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureCode LIKE ? 
				OR t2.lectureName LIKE ?
				OR t2.track LIKE ?
				OR t3.professorName LIKE ?
				ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${searchTerm}%`, `%${searchTerm}%`,
                    `%${searchTerm}%`, `%${searchTerm}%`], function (err, rows) {
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
     * model: lectureInfo index 조회
     * @param lectureInfoIndex
     * @returns {Promise<void>}
     */
    getLectureInfoByLectureInfoIndex(lectureInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t1.lectureInfoIndex = ?`, [lectureInfoIndex], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: lectureInfo lectureName 리스트 조회
     * @param lectureName
     * @returns {Promise<void>}
     */
    listLectureInfoByLectureName(lectureName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t2.lectureName LIKE ?`, [`%${lectureName}%`], function (err, rows) {
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
     * model: lectureInfo lectureName page 리스트 조회
     * @param lectureName
     * @returns {Promise<void>}
     */
    pageListLectureInfoByLectureName(lectureName, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
          FROM lectureInfo AS t1 
          INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
          INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
          WHERE t2.lectureName LIKE ?
          ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${lectureName}%`], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: lectureInfo professorName 리스트 조회
     * @param professorName
     * @returns {Promise<void>}
     */
    listLectureInfoByProfessorName(professorName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1 INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				WHERE t3.professorName LIKE ?`, [`%${professorName}%`], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: lectureInfo professorName page 리스트 조회
     * @param professorName
     * @returns {Promise<void>}
     */
    pageListLectureInfoByProfessorName(professorName, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lectureInfo AS t1 
                INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t3.professorName LIKE ?
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, [`%${professorName}%`], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: listLectureInfo userIndex 리스트 조회
     * @param userIndex
     */
    listLectureInfoByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1
				INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				INNER JOIN lectureReply AS t4 ON t1.lectureInfoIndex = t4.lectureInfoIndex
				WHERE t4.userIndex = ?`, [userIndex], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: listLectureInfo userIndex page 리스트 조회
     * @param userIndex
     * @param page
     * @param count
     */
    pageListLectureInfoByUserIndex(userIndex, page, count) {
        return new Promise((resolve, reject) => {
            let start = (page - 1) * count;
            if (start < 0) {
                start = 0;
            }
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lectureInfo AS t1
				INNER JOIN lecture AS t2 ON t1.lectureIndex = t2.lectureIndex 
				INNER JOIN professor AS t3 ON t1.professorIndex = t3.professorIndex 
				INNER JOIN lectureReply AS t4 ON t1.lectureInfoIndex = t4.lectureInfoIndex
				WHERE t4.userIndex = ?
				ORDER BY t4.createdAt ASC LIMIT ${start}, ${count}`, [userIndex], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            for (let i = 0; i < rows.length; i++) {
                                const result = yield lectureReply_model_1.lectureReply.countGetLectureReplyByLectureInfoIndex(rows[i].lectureInfoIndex);
                                rows[i].replyCount = result[0].replyCount;
                            }
                            connection.release();
                            resolve(rows);
                        }
                    });
                });
            });
        });
    }
    /**
     * model: lectureInfo 업데이트
     * @param {number} lectureInfoIndex
     * @param lectureInfoData
     * @returns {Promise<void>}
     */
    updateLectureInfo(lectureInfoIndex, lectureInfoData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE lectureInfo SET ? WHERE lectureInfoIndex = ?`, [lectureInfoData,
                    lectureInfoIndex], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(lectureInfoData);
                    }
                });
            });
        });
    }
    /**
     * model: lectureInfo 평균 업데이트
     * @param {number} lectureInfoIndex
     * @param {number} average
     * @returns {Promise<void>}
     */
    updateLectureInfoAverage(lectureInfoIndex, average) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE lectureInfo SET average = ?, updatedAt = now() WHERE lectureInfoIndex = ?`, [average,
                    lectureInfoIndex], function (err, rows) {
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
     * model: lectureInfo 삭제
     * @param {number} lectureInfoIndex
     * @returns {Promise<void>}
     */
    deleteLectureInfo(lectureInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM lectureInfo WHERE lectureInfoIndex = ?', [lectureInfoIndex], function (err, rows) {
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
exports.LectureInfo = LectureInfo;
exports.lectureInfo = new LectureInfo();
//# sourceMappingURL=lectureInfo.model.js.map
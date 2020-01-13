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
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class User {
    constructor() {
    }
    /**
     * model: user 생성
     * @param userData
     */
    createUser(userData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO user SET ?`, [userData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(userData);
                    }
                });
            });
        });
    }
    /**
     * model: userLog 생성
     * @param userLogData
     */
    createUserLog(userLogData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO userLog SET ?`, [userLogData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(userLogData);
                    }
                });
            });
        });
    }
    /**
     * model: user 리스트 조회
     */
    listUser() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM user`, function (err, rows) {
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
     * model: user page 리스트 조회
     * @param page
     * @param count
     */
    pageListUser(page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT * FROM user ORDER BY userIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * model: user appId 리스트 조회
     */
    listUserByExistAppId() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM user WHERE appId IS NOT NULL`, function (err, rows) {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: user userId 조회
     * @param userId
     */
    getUser(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM user WHERE userId = ?`, [userId], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        if (rows == '') {
                            reject('The ID does not exist');
                        }
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: user userIndex 조회
     * @param userIndex
     */
    getUserByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM user WHERE userIndex = ?`, [userIndex], function (err, rows) {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: user userIndex 업데이트
     * @param userIndex
     * @param userData
     */
    updateUserByUserIndex(userIndex, userData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE user SET ? WHERE userIndex = ?`, [userData, userIndex], function (err, rows) {
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
     * model: user 업데이트
     * @param userId
     * @param userData
     */
    updateUser(userId, userData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE user SET ? WHERE userId = ?`, [userData, userId], function (err, rows) {
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
     * model: user 비밀번호 조회
     * @param userId
     * @param userPw
     */
    getUserPassword(userId, userPw) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * from user WHERE userId = ?`, [userId], function (err, rows) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            if (rows[0].userPw === (yield encryption_util_1.encriptionPw.getHash(userPw))) {
                                connection.release();
                                resolve(rows);
                            }
                            else {
                                connection.release();
                                return reject('The password is incorrect');
                            }
                        }
                    });
                });
            });
        });
    }
    /**
     * model: user 비밀번호 업데이트
     * @param userId
     * @param userPw
     */
    updateUserPassword(userId, userPw) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                userPw = encryption_util_1.encriptionPw.getHash(userPw);
                connection.query(`UPDATE user SET userPw=? WHERE userId=?`, [userPw, userId], function (err, rows) {
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
     * model: user 닉네임
     * @param userId
     * @param userNickName
     */
    updateUserNickName(userId, userNickName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE user SET userNickName = ? WHERE userId = ?`, [userNickName,
                    userId], function (err, rows) {
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
     * model : user userNickName 조회
     * @param userNickName
     */
    checkUserNickNameForUpdate(userNickName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM user WHERE userNickName = ?`, [userNickName], function (err, rows) {
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
     * model: user 삭제
     * @param userId
     */
    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`DELETE FROM user WHERE userId = ?`, [userId], function (err, rows) {
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
     * model: 인증여부 업데이트
     * @param userId
     */
    updateIsValidation(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE user set isValidation = '${1}' WHERE userId = ?`, [userId], (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: 인증기간 검증
     * @param uvUpdatedAt
     */
    isValidOnData(uvUpdatedAt) {
        uvUpdatedAt = JSON.stringify(uvUpdatedAt);
        uvUpdatedAt = uvUpdatedAt.split('"')[3];
        let uvDate = uvUpdatedAt.split('T')[0].split('-');
        let year = parseInt(uvDate[0]);
        let month = parseInt(uvDate[1]);
        let day = parseInt(uvDate[2]);
        let date = new Date();
        let curYear = date.getFullYear();
        let curMonth = date.getMonth() + 1;
        let curDay = date.getDate();
        let diffYear = curYear - year;
        let diffMonth = curMonth - month;
        let diffDay = curDay - day;
        if (diffYear == 1 && curMonth == 1 && curDay == 1) {
            return true;
        }
        if (diffYear == 0) {
            if (diffMonth == 1 && curDay == 1) {
                return true;
            }
            if (diffMonth == 0 && diffDay <= 1) {
                return true;
            }
        }
        return false;
    }
}
exports.User = User;
exports.user = new User();
//# sourceMappingURL=user.model.js.map
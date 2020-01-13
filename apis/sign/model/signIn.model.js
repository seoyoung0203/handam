"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const jwt_util_1 = require("../../../packages/utils/jwt.util");
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class SignIn {
    /**
     * model: 로그인
     * @param userData
     * @returns {Promise<any>}
     */
    getUser(userData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * from user WHERE userId = ?`, [userData.userId], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        let err = 'The ID does not exist';
                        if (rows.length === 0) {
                            connection.release();
                            return reject(err);
                        }
                        else {
                            if (rows[0].userPw === encryption_util_1.encriptionPw.getHash(userData.userPw)) {
                                connection.release();
                                jwt.sign({
                                    tokenIndex: rows[0].userIndex,
                                    tokenId: rows[0].userId,
                                    tokenNickname: rows[0].userNickName,
                                    tokenMajor: rows[0].major,
                                    tokenMinor: rows[0].minor,
                                    tokenDoubleMajor: rows[0].doubleMajor,
                                    tokenConnectedMajor: rows[0].connectedMajor,
                                    tokenAdmissionYear: rows[0].year,
                                    tokenInValidation: rows[0].isValidation,
                                    tokenAvatar: rows[0].avatar,
                                    tokenStatus: rows[0].status
                                }, jwt_util_1.jwtToken.secret, { algorithm: jwt_util_1.jwtToken.algorithm }, (err, token) => {
                                    if (err) {
                                        return reject('The jwt is incorrect');
                                    }
                                    delete rows[0].userPw;
                                    rows[0].token = token;
                                    resolve(rows[0]);
                                });
                            }
                            else {
                                connection.release();
                                return reject('The password is incorrect');
                            }
                        }
                    }
                });
            });
        });
    }
}
exports.signIn = new SignIn();
//# sourceMappingURL=signIn.model.js.map
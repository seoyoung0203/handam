"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class SignUp {
    constructor() {
    }
    /**
     * model: 회원가입
     * @param userData
     * @returns {Promise<any>}
     */
    createUser(userData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO user SET ?`, [userData], function (err, rows) {
                    if (err) {
                        connection.release();
                        return reject(err);
                    }
                    else {
                        connection.release();
                        return resolve(rows);
                    }
                });
            });
        });
    }
}
exports.SignUp = SignUp;
exports.signUp = new SignUp();
//# sourceMappingURL=signUp.model.js.map
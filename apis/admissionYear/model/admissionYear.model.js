"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class AdmissionYear {
    /**
     * model: admissionYear 조회
     * @returns {Promise<void>}
     */
    listAdmissionYear() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM admissionYear', function (err, rows) {
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
exports.AdmissionYear = AdmissionYear;
exports.admissionYear = new AdmissionYear();
//# sourceMappingURL=admissionYear.model.js.map
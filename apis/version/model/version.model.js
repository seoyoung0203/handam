"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class Version {
    /**
     * model: version 생성
     * @param versionData
     * @returns {Promise<void>}
     */
    createVersion(versionData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO version SET ?', [versionData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(versionData);
                    }
                });
            });
        });
    }
    /**
     * model: version 리스트 조회
     * @returns {Promise<void>}
     */
    getVersion() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM version', function (err, rows) {
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
    /** model : version 업데이트
     * @returns {Promise<void>}
     */
    updateVersion(versionIndex, versionDate) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('UPDATE version SET ? where versionIndex = ?', [versionDate,
                    versionIndex], function (err, rows) {
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
     * model: version 삭제
     * @param {number} versionIndex
     * @returns {Promise<void>}
     */
    deleteVersion(versionIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM version WHERE versionIndex = ?', [versionIndex], function (err, rows) {
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
exports.Version = Version;
exports.version = new Version();
//# sourceMappingURL=version.model.js.map
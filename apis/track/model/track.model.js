"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class Track {
    /**
     * model: track 생성
     * @param trackData
     * @returns {Promise<void>}
     */
    createTrack(trackData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('INSERT INTO track SET ?', [trackData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(trackData);
                    }
                });
            });
        });
    }
    /**
     * model: track 리스트 조회
     * @returns {Promise<void>}
     */
    listTrack() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM track', function (err, rows) {
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
     * model: track page 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListTrack(page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (page && count) {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    connection.query(`SELECT * FROM track ORDER BY trackName ASC LIMIT ${start}, ${count}`, function (err, rows) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(rows);
                        }
                    });
                }
                else {
                    connection.query(`SELECT * FROM track ORDER BY trackName`, function (err, rows) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(rows);
                        }
                    });
                }
            });
        });
    }
    /**
     * model: track 삭제
     * @param {string} trackName
     * @returns {Promise<void>}
     */
    deleteTrack(trackName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query('DELETE FROM track WHERE trackName = ?', [trackName], function (err, rows) {
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
exports.Track = Track;
exports.track = new Track();
//# sourceMappingURL=track.model.js.map
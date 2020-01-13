"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class Notice {
    /**
     * model: Notice 생성
     * @param noticeData
     * @returns {Promise<void>}
     */
    createNotice(noticeData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO notice SET ?`, [noticeData], (err) => {
                    connection.release();
                    err ? reject(err) : resolve(noticeData);
                });
            });
        });
    }
    /**
     * model: notice 리스트 조회
     * @returns {Promise<void>}
     */
    listNotice() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM notice`, (err, rows) => {
                    connection.release();
                    err ? reject(err) : resolve(rows);
                });
            });
        });
    }
    /**
     * model: notice 이미지 리스트 조회
     * @returns {Promise<void>}
     */
    listNoticeImg() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT noticeImg FROM notice`, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        let imgRows = rows.map(function (row) {
                            return row.noticeImg;
                        });
                        resolve(imgRows);
                    }
                });
            });
        });
    }
}
exports.Notice = Notice;
exports.notice = new Notice();
//# sourceMappingURL=notice.model.js.map
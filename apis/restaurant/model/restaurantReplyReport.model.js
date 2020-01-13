"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class RestaurantReplyReport {
    /**
     * model: restaurantReplyReport 생성
     * @param : restaurantReplyReportData
     * @returns { Promise<any>}
     */
    createRestaurantReplyReport(restaurantReplyReportData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurantReplyReport SET ?`, [restaurantReplyReportData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantReplyReportData);
                    }
                });
            });
        });
    }
    /**
     *
     * model : RestaurantReplyReport 중복 신고 확인
     * @param : { number } restaurantReplyIndex
     * @param : { number } userIndex
     * @returns {Promise<any>}
     */
    checkRestaurantReplyReport(restaurantReplyIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantReplyReport WHERE restaurantReplyIndex=? AND userIndex = ?`, [restaurantReplyIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model : restaurantReplyIndex 신고 횟수 조회
     * @param : {number} restaurantReplyIndex
     * @returns {Promise<any>}
     */
    getRestaurantReplyReport(restaurantReplyIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT restaurantReplyIndex, count(*) as reportCount
                    from restaurantReplyReport WHERE restaurantReplyIndex = ? group by restaurantReplyIndex`, [restaurantReplyIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model : RestaurantReplyReport 모든 신고 리스트 조회
     * @returns {Promise <any>>}
     */
    listRestaurantReplyReport() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM restaurantReplyReport`, (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model : RestaurantReplyReport By User 특정 유저의 댓글 신고 리스트 조회
     * @params : {number} userIndex
     * @returns {Promise<any>}
     */
    getRestaurantReplyReportByUserIndex(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM restaurantReplyReport WHERE userIndex=?`, [userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model : restaurantReplyReport 업데이트
     * @param : {number} restaurantReplyReportIndex
     * @param : {any}    restaurantReplyReportData
     */
    updateRestaurantReplyReport(restaurantReplyReportIndex, restaurantReplyReportData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE restaurantReplyReport SET ? WHERE restaurantReplyReportIndex = ?`, [restaurantReplyReportData, restaurantReplyReportIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model : restaurantReplyReport 삭제 (신고 철회)
     * @param : {number} restaurantReplyIndex
     * @param : {number} userIndex
     * @returns {Promise<any>}
     */
    deleteRestaurantReplyReport(restaurantReplyIndex, userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurantReplyReport WHERE restaurantReplyIndex=? AND userIndex=?`, [restaurantReplyIndex, userIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
}
exports.RestaurantReplyReport = RestaurantReplyReport;
exports.restaurantReplyReport = new RestaurantReplyReport();
//# sourceMappingURL=restaurantReplyReport.model.js.map
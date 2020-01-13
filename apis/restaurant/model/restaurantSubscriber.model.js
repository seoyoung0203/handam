"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const { pool } = mysql_util_1.mysqlUtil;
class RestaurantSubscriber {
    /**
     * model: restaurantSubscriber 생성
     * @param restaurnatSubscriberData
     * return : {Promise<any>}
     */
    createRestaurantSubscriber(restaurantSubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurantSubscriber SET ?`, [restaurantSubscriberData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantSubscriberData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurantSubscriber 조회
     * @param {number} userIndex
     * @param {number} restaurantIndex
     * return : {Promise<any>}
     */
    getRestaurantSubscriber(userIndex, restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantSubscriber WHERE userIndex=? AND restaurantIndex=?`, [userIndex, restaurantIndex], (err, data) => {
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
     * model: restaurantSubscriber 음식점별 good 갯수 합 조회
     * @param {number} restaurantIndex
     * return : {Promise<any>}
     */
    getRestaurantSubscriberSumCount(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT SUM(isGood) as goodCount FROM restaurantSubscriber WHERE restaurantIndex=?`, [restaurantIndex], (err, data) => {
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
     * model: restaurantSubscriber 업데이트
     * @param {number} userIndex
     * @param {number} restaurantIndex
     * @param restaurnatSubscriberData
     * return : {Promise<any>}
     */
    updateRestaurantSubscriber(userIndex, restaurantIndex, restaurantSubscriberData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE restaurantSubscriber SET ? WHERE userIndex=? AND restaurantIndex=?`, [restaurantSubscriberData, userIndex, restaurantIndex], (err, data) => {
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
     * model: restaurantSubscriber 삭제
     * @param {number} userIndex
     * @param {number} restaurantIndex
     * return : {Promise<any>}
     */
    deleteRestaurantSubscriber(userIndex, restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurantSubscriber WHERE userIndex=? AND restaurantIndex=?`, [userIndex, restaurantIndex], (err, data) => {
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
exports.RestaurantSubscriber = RestaurantSubscriber;
exports.restaurantSubscriber = new RestaurantSubscriber();
//# sourceMappingURL=restaurantSubscriber.model.js.map
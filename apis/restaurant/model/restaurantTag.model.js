"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const { pool } = mysql_util_1.mysqlUtil;
class RestaurantTag {
    /**
     * model: restaurantTag 생성
     * @param : restaurantTagData
     * @returns {Promise<any>}
     */
    createRestaurantTag(restaurantTagData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurantTag SET ?`, [restaurantTagData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantTagData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurantIndex 에 따른 restaurantTag 조회
     * @param: {number} restaurantIndex
     * @returns {Promise<any>}
     */
    getRestaurantTag(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT tag FROM restaurantTag WHERE restaurantIndex=?`, [restaurantIndex], (err, data) => {
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
     * model: Tag 에 따른 restaurantTag 조회
     * @param: {string} tag
     * @returns {Promise<any>}
     */
    getRestaurantTagByTag(tag) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM restaurantTag WHERE tag=?`, [tag], (err, data) => {
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
     * model: restaurantTag 삭제
     * @param {number} restaurantTagIndex
     * @returns {Promise<any>}
     */
    deleteRestaurantTag(restaurantTagIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurantTag WHERE restaurantTagIndex=?`, [restaurantTagIndex], (err, data) => {
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
exports.RestaurantTag = RestaurantTag;
exports.restaurantTag = new RestaurantTag();
//# sourceMappingURL=restaurantTag.model.js.map
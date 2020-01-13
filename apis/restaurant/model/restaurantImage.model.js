"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const { pool } = mysql_util_1.mysqlUtil;
class RestaurantImage {
    /**
     * model: restaurantImage 생성
     * @param : restaurantImageData
     * @returns {Promise<any>}
     */
    createRestaurantImage(restaurantImageData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurantImage SET ?`, [restaurantImageData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantImageData);
                    }
                });
            });
        });
    }
    /**
     * model: 모든 restaurantImage 조회
     * @param : void
     * @returns {Promise<any>}
     */
    listRestaurantImage() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantImage`, (err, data) => {
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
     * model: restaurantIndex에 따른 restaurantImage 조회
     * @param: {number} restaurantIndex
     * @returns {Promise<any>}
     */
    listRestaurantImagesByRestaurantIndex(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantImage WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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
     * model: restaurantImage 조회
     * @param : {number} restaurantImageIndex
     * @returns {Promise<any>}
     */
    getRestaurantImage(restaurantImageIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM restaurantImage where restaurantImageIndex=?`, [restaurantImageIndex], (err, data) => {
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
     * model: restaurantImage 업데이트
     * @param : {number} restaurantImageIndex
     * @param : {any} restaurantImageData
     * @returns {Promise<any>}
     */
    updateRestaurantImage(restaurantImageIndex, restaurantImageData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE restaurantImage SET ? where restaurantImageIndex=?`, [restaurantImageData,
                    restaurantImageIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantImageData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurantImage 업데이트
     * @param : {number} restaurantImageIndex
     * @returns {Promise<any>}
     */
    deleteRestaurantImage(restaurantImageIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurantImage where restaurantImageIndex=?`, [restaurantImageIndex], (err, data) => {
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
exports.RestaurantImage = RestaurantImage;
exports.restaurantImage = new RestaurantImage();
//# sourceMappingURL=restaurantImage.model.js.map
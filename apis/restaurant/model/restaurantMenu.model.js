"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class RestaurantMenu {
    /**
     * model: restaurantMenu 생성
     * @param : restaurantMenuData
     * @returns {Promise<any>}
     */
    createRestaurantMenu(restaurantMenuData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurantMenu SET ?`, [restaurantMenuData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantMenuData);
                    }
                });
            });
        });
    }
    /**
     * model: 모든 restaurantMenu 조회
     * @param: void
     * @returns {Promise<any>}
     */
    listRestaurantMenus() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantMenu`, (err, data) => {
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
     * model: restaurantIndex 에 따른 restaurantMenu 리스트 조회
     * @param: void
     * @returns {Promise<any>}
     */
    listRestaurantMenusByRestaurantIndex(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM restaurantMenu WHERE restaurantIndex = ? ORDER BY priority ASC`, [restaurantIndex], (err, data) => {
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
     * model: restaurantIndex 에 따른 restaurantMenu 조회
     * @param: {number} restaurantMenuIndex
     * @returns {Promise<any>}
     */
    getRestaurantMenu(restaurantMenuIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurantMenu WHERE restaurantMenuIndex = ?`, [restaurantMenuIndex], (err, data) => {
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
     * model: restaurantIndex 에 따른 Priority restaurantMenu 조회
     * @param: {number} restaurantIndex
     * @returns {Promise<any>}
     */
    getRestaurantPriorityMenus(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT name from restaurantMenu 
				WHERE restaurantIndex=? AND priority IS NOT NULL
				ORDER BY priority ASC`, [restaurantIndex], (err, data) => {
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
     * model: restaurantMenu 업데이트
     * @param {number} restaurantMenuIndex
     * @param restaurantMenuData
     * @returns {Promise<any>}
     */
    updateRestaurantMenu(restaurantMenuIndex, restaurantMenuData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE restaurantMenu SET ? WHERE restaurantMenuIndex = ?`, [restaurantMenuData,
                    restaurantMenuIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantMenuData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurantMenu 삭제
     * @param {number} restaurantMenuIndex
     * @returns {Promise<any>}
     */
    deleteRestaurantMenu(restaurantMenuIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurantMenu WHERE restaurantMenuIndex = ?`, [restaurantMenuIndex], (err, data) => {
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
exports.RestaurantMenu = RestaurantMenu;
exports.restaurantMenu = new RestaurantMenu();
//# sourceMappingURL=restaurantMenu.model.js.map
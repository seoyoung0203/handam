"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class Restaurant {
    /**
     * model: restaurant 필터
     * @param filter
     */
    filterRestaurant(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                filter = filter.replace(/ eq /gi, ' = ');
                filter = filter.replace(/ and /gi, ' AND ');
                filter = filter.replace(/ or /gi, ' OR ');
                filter = filter.replace(/ gt /gi, ' > ');
                filter = filter.replace(/ ge /gi, ' >= ');
                filter = filter.replace(/ lt /gi, ' < ');
                filter = filter.replace(/ le /gi, ' <= ');
                filter = filter.replace(/ is /gi, ' IS ');
                filter = filter.replace(/ like /gi, ' LIKE ');
                filter = `AND ` + filter;
                let filterArray = filter.split(' ');
                for (let i = 0; i < filterArray.length; i++) {
                    /** 포스트 키에 맞도록 커스터마이징 */
                    if (filterArray[i] === `restaurantCategoryIndex`) {
                        filterArray[i] = `t1.restaurantCategoryIndex`;
                    }
                    /** 필터 각 요소 정리 */
                    if (filterArray[i].indexOf('\'') != -1) {
                        for (let x = 0; x < 2; x++) {
                            filterArray[i] = filterArray[i].replace('\'', '');
                        }
                    }
                    else if (isNaN(filterArray[i]) === false) {
                        filterArray[i] = parseInt(filterArray[i]);
                    }
                    else {
                        filterArray[i] = filterArray[i];
                    }
                    /** 포스트 값에 맞도록 커스터마이징 */
                    if (filterArray[i] === ('=') || filterArray[i] === ('>=') || filterArray[i] === ('>') || filterArray[i] === ('<=') || filterArray[i] === ('<')) {
                        if (filterArray[i + 1] == 'true' || filterArray[i + 1] == 'false') {
                            filterArray[i + 1] = `${filterArray[i + 1]}`;
                        }
                        else {
                            filterArray[i + 1] = `"${filterArray[i + 1]}"`;
                        }
                    }
                    if (filterArray[i] === ('LIKE')) {
                        filterArray[i - 1] = `REPLACE(${filterArray[i - 1]}, ' ', '')`;
                        filterArray[i + 1] = `"%${filterArray[i + 1]}%"`;
                    }
                }
                /** 포스트 SQL 문으로 정리 */
                let filterString = filterArray.join(' ');
                filterString = filterString + ' ';
                return filterString;
            }
            catch (err) {
                throw new Error('Restaurant filter does not exist');
            }
        });
    }
    /**
     * model: restaurant 정렬
     * @param orderBy
     */
    orderByRestaurant(orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < orderBy.length; i++) {
                    orderBy = orderBy.replace(' ', ':');
                }
                let orderByObj = {};
                let resultArray = orderBy.split(':');
                orderByObj[resultArray[0]] = resultArray[1];
                return orderByObj;
            }
            catch (err) {
                throw new Error('Restaurant orderBy does not exist');
            }
        });
    }
    /**
     * model: restaurant 생성
     * @param: restaurantData
     * @returns {Promise<any>}
     */
    createRestaurant(restaurantData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO restaurant SET ?`, [restaurantData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurant 리스트 조회
     * @param filter
     */
    listRestaurant(filter) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT
			t1.restaurantIndex,
			t1.restaurantCategoryIndex,
		  t1.name,
			t1.locationUrl,
			t1.tel,
			t1.openingHours,
			t1.review,
			t1.status,
			t1.goodCount,
			t1.createdAt,
			t2.restaurantCategoryName
			FROM restaurant AS t1
			INNER JOIN restaurantCategory AS t2 ON t1.restaurantCategoryIndex = t2.restaurantCategoryIndex
			WHERE t1.restaurantIndex IS NOT NULL AND t1.status = 'ACTIVE'
			`;
            if (filter) {
                const resultFilter = yield this.filterRestaurant(filter);
                sql = sql + resultFilter;
            }
            pool.getConnection((err, connection) => {
                connection.query(sql, (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }));
    }
    /**
     * model: restaurant page 리스트 조회
     * @param filter
     * @param orderBy
     * @param page
     * @param count
     */
    pageListRestaurant(filter, orderBy, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sortType;
            let start = (page - 1) * count;
            if (start < 0) {
                start = 0;
            }
            let sql = `SELECT
			t1.restaurantIndex,
			t1.restaurantCategoryIndex,
		    t1.name,
			t1.locationUrl,
			t1.tel,
			t1.openingHours,
			t1.review,
			t1.goodCount,
			t1.status,
			t1.createdAt,
			t2.restaurantCategoryName,
			(SELECT COUNT(*) AS count FROM restaurantReply WHERE t1.restaurantIndex = restaurantReply.restaurantIndex) 
				restaurantReplyCount
			FROM restaurant AS t1
			INNER JOIN restaurantCategory AS t2 ON t1.restaurantCategoryIndex = t2.restaurantCategoryIndex
			WHERE t1.restaurantIndex IS NOT NULL AND t1.status = 'ACTIVE'
			`;
            if (filter) {
                const resultFilter = yield this.filterRestaurant(filter);
                sql = sql + resultFilter;
            }
            if (orderBy) {
                const orderByObj = yield this.orderByRestaurant(orderBy);
                if (orderByObj.hasOwnProperty('createdAt')) {
                    sortType = orderByObj.createdAt;
                    sql = sql + `ORDER BY t1.createdAt ${sortType} `;
                }
                if (orderByObj.hasOwnProperty('updatedAt')) {
                    sortType = orderByObj.updatedAt;
                    sql = sql + `ORDER BY t1.updatedAt ${sortType} `;
                }
                if (orderByObj.hasOwnProperty('name')) {
                    sortType = orderByObj.name;
                    sql = sql + `ORDER BY t1.name ${sortType} `;
                }
            }
            else {
                sql = sql + `ORDER BY t1.createdAt DESC `;
            }
            sql = sql + `LIMIT ${start}, ${count}`;
            pool.getConnection((err, connection) => {
                connection.query(sql, (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }));
    }
    /**
     * model: restaurant 조회
     * @param: {number} restaurantIndex
     * @returns {Promise<any>}
     */
    getRestaurant(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
				t1.restaurantIndex,
				t1.restaurantCategoryIndex,
				t1.name,
				t1.address,
				t1.locationUrl,
				t1.tel,
				t1.openingHours,
				t1.review,
				t1.goodCount,
				t1.createdAt,
				t1.updatedAt,
				t2.restaurantCategoryName
				FROM restaurant AS t1
				INNER JOIN restaurantCategory AS t2 ON t2.restaurantCategoryIndex = t1.restaurantCategoryIndex
				WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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
    getRestaurantByName(name) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * from restaurant WHERE name = ?`, [name], (err, data) => {
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
     * model: restaurant 업데이트
     * @param {number} restaurantIndex
     * @param {any} restaurantData
     * @returns {Promise<any>}
     */
    updateRestaurant(restaurantIndex, restaurantData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE restaurant SET ? WHERE restaurantIndex = ?`, [restaurantData,
                    restaurantIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantData);
                    }
                });
            });
        });
    }
    /**
     * model: restaurant 삭제
     * @param {number} restaurantIndex
     * @returns {Promise<any>}
     */
    deleteRestaurant(restaurantIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM restaurant WHERE restaurantIndex = ?`, [restaurantIndex], (err, data) => {
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
exports.Restaurant = Restaurant;
exports.restaurant = new Restaurant();
//# sourceMappingURL=restaurant.model.js.map
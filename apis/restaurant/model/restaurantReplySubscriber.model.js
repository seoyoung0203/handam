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
const { pool } = mysql_util_1.mysqlUtil;
class RestaurantReplySubscriber {
    /**
     * model: restaurantReplySubscriber 생성
     * @param  restaurantReplySubscriberData
     * return: {Promise<any>}
     */
    createRestaurantReplySubscriber(restaurantReplySubscriberData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`INSERT INTO restaurantReplySubscriber SET ?`, [restaurantReplySubscriberData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(restaurantReplySubscriberData);
                    }
                });
            }));
        }));
    }
    /**
     * model: restaurantReplySubscriber 조회
     * @param {number} userIndex
     * @param {number} restaurantReplyIndex
     * return : {Promise<any>}
     */
    getRestaurantReplySubscriber(userIndex, restaurantReplyIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`SELECT * from restaurantReplySubscriber WHERE userIndex=? AND restaurantReplyIndex=?`, [userIndex, restaurantReplyIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }));
    }
    /**
     * model: restaurantReplySubscriber 댓글 별 good 갯수 합 조회
     * @param {number} restaurantReplyIndex
     * return: {Promise<any>}
     */
    getRestaurantReplySubscriberSumCount(restaurantReplyIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`SELECT SUM(isGood) as goodCount FROM restaurantReplySubscriber WHERE restaurantReplyIndex=?`, [restaurantReplyIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }));
    }
    /**
     * model: restaurantReplySubscriber 업데이트
     * @param {number} userIndex
     * @param {number} restaurantReplyIndex
     * @param  restaurantReplySubscriberData
     * return: {Promise<any>}
     */
    updateRestaurantReplySubscriber(userIndex, restaurantReplyIndex, restaurantReplySubscriberData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`UPDATE restaurantReplySubscriber SET ? WHERE userIndex=? AND restaurantReplyIndex=?`, [restaurantReplySubscriberData, userIndex, restaurantReplyIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }));
    }
    /**
     * model: restaurantReplySubscriber 삭제
     * @param {number} userIndex
     * @param {number} restaurantReplyIndex
     * return : {Promise<any>}
     */
    deleteRestaurantReplySubscriber(userIndex, restaurantReplyIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`DELETE FROM restaurantReplySubscriber WHERE userIndex=? AND restaurantReplyIndex=?`, [userIndex, restaurantReplyIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            }));
        }));
    }
}
exports.RestaurantReplySubscriber = RestaurantReplySubscriber;
exports.restaurantReplySubscriber = new RestaurantReplySubscriber();
//# sourceMappingURL=restaurantReplySubscriber.model.js.map
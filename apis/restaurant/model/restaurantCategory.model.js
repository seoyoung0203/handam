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
class RestaurantCategory {
    /**
     * model: restaurantCategory 리스트 조회
     */
    listRestaurantCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    connection.query(`SELECT * from restaurantCategory ORDER BY restaurantCategory.order ASC`, (err, data) => {
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
        });
    }
}
exports.RestaurantCategory = RestaurantCategory;
exports.restaurantCategory = new RestaurantCategory();
//# sourceMappingURL=restaurantCategory.model.js.map
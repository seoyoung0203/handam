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
// const pool = mysqlUtil.pool.promise();
const pool = mysql_util_1.mysqlUtil.pool;
class TestModel {
    /**
     * model: Test 생성
     * @param testData
     * @returns {Promise<any>}
     */
    createTest(testData) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield pool.getConnection();
            try {
                const [rows] = yield connection.query(`INSERT INTO test set ?`, [testData]);
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
    /**
     * model: Test 조회
     * @returns {Promise<any>}
     */
    getTest() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield pool.getConnection();
            try {
                const [rows] = yield connection.query(`SELECT * from test`);
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
    /**
     * model: Test 업데이트
     * @param updateTestData
     * @param {number} testIndex
     * @returns {Promise<any>}
     */
    updateTest(updateTestData, testIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield pool.getConnection();
            try {
                const [rows] = yield connection.query(`UPDATE test set ? where testIndex = ?`, [updateTestData, testIndex]);
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
    /**
     * model: Test 삭제
     * @param {number} testIndex
     * @returns {Promise<any>}
     */
    deleteTest(testIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield pool.getConnection();
            try {
                const [rows] = yield connection.query(`DELETE from test where testIndex = ?`, [testIndex]);
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.test = new TestModel();
//# sourceMappingURL=test.model.js.map
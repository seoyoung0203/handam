"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class Professor {
    constructor() {
    }
    /**
     * model: professor 생성
     * @param professorData
     * @returns {Promise<any>}
     */
    createProfessor(professorData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`INSERT INTO professor SET ?`, [professorData], function (err) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(professorData);
                    }
                });
            });
        });
    }
    /**
     * model: professor 리스트 조회
     * @returns {Promise<any>}
     */
    listProfessor() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM professor`, function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: professor professorIndex 조회
     * @param {number} professorIndex
     * @returns {Promise<any>}
     */
    getProfessorByProfessorIndex(professorIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM professor WHERE professorIndex = ?`, [professorIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: professor professorName 조회
     * @param {string} professorName
     * @returns {Promise<any>}
     */
    getProfessorByProfessorName(professorName) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`SELECT * FROM professor WHERE professorName LIKE ?`, [`%${professorName}%`], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: professor 업데이트
     * @param {number} professorIndex
     * @param professorData
     * @returns {Promise<any>}
     */
    updateProfessor(professorIndex, professorData) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`UPDATE professor SET ? WHERE professorIndex = ?`, [professorData,
                    professorIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: professor 삭제
     * @param {number} professorIndex
     * @returns {Promise<any>}
     */
    deleteProfessor(professorIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                connection.query(`DELETE FROM professor WHERE professorIndex = ?`, [professorIndex], function (err, rows) {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(rows);
                    }
                });
            });
        });
    }
}
exports.Professor = Professor;
exports.professor = new Professor();
//# sourceMappingURL=professor.model.js.map
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
class ProfessorInfo {
    constructor() {
    }
    /**
     * model: professorInfo 필터
     * @param filter
     */
    filterProfessorInfo(filter) {
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
                /** 교수평가 키에 맞도록 커스터마이징 */
                for (let i = 0; i < filterArray.length; i++) {
                    if (filterArray[i] === `professorName`) {
                        filterArray[i] = `t2.professorName`;
                    }
                    else if (filterArray[i] === `department`) {
                        filterArray[i] = `t2.department`;
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
                        filterArray[i + 1] = `"%${filterArray[i + 1]}%"`;
                    }
                }
                /** 포스트 SQL 문으로 정리 */
                let filterString = filterArray.join(' ');
                filterString = filterString + ' ';
                return filterString;
            }
            catch (err) {
                throw new Error('ProfessorInfo filter does not exist');
            }
        });
    }
    /**
     * model: professorInfo 정렬
     * @param orderBy
     */
    orderByProfessorInfo(orderBy) {
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
                throw new Error('ProfessorInfo orderBy does not exist');
            }
        });
    }
    /**
     * model: professorInfo 생성
     * @param professorInfoData
     * @returns {Promise<IProfessorInfo>}
     */
    createProfessorInfo(professorInfoData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO professorInfo SET ?`, [professorInfoData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(professorInfoData);
                    }
                });
            });
        });
    }
    /**
     * model: professorInfo 리스트 조회
     * @return {Promise <IProfessorInfo>}
     */
    listProfessorInfo(filter) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT 
                    t1.avgLecturePower,
                    t1.avgHomework,
                    t1.avgElasticity,
                    t1.avgCommunication,
                    t1.avgGrade,
                    t2.professorName,
                    t2.department,
                    (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore        
                    FROM professorInfo as t1
                    INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex;`;
            if (filter) {
                const resultFilter = yield this.filterProfessorInfo(filter);
                sql = sql + resultFilter;
            }
            pool.getConnection((err, connection) => {
                connection.query(sql, (err, data) => {
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.release();
                        resolve(data);
                    }
                });
            });
        }));
    }
    /**
     *  model: professorInfo  page 리스트 조회
     *  @param: {number} page
     *  @param: {number} count
     *  @returns {Promise<Array<IProfessorInfo>>>}
     */
    pageListProfessorInfo(page, count = 6, filter, orderBy) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let sortType;
            let start = (page - 1) * count;
            if (start < 0) {
                start = 0;
            }
            let sql = `SELECT
				t1.professorIndex,
             	t1.professorInfoIndex,
                t1.avgLecturePower,
                t1.avgHomework,
                t1.avgElasticity,
                t1.avgCommunication,
                t1.avgGrade,
                t2.professorName,
                t2.department,
                (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore,
                (SELECT COUNT(*) AS count FROM professorReply WHERE t1.professorInfoIndex = professorReply.professorInfoIndex) AS professorInfoReplyCount
                FROM professorInfo AS t1
                INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex WHERE t1.professorIndex IS NOT NULL `;
            if (filter) {
                const resultFilter = yield this.filterProfessorInfo(filter);
                sql = sql + resultFilter;
            }
            if (orderBy) {
                const orderByObj = yield this.orderByProfessorInfo(orderBy);
                if (orderByObj.hasOwnProperty('createdAt')) {
                    sortType = orderByObj.createdAt;
                    sql = sql + ` ORDER BY t1.createdAt ${sortType}`;
                }
                if (orderByObj.hasOwnProperty('updatedAt')) {
                    sortType = orderByObj.updatedAt;
                    sql = sql + ` ORDER BY t1.updatedAt ${sortType} `;
                }
                if (orderByObj.hasOwnProperty('goodCount')) {
                    sortType = orderByObj.goodCount;
                    sql = sql + ` ORDER BY t1.goodCount ${sortType} `;
                }
                if (orderByObj.hasOwnProperty('badCount')) {
                    sortType = orderByObj.badCount;
                    sql = sql + ` ORDER BY t1.badCount ${sortType} `;
                }
            }
            else {
                sql = sql + ` ORDER BY t1.updatedAt DESC `;
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
     * model: professorInfo 조회
     * @params {number} professorIndex
     * @returns { Promise<any> }
     */
    getProfessorInfo(professorIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
                  t1.professorInfoIndex,
                  t1.avgLecturePower,
                  t1.avgHomework,
                  t1.avgElasticity,
                  t1.avgCommunication,
                  t1.avgGrade,
                  t1.goodCount,
                  t1.badCount,
                  (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore,
                  t2.professorName,
                  t2.department,
                  t2.address,
                  t2.tel,
                  t2.email,
                  (SELECT COUNT(*) FROM professorReply WHERE t1.professorInfoIndex = professorReply.professorInfoIndex) AS ProfessorReplyCount
                  FROM professorInfo AS t1
                  INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex
                  WHERE t1.professorIndex = ?`, [professorIndex], (err, data) => {
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
     *  model : professorInfo 업데이트
     *  @param{number} professorInfoIndex
     *  @param professorInfoData
     *  @returns {Promise<IProfessorInfo>}
     */
    updateProfessorInfo(professorInfoIndex, professorInfoData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE professorInfo SET ? WHERE professorInfoIndex = ?`, [professorInfoData, professorInfoIndex], (err, data) => {
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
     * model: professorInfo 삭제
     * @param {number} professorInfoIndex
     * @returns {Promise<IProfessorInfo>}
     */
    deleteProfessorInfo(professorInfoIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM professorInfo WHERE professorInfoIndex = ?`, [professorInfoIndex], (err, data) => {
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
exports.ProfessorInfo = ProfessorInfo;
exports.professorInfo = new ProfessorInfo();
//# sourceMappingURL=professorInfo.model.js.map
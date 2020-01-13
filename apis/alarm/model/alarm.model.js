"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class AlarmModel {
    /**
     * model: alarm 생성
     * @param alarmData
     */
    createAlarm(alarmData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO alarm SET ?`, [alarmData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(alarmData);
                    }
                });
            });
        });
    }
    /**
     * model: alarm 리스트 조회
     * @param userIndex
     */
    listAlarm(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt,
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        ORDER BY t1.createdAt DESC`, [userIndex], (err, data) => {
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
     * model: alarm page 리스트 조회
     * @param userIndex
     * @param page
     * @param count
     */
    pageListAlarm(userIndex, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt,
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        ORDER BY t1.createdAt DESC LIMIT ${start}, ${count}`, [userIndex], (err, data) => {
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
     * model: alarm isRead 리스트 조회
     * @param userIndex
     * @param isRead
     */
    listAlarmByIsRead(userIndex, isRead) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        AND t1.isRead = ${isRead}
        ORDER BY t1.createdAt DESC`, [userIndex], (err, data) => {
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
    pageListAlarmByIsRead(userIndex, isRead, page, count) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let start = (page - 1) * count;
                if (start < 0) {
                    start = 0;
                }
                connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.userIndex = ?
        AND t1.isRead = ${isRead}
        ORDER BY t1.createdAt DESC LIMIT ${start}, ${count}`, [userIndex], (err, data) => {
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
     * model: alarm 조회
     * @param alarmIndex
     */
    getAlarm(alarmIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
				t1.alarmIndex, 
				t1.category,
				t1.data,
				t1.status,
				t1.isRead,
				t1.readAt, 
				t2.userNickName
				FROM alarm AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.alarmIndex = ?
        `, [alarmIndex], (err, data) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else if (data[0] == null) {
                        reject('This alarm does not exist');
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    /**
     * model: alarm 업데이트
     * @param alarmIndex
     * @param alarmData
     */
    updateAlarm(alarmIndex, alarmData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE alarm SET ? WHERE alarmIndex = ?`, [alarmData, alarmIndex], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(alarmData);
                    }
                });
            });
        });
    }
    /**
     * model: alarm 삭제
     * @param alarmIndex
     */
    deleteAlarm(alarmIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM alarm WHERE alarmIndex = ?`, [alarmIndex], (err, data) => {
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
exports.AlarmModel = AlarmModel;
exports.alarm = new AlarmModel();
//# sourceMappingURL=alarm.model.js.map
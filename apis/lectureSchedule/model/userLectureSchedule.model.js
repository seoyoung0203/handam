"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class UserLectureSchedule {
    constructor() {
    }
    /**
     * model : userLectureSchedule 생성
     * @param userLectureScheduleData
     */
    createUserLectureSchedule(userLectureScheduleData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`INSERT INTO userLectureSchedule SET ?`, [userLectureScheduleData], (err) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(userLectureScheduleData);
                    }
                });
            });
        });
    }
    /**
     * model: userLectureSchedule 조회
     * @param userLectureScheduleIndex
     */
    getUserLectureSchedule(userIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT 
                t1.userLectureScheduleIndex,
                t1.grade,
                t2.lectureSemesterKey,
                t2.lectureTrackKey,
                t2.lectureTypeKey,
                t2.code,
                t2.location,
                t2.dayNight,
                t3.userNickName
                FROM userLectureSchedule as t1 
                INNER JOIN lectureSchedule as t2 ON t1.lectureScheduleIndex = t2.lectureScheduleIndex 
                INNER JOIN user as t3 ON t1.userIndex = t3.userIndex 
                WHERE t1.userIndex = ?`, [userIndex], (err, data) => {
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
     * model : userLectureSchedule 수정
     * @param userLectureScheduleIndex
     * @param userLectureScheduleData
     */
    updateUserLectureSchedule(userLectureScheduleIndex, userLectureScheduleData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE userLectureSchedule SET ? WHERE userLectureScheduleIndex = ?`, [userLectureScheduleData, userLectureScheduleIndex], (err, data) => {
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
     * model : userLectureSchedule 삭제
     * @param userLectureScheduleIndex
     */
    deleteUserLectureSchedule(userLectureScheduleIndex) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`DELETE FROM userLectureSchedule WHERE userLectureScheduleIndex = ?`, [userLectureScheduleIndex], (err, data) => {
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
exports.UserLectureSchedule = UserLectureSchedule;
exports.userLectureSchedule = new UserLectureSchedule();
//# sourceMappingURL=userLectureSchedule.model.js.map
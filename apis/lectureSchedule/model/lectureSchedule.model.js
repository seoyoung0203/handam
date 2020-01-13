"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class LectureSchedule {
    constructor() {
    }
    /**
     * model: lectureSemester 리스트 조회
     */
    listLectureSemester() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                console.log({ err });
                if (err) {
                    return reject(err);
                }
                connection.query(`SELECT * FROM lectureSemester`, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: lectureTrack 리스트 조회
     */
    listLectureTrack() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM lectureTrack`, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
    /**
     * model: lectureSchedule 리스트 조회
     * @param lectureSemesterKey
     * @param lectureTrackKey
     */
    listLectureSchedule(lectureSemesterKey, lectureTrackKey) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(`SELECT
                l1.lectureSemesterKey,
                l1.lectureTrackKey,
                l1.lectureTypeKey,
                l1.code,
                l1.grade,
                l1.dayNight,
                l1.division,
                l1.location
                FROM lectureSchedule AS l1
                WHERE lectureSemesterKey = ? AND lectureTrackKey = ?
                `, [lectureSemesterKey, lectureTrackKey], (err, rows) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        });
    }
}
exports.LectureSchedule = LectureSchedule;
exports.lectureSchedule = new LectureSchedule();
//# sourceMappingURL=lectureSchedule.model.js.map
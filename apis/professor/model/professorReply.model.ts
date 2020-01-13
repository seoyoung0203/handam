import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { IProfessorReply } from '../../../resources/IProfessorReply';

const pool = mysqlUtil.pool;

export class ProfessorReply {
	constructor() {
	}

	/**
	 * model: professorReply 생성
	 * @param professorReplyData
	 * @returns {Promise<IProfessorReply>}
	 */
	createProfessorReply(professorReplyData: IProfessorReply): Promise<IProfessorReply> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`INSERT INTO professorReply SET ?`, [professorReplyData], function(err) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(professorReplyData);
					}
				})
			})
		})
	}

	/**
	 * model: ProfessorReply 리스트 조회
	 * @param {number} professorInfoIndex
	 * @returns {Promise<void>}
	 */
	listProfessorReply(professorInfoIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`SELECT 
                t1.professorReplyIndex, 
                t1.userIndex,
                t1.goodCount,
                t1.content,
                t1.createdAt,
                t2.userNickName
				FROM professorReply as t1
				INNER JOIN user as t2 ON t1.userIndex = t2.userIndex
				WHERE t1.professorInfoIndex = ? `, [professorInfoIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				});
			})
		})
	}

	/**
	 * model: professorReply page 리스트 조회
	 * @param {number} professorInfoIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<any>}
	 */
	pageListProfessorReply(professorInfoIndex: number, page: number, count: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				connection.query(`SELECT 
				t1.professorReplyIndex, 
                t1.userIndex, 
                t1.content,
                t1.createdAt, 
                t1.goodCount,
                t2.userNickName
  				FROM professorReply as t1
  				INNER JOIN user as t2 ON t1.userIndex = t2.userIndex 
				WHERE t1.professorInfoIndex = ? 
				ORDER BY t1.createdAT DESC LIMIT ${start}, ${count}`, [professorInfoIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: professorReply 내가 쓴 게시글 리스트
	 * @param userIndex
	 * @returns {Promise<any>}
	 */
	myProfessorReplyPostList(userIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`SELECT
				 t1.professorReplyIndex,
				 t1.content,
				 t1.goodCount,
				 t1.createdAt,
				 t3.professorName,
				 t3.professorIndex
				 FROM professorReply AS t1
				 INNER JOIN professorInfo AS t2 ON t1.professorInfoIndex = t2.professorInfoIndex
				 INNER JOIN professor AS t3 ON t2.professorIndex = t3.professorIndex
				 WHERE userIndex = ?`, [userIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: professorReply 조회
	 * @param professorReplyIndex
	 */
	getProfessorReply(professorReplyIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`SELECT 
				t1.professorInfoIndex,
				t1.professorReplyIndex, 
                t1.userIndex, 
                t1.homework, 
                t1.lecturePower,
                t1.elasticity,
                t1.grade,
                t1.communication,
                t1.recommendation,
                t1.content,
                t3.professorName,
                t3.location,
                t3.tel,
                t3.email
				FROM professorReply AS t1
				INNER JOIN professorInfo AS t2 ON t1.professorInfoIndex = t2.professorInfoIndex
				INNER JOIN professor AS t3 ON t2.professorIndex = t3.professorIndex
                WHERE professorReplyIndex = ?`, [professorReplyIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: ProfessorReply ProfessorInfoindex, userIndex 조회
	 * @param professorInfoIndex userIndex
	 */
	getProfessorReplyByUserIndex(professorInfoIndex: number, userIndex: number) {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`SELECT
					 professorInfoIndex,
					 userIndex,
					 professorReplyIndex,
					 content,
					 recommendation	
					 FROM professorReply 
					 WHERE professorInfoIndex = ? AND userIndex = ? 
					 ORDER BY createdAt DESC`, [professorInfoIndex, userIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: professorReply 업데이트
	 * @param {number} professorReplyIndex
	 * @param professorReplyData
	 * @returns {Promise<IProfessorReply>}
	 */
	updateProfessorReply(professorReplyIndex: number, professorReplyData: any): Promise<IProfessorReply> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`UPDATE professorReply SET ? WHERE professorReplyIndex = ?`, [professorReplyData,
					professorReplyIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: professorReply 평균 구하기
	 * @param professorInfoInde111x
	 * @returns {Promise<any>}
	 */
	averageProfessorReply(professorInfoIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`SELECT 
				AVG(lecturePower) as avgLecturePower,
				AVG(communication) as avgCommunication,
				AVG(homework) as avgHomework, 
				AVG(elasticity) as avgElasticity, 
				AVG(grade) as avgGrade,
                SUM(recommendation) as goodCount, 
                COUNT(*) - SUM(recommendation) as badCount
				FROM professorReply WHERE professorInfoIndex = ?`, [professorInfoIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}

	/**
	 * model: professorReply 삭제
	 * @param {number} professorReplyIndex
	 * @returns {Promise<IProfessorReply>}
	 */
	deleteProfessorReply(professorReplyIndex: number): Promise<IProfessorReply> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`DELETE FROM professorReply WHERE professorReplyIndex = ?`, [professorReplyIndex], function(err, rows) {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				})
			})
		})
	}
}

export const professorReply: ProfessorReply = new ProfessorReply();

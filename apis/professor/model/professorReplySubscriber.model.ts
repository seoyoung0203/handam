import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class ProfessorReplySubscriber {
	/**
	 * moodel : professorReplySubscriber 생성
	 * @param professorReplySubscriberData
	 */
	createProfessorReplySubscriber(professorReplySubscriberData: any): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`INSERT INTO professorReplySubscriber SET ?`
					, [professorReplySubscriberData], (err) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(professorReplySubscriberData);
						}
					});
			});
		});
	}

	/**
	 * model: professorReplySubscriber 조회
	 * @param {number} userIndex
	 * @param {number} professorReplyIndex
	 */
	getProfessorReplySubscriber(userIndex: number, professorReplyIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT *
                FROM professorReplySubscriber
                WHERE userIndex = ? AND professorReplyIndex = ?`, [userIndex, professorReplyIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: professorReplySubscriber 댓글 별 good 개수 조회
	 * @param {number} professorReplyIndex
	 * return: {Promise<any>}
	 */
	getProfessorReplySubscriberSumCount(professorReplyIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT
                SUM(isGood) as goodCount
                FROM professorReplySubscriber WHERE professorReplyIndex = ?
                `, [professorReplyIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**model: professorReplySubscriber 사용자별 개수 조회
	 * @param professorReplyIndex
	 * @param userIndex
	 */
	getProfessorReplySubscriberByUserIndex(professorReplyIndex: number, userIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT
				t1.professorReplySubscriberIndex,
				t1.professorReplyIndex,
				t1.isGood,
				t2.userIndex
				FROM professorReplySubscriber AS t1
				INNER JOIN user As t2 ON t1.userIndex = t2.userIndex
				WHERE t1.professorReplyIndex = ?
				AND t1.userIndex = ?
				`, [professorReplyIndex, userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				})
			})
		})
	}

	/**
	 * model: professorReplySubscriber 업데이트
	 * @param professorReplyIndex
	 * @param userIndex
	 * @param professorReplySubscriberData
	 */
	updateProfessorReplySubscriber(professorReplyIndex: number, userIndex: number, professorReplySubscriberData: any): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`UPDATE professorReplySubscriber SET ? 
                WHERE userIndex = ? AND professorReplyIndex = ?`, [professorReplySubscriberData, userIndex,
					professorReplyIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: professorReplySubscriber 삭제
	 * @param professorReplyIndex
	 * @param userIndex
	 */
	deleteProfessorReplySubscriber(userIndex: number, professorReplyIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`DELETE 
                FROM professorReplySubscriber WHERE userIndex = ? AND professorReplyIndex = ?`, [professorReplyIndex,
					userIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(data);
					}
				})
			})
		})
	}

}

export const professorReplySubscriber: ProfessorReplySubscriber = new ProfessorReplySubscriber();
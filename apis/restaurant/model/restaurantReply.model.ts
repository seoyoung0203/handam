import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class restaurantReplyModel {
	/**
	 * model: 댓글 생성
	 * @param restaurantData
	 */
	createRestaurantReply(restaurantData: any): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`INSERT INTO restaurantReply SET ?`, [restaurantData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(restaurantData);
					}
				})
			})
		})
	}

	/**
	 * model: restaurantIndex 댓글 리스트 조회
	 * @param {number} restaurantIndex
	 * @returns {Promise<void>}
	 */
	listRestaurantReply(restaurantIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT 
                t1.restaurantReplyIndex,
                t1.title,
				t1.content,
				t1.status,
				t1.createdAt, 
				t1.goodCount,
				t2.userNickName
				FROM restaurantReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.restaurantIndex = ?
        ORDER BY t1.createdAt DESC`, [restaurantIndex], (err, data) => {
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
	 * model: restaurantReply 댓글 page 리스트 조회
	 * @param {number} restaurantIndex
	 * @param {number} page
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	pageListRestaurantReply(restaurantIndex: number, page: number, count: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				let start = (page - 1) * count;
				if (start < 0) {
					start = 0;
				}
				connection.query(`SELECT 
			  t1.restaurantReplyIndex,
			  t1.title,
			  t1.content,
			  t1.status,
			  t1.goodCount,
              t1.createdAt,
			  t2.userNickName
        FROM restaurantReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex                 
        WHERE t1.restaurantIndex = ?
        ORDER BY t1.createdAt DESC LIMIT ${start}, ${count}`, [restaurantIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantReply 조회
	 * @param restaurantReplyIndex
	 */
	getRestaurantReply(restaurantReplyIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT 
				t1.title,
				t1.content,
				t1.status,
				t1.createdAt,
				t1.goodCount,
				t2.userNickName
        FROM restaurantReply AS t1
        INNER JOIN user AS t2 ON t1.userIndex = t2.userIndex
        WHERE t1.restaurantReplyIndex = ?`, [restaurantReplyIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else if (!data[0]) {
						reject('This restaurantReply does not exist');
					} else {
						resolve(data);
					}
				});
			});
		});
	}

	/**
	 * model: restaurantReply 업데이트
	 * @param {number} restaurantReplyIndex
	 * @param restaurantReplyData
	 * @returns {Promise<void>}
	 */
	updateRestaurantReply(restaurantReplyIndex: number, restaurantReplyData: any): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`UPDATE restaurantReply SET ? WHERE restaurantReplyIndex = ?`,
					[restaurantReplyData, restaurantReplyIndex], (err) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(restaurantReplyData);
						}
					});
			});
		});
	}

	/**
	 * model: restaurantReply status 업데이트
	 * @param {number} restaurantReplyIndex
	 * @param {string} status
	 * @returns {Promise<void>}
	 */
	updateRestaurantReplyStatus(restaurantReplyIndex: number, status: string): Promise<void> {
		return new Promise((resolve, reject) => {
				pool.getConnection((err, connection) => {
					connection.query(`UPDATE restaurantReply SET status = ? WHERE restaurantReplyIndex = ?`, [status,
						restaurantReplyIndex], (err) => {
						if (err) {
							reject('restaurantReply Status Update Error');
						} else {
							resolve();
						}
					})
				})
			}
		)
	}

	/**
	 * model: restaurantReply 삭제
	 * @param {number} restaurantReplyIndex
	 * @returns {Promise<void>}
	 */
	deleteRestaurantReply(restaurantReplyIndex: number): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`DELETE FROM restaurantReply WHERE restaurantReplyIndex = ?`, [restaurantReplyIndex], async (err, data) => {
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
}

export const restaurantReply: restaurantReplyModel = new restaurantReplyModel();

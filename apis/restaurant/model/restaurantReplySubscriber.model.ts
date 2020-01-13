import { mysqlUtil } from '../../../packages/utils/mysql.util';

const {pool} = mysqlUtil;

export class RestaurantReplySubscriber {

	/**
	 * model: restaurantReplySubscriber 생성
	 * @param  restaurantReplySubscriberData
	 * return: {Promise<any>}
	 */
	createRestaurantReplySubscriber(restaurantReplySubscriberData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`INSERT INTO restaurantReplySubscriber SET ?`, [restaurantReplySubscriberData], (err) => {
					connection.release();
					if (err) {
						reject(err)
					} else {
						resolve(restaurantReplySubscriberData)
					}
				})
			})
		})
	}

	/**
	 * model: restaurantReplySubscriber 조회
	 * @param {number} userIndex
	 * @param {number} restaurantReplyIndex
	 * return : {Promise<any>}
	 */
	getRestaurantReplySubscriber(userIndex: number, restaurantReplyIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT * from restaurantReplySubscriber WHERE userIndex=? AND restaurantReplyIndex=?`,
					[userIndex, restaurantReplyIndex], (err, data) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(data);
						}
					}
				)
			})
		})
	}

	/**
	 * model: restaurantReplySubscriber 댓글 별 good 갯수 합 조회
	 * @param {number} restaurantReplyIndex
	 * return: {Promise<any>}
	 */
	getRestaurantReplySubscriberSumCount(restaurantReplyIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`SELECT SUM(isGood) as goodCount FROM restaurantReplySubscriber WHERE restaurantReplyIndex=?`,
					[restaurantReplyIndex], (err, data) => {
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
	 * model: restaurantReplySubscriber 업데이트
	 * @param {number} userIndex
	 * @param {number} restaurantReplyIndex
	 * @param  restaurantReplySubscriberData
	 * return: {Promise<any>}
	 */
	updateRestaurantReplySubscriber(userIndex: number, restaurantReplyIndex: number, restaurantReplySubscriberData: any): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`UPDATE restaurantReplySubscriber SET ? WHERE userIndex=? AND restaurantReplyIndex=?`,
					[restaurantReplySubscriberData, userIndex, restaurantReplyIndex], (err, data) => {
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
	 * model: restaurantReplySubscriber 삭제
	 * @param {number} userIndex
	 * @param {number} restaurantReplyIndex
	 * return : {Promise<any>}
	 */
	deleteRestaurantReplySubscriber(userIndex: number, restaurantReplyIndex: number): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await pool.getConnection(async (err, connection) => {
				await connection.query(`DELETE FROM restaurantReplySubscriber WHERE userIndex=? AND restaurantReplyIndex=?`,
					[userIndex, restaurantReplyIndex], (err, data) => {
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

export const restaurantReplySubscriber: RestaurantReplySubscriber = new RestaurantReplySubscriber();
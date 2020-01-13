import { mysqlUtil } from '../../../packages/utils/mysql.util'

const pool = mysqlUtil.pool;

export class voteReplySubscriberModel {
	/**
	 * model : voteReplySubscriber 생성
	 * @param voteReplySubscriberData
	 * return { Promise<any>}
	 */
	createVoteReplySubscriber(voteReplySubscriberData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`INSERT INTO voteReplySubscriber SET ?`, [voteReplySubscriberData], (err, data) => {
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

	/** model: voteReplySubscriber 조회
	 * @param {number} userIndex
	 * @param {number} voteReplyIndex
	 * return: {Promise<any>}
	 */
	getVoteReplySubscriber(userIndex: number, voteReplyIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT * FROM voteReplySubscriber WHERE userIndex=? AND voteReplyIndex=?`,
					[userIndex, voteReplyIndex], (err, data) => {
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

	/** model: voteReplySubscriber 투표 댓글 별 good 갯수 합 조회
	 * @param: {number} voteReplyIndex
	 * return: {Promise<any>}
	 */
	getVoteReplySubscriberSumCount(voteReplyIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT SUM(isGood) as goodCount FROM voteReplySubscriber WHERE voteReplyIndex=? `,
					[voteReplyIndex], (err, data) => {
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

	/** model: voteReplySubscriber 업데이트
	 * @param {number} userIndex
	 * @param {number} voteReplyIndex
	 * @param voteReplySubscriberData
	 * return: {Promise<any>}
	 */
	updateVoteReplySubscriber(userIndex: number, voteReplyIndex: number, voteReplySubscriberData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`UPDATE voteReplySubscriber SET ? WHERE userIndex=? AND voteReplyIndex=?`,
					[voteReplySubscriberData, userIndex, voteReplyIndex], (err, data) => {
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

	/** model: voteReplySubscriber 삭제
	 * @param {number} userIndex
	 * @param {number} voteReplyIndex
	 * return {Promise<any>}
	 */
	deleteVoteReplySubscriber(userIndex: number, voteReplyIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`DELETE FROM voteReplySubscriber WHERE userIndex=? AND voteReplyIndex=?`,
					[userIndex, voteReplyIndex], (err, data) => {
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
}

export const voteReplySubscriber: voteReplySubscriberModel = new voteReplySubscriberModel();
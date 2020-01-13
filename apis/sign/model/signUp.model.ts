import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class SignUp {
	constructor() {
	}

	/**
	 * model: 회원가입
	 * @param userData
	 * @returns {Promise<any>}
	 */
	createUser(userData: any): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query(`INSERT INTO user SET ?`, [userData], function(err, rows) {
					if (err) {
						connection.release();
						return reject(err);
					} else {
						connection.release();
						return resolve(rows);
					}
				});
			})
		})
	}
}

export const signUp: SignUp = new SignUp();

import { mysqlUtil } from '../../../packages/utils/mysql.util';

const pool = mysqlUtil.pool;

export class AdmissionYear {
	/**
	 * model: admissionYear 조회
	 * @returns {Promise<void>}
	 */
	listAdmissionYear(): Promise<void> {
		return new Promise((resolve, reject) => {
			pool.getConnection(function(err, connection) {
				connection.query('SELECT * FROM admissionYear', function(err, rows) {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(rows);
					}
				})
			})
		})
	}
}

export const admissionYear: any = new AdmissionYear();

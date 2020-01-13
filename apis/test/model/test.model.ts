import { mysqlUtil } from '../../../packages/utils/mysql.util';

// const pool = mysqlUtil.pool.promise();
const pool = mysqlUtil.pool;

export interface ITestData {
	title: string,
	content: string
}

class TestModel {
	/**
	 * model: Test 생성
	 * @param testData
	 * @returns {Promise<any>}
	 */
	async createTest(testData: ITestData): Promise<any> {
		const connection = await pool.getConnection();
		try {
			const [rows] = await connection.query(`INSERT INTO test set ?`, [testData]);
			return rows;
		} finally {
			connection.release();
		}
	}

	/**
	 * model: Test 조회
	 * @returns {Promise<any>}
	 */
	async getTest(): Promise<any> {
		const connection = await pool.getConnection();
		try {
			const [rows] = await connection.query(`SELECT * from test`)
			return rows;
		} finally {
			connection.release();
		}
	}

	/**
	 * model: Test 업데이트
	 * @param updateTestData
	 * @param {number} testIndex
	 * @returns {Promise<any>}
	 */
	async updateTest(updateTestData: ITestData, testIndex): Promise<any> {
		const connection = await pool.getConnection();
		try {
			const [rows] = await connection.query(`UPDATE test set ? where testIndex = ?`, [updateTestData, testIndex])
			return rows;
		} finally {
			connection.release();
		}
	}

	/**
	 * model: Test 삭제
	 * @param {number} testIndex
	 * @returns {Promise<any>}
	 */
	async deleteTest(testIndex: number): Promise<any> {
		const connection = await pool.getConnection();
		try {
			const [rows] = await connection.query(`DELETE from test where testIndex = ?`, [testIndex])
			return rows;
		} finally {
			connection.release();
		}
	}
}

export const test = new TestModel();

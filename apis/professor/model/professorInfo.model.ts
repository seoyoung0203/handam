import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { IProfessorInfo } from '../../../resources/IProfessorInfo';

const pool = mysqlUtil.pool;

export class ProfessorInfo {
	constructor() {
	}

	/**
	 * model: professorInfo 필터
	 * @param filter
	 */
	async filterProfessorInfo(filter: string) {
		try {
			filter = filter.replace(/ eq /gi, ' = ');
			filter = filter.replace(/ and /gi, ' AND ');
			filter = filter.replace(/ or /gi, ' OR ');
			filter = filter.replace(/ gt /gi, ' > ');
			filter = filter.replace(/ ge /gi, ' >= ');
			filter = filter.replace(/ lt /gi, ' < ');
			filter = filter.replace(/ le /gi, ' <= ');
			filter = filter.replace(/ is /gi, ' IS ');
			filter = filter.replace(/ like /gi, ' LIKE ');

			filter = `AND ` + filter;
			let filterArray: any = filter.split(' ');

			/** 교수평가 키에 맞도록 커스터마이징 */
			for (let i = 0; i < filterArray.length; i++) {
				if (filterArray[i] === `professorName`) {
					filterArray[i] = `t2.professorName`;
				} else if (filterArray[i] === `trackName`) {
					filterArray[i] = `t4.trackName`;
				}
				/** 필터 각 요소 정리 */
				if (filterArray[i].indexOf('\'') != -1) {
					for (let x = 0; x < 2; x++) {
						filterArray[i] = filterArray[i].replace('\'', '');
					}
				} else if (isNaN(filterArray[i]) === false) {
					filterArray[i] = parseInt(filterArray[i]);
				} else {
					filterArray[i] = filterArray[i];
				}

				/** 포스트 값에 맞도록 커스터마이징 */
				if (filterArray[i] === ('=') || filterArray[i] === ('>=') || filterArray[i] === ('>') || filterArray[i] === ('<=') || filterArray[i] === ('<')) {
					if (filterArray[i + 1] == 'true' || filterArray[i + 1] == 'false') {
						filterArray[i + 1] = `${filterArray[i + 1]}`;
					} else {
						filterArray[i + 1] = `"${filterArray[i + 1]}"`;
					}
				}
				if (filterArray[i] === ('LIKE')) {
					filterArray[i + 1] = `"%${filterArray[i + 1]}%"`;
				}
			}

			/** 포스트 SQL 문으로 정리 */
			let filterString: string = filterArray.join(' ');
			filterString = filterString + ' ';

			return filterString
		} catch (err) {
			throw new Error('ProfessorInfo filter does not exist');
		}
	}

	/**
	 * model: professorInfo 정렬
	 * @param orderBy
	 */
	async orderByProfessorInfo(orderBy: string) {
		try {
			for (let i = 0; i < orderBy.length; i++) {
				orderBy = orderBy.replace(' ', ':');
			}

			let orderByObj: any = {};
			let resultArray = orderBy.split(':');
			orderByObj[resultArray[0]] = resultArray[1];
			return orderByObj;

		} catch (err) {
			throw new Error('ProfessorInfo orderBy does not exist');
		}
	}

	/**
	 * model: professorInfo 생성
	 * @param professorInfoData
	 * @returns {Promise<IProfessorInfo>}
	 */
	createProfessorInfo(professorInfoData: IProfessorInfo): Promise<IProfessorInfo> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`INSERT INTO professorInfo SET ?`, [professorInfoData], (err) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(professorInfoData);
					}
				})
			})
		})
	}

	/**
	 * model: professorInfo 리스트 조회
	 * @return {Promise <IProfessorInfo>}
	 */
	listProfessorInfo(filter?: string): Promise<IProfessorInfo> {
		return new Promise(async (resolve, reject) => {
			let sql: string = `SELECT 
                    DISTINCT t1.professorInfoIndex,
                    t1.avgLecturePower,
                    t1.avgHomework,
                    t1.avgElasticity,
                    t1.avgCommunication,
                    t1.avgGrade,
                    t2.professorName,
                    (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore        
                    FROM professorInfo as t1
                    INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex
                    INNER JOIN professorTrack AS t3 ON t2.professorIndex = t3.professorIndex
                    INNER JOIN track AS t4 ON t3.trackIndex = t4.trackIndex`;
			if (filter) {
				const resultFilter = await this.filterProfessorInfo(filter);
				sql = sql + resultFilter;
			}
			pool.getConnection((err, connection) => {
				connection.query(sql, (err, data) => {
					if (err) {
						connection.release();
						reject(err);
					} else {
						connection.release();
						resolve(data);
					}
				})
			})
		})
	}

	/**
	 *  model: professorInfo  page 리스트 조회
	 *  @param: {number} page
	 *  @param: {number} count
	 *  @returns {Promise<Array<IProfessorInfo>>>}
	 */
	pageListProfessorInfo(page: number, count: number = 6, filter?: string, orderBy?: string): Promise<Array<IProfessorInfo>> {
		return new Promise(async (resolve, reject) => {
			let sortType;

			let start = (page - 1) * count;
			if (start < 0) {
				start = 0;
			}

			let sql: string = `SELECT
				DISTINCT t1.professorInfoIndex,
				t1.professorIndex,
             	t1.avgLecturePower,
                t1.avgHomework,
                t1.avgElasticity,
                t1.avgCommunication,
                t1.avgGrade,
                t1.goodCount,
                t1.badCount,
                t2.professorName,
                (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore,
                (SELECT COUNT(*) AS count FROM professorReply WHERE t1.professorInfoIndex = professorReply.professorInfoIndex) AS professorInfoReplyCount
                FROM professorInfo AS t1
                INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex 
                INNER JOIN professorTrack AS t3 ON t1.professorIndex = t3.professorIndex
                INNER JOIN track AS t4 ON t3.trackIndex = t4.trackIndex
                WHERE t1.professorIndex IS NOT NULL `;
			if (filter) {
				const resultFilter = await this.filterProfessorInfo(filter);
				sql = sql + resultFilter;
			}

			if (orderBy) {
				const orderByObj = await this.orderByProfessorInfo(orderBy);
				if (orderByObj.hasOwnProperty('createdAt')) {
					sortType = orderByObj.createdAt;
					sql = sql + ` ORDER BY t1.createdAt ${sortType}`;
				}

				if (orderByObj.hasOwnProperty('updatedAt')) {
					sortType = orderByObj.updatedAt;
					sql = sql + ` ORDER BY t1.updatedAt ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('goodCount')) {
					sortType = orderByObj.goodCount;
					sql = sql + ` ORDER BY t1.goodCount ${sortType} `;
				}

				if (orderByObj.hasOwnProperty('badCount')) {
					sortType = orderByObj.badCount;
					sql = sql + ` ORDER BY t1.badCount ${sortType} `;
				}
			} else {
				sql = sql + ` ORDER BY t1.updatedAt DESC `;
			}

			sql = sql + `LIMIT ${start}, ${count}`;

			pool.getConnection((err, connection) => {
				connection.query(sql, (err, data) => {
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
	 * model: professorInfo 조회
	 * @params {number} professorIndex
	 * @returns { Promise<any> }
	 */
	getProfessorInfo(professorIndex: number): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT
                  t1.professorInfoIndex,
                  t1.avgLecturePower,
                  t1.avgHomework,
                  t1.avgElasticity,
                  t1.avgCommunication,
                  t1.avgGrade,
                  t1.goodCount,
                  t1.badCount,
                  (SELECT (t1.avgLecturePower+t1.avgHomework+t1.avgElasticity+t1.avgCommunication+t1.avgGrade)/5)as avgScore,
                  t2.professorName,
                  t2.location,
                  t2.tel,
                  t2.email,
                  t3.departmentName,
                  (SELECT COUNT(*) FROM professorReply WHERE t1.professorInfoIndex = professorReply.professorInfoIndex) AS ProfessorReplyCount
                  FROM professorInfo AS t1
                  INNER JOIN professor AS t2 ON t1.professorIndex = t2.professorIndex
                  INNER jOIN department AS t3 ON t2.departmentIndex = t3.departmentIndex
                  WHERE t1.professorIndex = ?`, [professorIndex], (err, data) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			});
		})
	}

	/**
	 *  model : professorInfo 업데이트
	 *  @param{number} professorInfoIndex
	 *  @param professorInfoData
	 *  @returns {Promise<IProfessorInfo>}
	 */
	updateProfessorInfo(professorInfoIndex: number, professorInfoData: IProfessorInfo): Promise<any> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`UPDATE professorInfo SET ? WHERE professorInfoIndex = ?`
					, [professorInfoData, professorInfoIndex], (err, data) => {
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
	 * model: professorInfo 삭제
	 * @param {number} professorInfoIndex
	 * @returns {Promise<IProfessorInfo>}
	 */
	deleteProfessorInfo(professorInfoIndex: number): Promise<IProfessorInfo> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`DELETE FROM professorInfo WHERE professorInfoIndex = ?`, [professorInfoIndex], (err, data) => {
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

export const professorInfo = new ProfessorInfo();

import { mysqlUtil } from '../../../packages/utils/mysql.util';
import { IPosts } from '../../../resources/IPosts';

import { IPostsCategory } from '../../../resources/IPostsCategory';

const pool = mysqlUtil.pool;

export class PostsCategory {
	/**
	 * model: postsCategory 리스트 조회
	 */
	listPostsCategory(): Promise<IPostsCategory[]> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT * from postsCategory ORDER BY postsCategory.order ASC`, (err, data) => {
					connection.release();
					err ? reject(err) : resolve(data);
				});
			});
		});
	}

	/**
	 * model: 카테고리 인덱스에 따른 최신 post 조회
	 * @param postsCategoryIndex
	 */
	getRecentPostByPostsCategoryIndex(postsCategoryIndex: number): Promise<IPosts[]> {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`SELECT * FROM posts WHERE postsCategoryIndex = ? ORDER BY createdAt DESC limit 1;`, [postsCategoryIndex], (err, data) => {
					connection.release();
					err ? reject(err) : resolve(data);
				});
			});
		});
	}
}

export const postsCategory = new PostsCategory();

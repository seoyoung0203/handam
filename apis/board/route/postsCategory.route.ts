import { Request, Response, Router } from 'express';
import * as moment from 'moment'

import { IPostsCategoryWithNewPost } from '../../../resources/IPostsCategory';
import { postsCategory } from '../model/postsCategory.model';

export class PostsCategoryRoutes {
	public postsCategoryRouter = Router();

	constructor() {
		this.router();
	}

	public router() {
		this.postsCategoryRouter.get('/postsCategory', listPostsCategory);
	}
}

/**
 * route: postsCategory 리스트 조회
 * @param req
 * @param res
 */
async function listPostsCategory(req: Request, res: Response) {
	try {
		const results = await postsCategory.listPostsCategory();
		const recentPosts = await Promise.all(results.map(result => {
			return postsCategory.getRecentPostByPostsCategoryIndex(result.postsCategoryIndex)
		}))

		const today = moment();
		const categoryIndexToDays = new Map<number, number>();
		recentPosts.forEach(post => {
			const {postsCategoryIndex, createdAt} = post[0];
			const diff = today.diff(moment(createdAt).subtract(9, 'h'), 'days');
			categoryIndexToDays.set(postsCategoryIndex, diff)
		});

		const result: IPostsCategoryWithNewPost[] = results.map(result => {
			const {postsCategoryIndex} = result;
			return {
				...result,
				hasNewPost: categoryIndexToDays.get(postsCategoryIndex) === 0
			}
		})

		res.send({
			success: true,
			statusCode: 200,
			resultCount: results.length,
			result,
			message: 'listPostsCategory: 200'
		});
	} catch (err) {
		switch (err) {
			default:
				res.send({
					success: false,
					statusCode: 500,
					message: 'listPostsCategory: 50000'
				});
		}
	}
}

export const postsCategoryRoutes = new PostsCategoryRoutes();

export interface IPostsCategory {
	postsCategoryIndex: number,
	postsCategoryName: string,
	order: number,
	description: string
}

export interface IPostsCategoryWithNewPost extends IPostsCategory {
	hasNewPost: boolean
}

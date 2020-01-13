"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostsReportResource {
    constructor(postsReportData) {
        this.setUserIndex(postsReportData.userIndex);
        this.setPostsIndex(postsReportData.postsIndex);
        this.setContent(postsReportData.content);
    }
    getUserIndex() {
        return this.userIndex;
    }
    setUserIndex(userIndex) {
        this.userIndex = userIndex;
    }
    getPostsIndex() {
        return this.postsIndex;
    }
    setPostsIndex(postsIndex) {
        this.postsIndex = postsIndex;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getPostsReport() {
        let postsReportResource = {
            userIndex: this.getUserIndex(),
            postsIndex: this.getPostsIndex(),
            content: this.getContent()
        };
        return postsReportResource;
    }
}
exports.PostsReportResource = PostsReportResource;
//# sourceMappingURL=postsReport.resource.js.map
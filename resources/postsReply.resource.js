"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostsReplyResource {
    constructor(postsReplyData) {
        this.setPostsIndex(postsReplyData.postsIndex);
        this.setParentsPostsReplyIndex(postsReplyData.parentsPostsReplyIndex);
        this.setUserIndex(postsReplyData.userIndex);
        this.setContent(postsReplyData.content);
    }
    getPostsIndex() {
        return this.postsIndex;
    }
    setPostsIndex(postsIndex) {
        this.postsIndex = postsIndex;
    }
    getParentsPostsReplyIndex() {
        return this.parentsPostsReplyIndex;
    }
    setParentsPostsReplyIndex(parentsPostsReplyIndex) {
        this.parentsPostsReplyIndex = parentsPostsReplyIndex;
    }
    getUserIndex() {
        return this.userIndex;
    }
    setUserIndex(userIndex) {
        this.userIndex = userIndex;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getPostsReplyData() {
        let postsReplyData = {
            postsIndex: this.getPostsIndex(),
            parentsPostsReplyIndex: this.getParentsPostsReplyIndex(),
            userIndex: this.getUserIndex(),
            content: this.getContent()
        };
        return postsReplyData;
    }
}
exports.PostsReplyResource = PostsReplyResource;
//# sourceMappingURL=postsReply.resource.js.map
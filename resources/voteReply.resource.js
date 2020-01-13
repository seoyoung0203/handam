"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoteReplyResource {
    constructor(voteReplyData) {
        this.setVoteReplyIndex(voteReplyData.voteReplyIndex);
        this.setVoteTopicIndex(voteReplyData.voteTopicIndex);
        this.setUserIndex(voteReplyData.userIndex);
        this.setContent(voteReplyData.content);
        this.setStatus(voteReplyData.status);
    }
    getVoteReplyIndexIndex() {
        return this.voteReplyIndex;
    }
    setVoteReplyIndex(voteReplyIndex) {
        this.voteReplyIndex = voteReplyIndex;
    }
    getVoteTopicIndex() {
        return this.voteTopicIndex;
    }
    setVoteTopicIndex(voteTopicIndex) {
        this.voteTopicIndex = voteTopicIndex;
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
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getVoteReplyData() {
        let voteReplyData = {
            voteReplyIndex: this.getVoteReplyIndexIndex(),
            voteTopicIndex: this.getVoteTopicIndex(),
            userIndex: this.getUserIndex(),
            content: this.getContent(),
            status: this.getStatus()
        };
        return voteReplyData;
    }
}
exports.VoteReplyResource = VoteReplyResource;
//# sourceMappingURL=voteReply.resource.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostsAlarmReceiverResource {
    constructor(postsAlarmReceiverData) {
        this.setPostsIndex(postsAlarmReceiverData.postsIndex);
        this.setUserIndex(postsAlarmReceiverData.userIndex);
        this.setStatus(postsAlarmReceiverData.status);
        this.setIsAlarm(postsAlarmReceiverData.isAlarm);
    }
    getPostsIndex() {
        return this.postsIndex;
    }
    setPostsIndex(postsIndex) {
        this.postsIndex = postsIndex;
    }
    getUserIndex() {
        return this.userIndex;
    }
    setUserIndex(userIndex) {
        this.userIndex = userIndex;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getIsAlarm() {
        return this.isAlarm;
    }
    setIsAlarm(isAlarm) {
        this.isAlarm = isAlarm;
    }
    getPostsAlarmReceiver() {
        let postsAlarmReceiverData = {
            postsIndex: this.getPostsIndex(),
            userIndex: this.getUserIndex(),
            status: this.getStatus(),
            isAlarm: this.getIsAlarm()
        };
        return postsAlarmReceiverData;
    }
}
exports.PostsAlarmReceiverResource = PostsAlarmReceiverResource;
//# sourceMappingURL=postsAlarmReceiver.resource.js.map
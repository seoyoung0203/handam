"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encryption_util_1 = require("../packages/utils/encryption.util");
class UserResource {
    constructor(signUpData) {
        this.setUserId(signUpData.userId);
        this.setUserPw(signUpData.userPw);
        this.setUserNickName(signUpData.userNickName);
        this.setMajor(signUpData.major);
        this.setMinor(signUpData.minor);
        this.setDoubleMajor(signUpData.doubleMajor);
        this.setConnectedMajor(signUpData.connectedMajor);
        this.setAdmissionYear(signUpData.admissionYear);
        this.setIsValidation(signUpData.isValidation);
        this.setAvatar(signUpData.avatar);
        this.setStatus(signUpData.status);
        this.setAppId(signUpData.appId);
        this.setIsPostsAlarm(signUpData.isPostsAlarm);
        this.setIsNonSubjectPointAlarm(signUpData.isNonSubjectPointAlarm);
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserPw() {
        return this.userPw;
    }
    setUserPw(userPw) {
        this.userPw = encryption_util_1.encriptionPw.getHash(userPw);
    }
    getUserNickName() {
        return this.userNickName;
    }
    setUserNickName(userNickName) {
        this.userNickName = userNickName;
    }
    getMajor() {
        return this.major;
    }
    setMajor(major) {
        this.major = major;
    }
    getMinor() {
        return this.minor;
    }
    setMinor(minor) {
        this.minor = minor;
    }
    getDoubleMajor() {
        return this.doubleMajor;
    }
    setDoubleMajor(doubleMajor) {
        this.doubleMajor = doubleMajor;
    }
    getConnectedMajor() {
        return this.connectedMajor;
    }
    setConnectedMajor(connectedMajor) {
        this.connectedMajor = connectedMajor;
    }
    getAdmissionYear() {
        return this.admissionYear;
    }
    setAdmissionYear(admissionYear) {
        this.admissionYear = admissionYear;
    }
    getIsValidation() {
        return this.isValidation;
    }
    setIsValidation(isValidation) {
        this.isValidation = isValidation;
    }
    getAvatar() {
        return this.avatar;
    }
    setAvatar(avatar) {
        this.avatar = avatar;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getAppId() {
        return this.appId;
    }
    setAppId(appId) {
        this.appId = appId;
    }
    getIsPostsAlarm() {
        return this.isPostsAlarm;
    }
    setIsPostsAlarm(isPostsAlarm) {
        this.isPostsAlarm = isPostsAlarm;
    }
    getIsNonSubjectPointAlarm() {
        return this.isNonSubjectPointAlarm;
    }
    setIsNonSubjectPointAlarm(isNonSubjectPointAlarm) {
        this.isNonSubjectPointAlarm = isNonSubjectPointAlarm;
    }
    getSignUp() {
        let userResource = {
            userId: this.getUserId(),
            userPw: this.getUserPw(),
            userNickName: this.getUserNickName(),
            major: this.getMajor(),
            minor: this.getMinor(),
            doubleMajor: this.getDoubleMajor(),
            connectedMajor: this.getConnectedMajor(),
            admissionYear: this.getAdmissionYear(),
            isValidation: this.getIsValidation(),
            avatar: this.getAvatar(),
            status: this.getStatus(),
            appId: this.getAppId(),
            isPostsAlarm: this.getIsPostsAlarm(),
            isNonSubjectPointAlarm: this.getIsNonSubjectPointAlarm()
        };
        return userResource;
    }
}
exports.UserResource = UserResource;
//# sourceMappingURL=user.resource.js.map
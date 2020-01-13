"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LectureResource {
    constructor(lectureData) {
        this.setLectureCode(lectureData.lectureCode);
        this.setLectureName(lectureData.lectureName);
        this.setTrack(lectureData.track);
    }
    getLectureCode() {
        return this.lectureCode;
    }
    setLectureCode(lectureCode) {
        this.lectureCode = lectureCode;
    }
    getLectureName() {
        return this.lectureName;
    }
    setLectureName(lectureName) {
        this.lectureName = lectureName;
    }
    getTrack() {
        return this.track;
    }
    setTrack(track) {
        this.track = track;
    }
    getLecture() {
        let lectureResource = {
            lectureCode: this.getLectureCode(),
            lectureName: this.getLectureName(),
            track: this.getTrack()
        };
        return lectureResource;
    }
}
exports.LectureResource = LectureResource;
//# sourceMappingURL=lecture.resource.js.map
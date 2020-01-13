"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackResource {
    constructor(trackData) {
        this.setTrackName(trackData.trackName);
    }
    getTrackName() {
        return this.trackName;
    }
    setTrackName(trackName) {
        this.trackName = trackName;
    }
    getTrack() {
        let trackResource = {
            trackName: this.getTrackName()
        };
        return trackResource;
    }
}
exports.TrackResource = TrackResource;
//# sourceMappingURL=track.resource.js.map
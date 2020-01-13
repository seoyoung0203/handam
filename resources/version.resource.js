"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VersionResource {
    constructor(versionData) {
        this.setVersionIndex(versionData.versionIndex);
    }
    getVersionIndex() {
        return this.versionIndex;
    }
    setVersionIndex(versionIndex) {
        this.versionIndex = versionIndex;
    }
    getVersion() {
        let versionResource = {
            versionIndex: this.getVersionIndex()
        };
        return versionResource;
    }
}
exports.VersionResource = VersionResource;
//# sourceMappingURL=version.resource.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdmissionYearResource {
    constructor(admissionYearData) {
        this.setAdmission(admissionYearData.admissionYear);
    }
    getAdmission() {
        return this.admissionYear;
    }
    setAdmission(admissionYear) {
        this.admissionYear = admissionYear;
    }
    getAdmissionYear() {
        let admissionResource = {
            admissionYear: this.getAdmission()
        };
        return admissionResource;
    }
}
exports.AdmissionYearResource = AdmissionYearResource;
//# sourceMappingURL=admissionYear.resource.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProfessorResource {
    constructor(professorData) {
        this.setProfessorName(professorData.professorName);
        this.setDepartment(professorData.department);
        this.setAddress(professorData.address);
        this.setTel(professorData.tel);
        this.setEmail(professorData.email);
    }
    getProfessorName() {
        return this.professorName;
    }
    setProfessorName(professorName) {
        this.professorName = professorName;
    }
    getDepartment() {
        return this.department;
    }
    setDepartment(department) {
        this.department = department;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    getTel() {
        return this.tel;
    }
    setTel(tel) {
        this.tel = tel;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getProfessor() {
        let professorResource = {
            professorName: this.getProfessorName(),
            department: this.getDepartment(),
            address: this.getAddress(),
            tel: this.getTel(),
            email: this.getEmail()
        };
        return professorResource;
    }
}
exports.ProfessorResource = ProfessorResource;
//# sourceMappingURL=professor.resource.js.map
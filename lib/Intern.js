const utilities = require("./utilities");
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id = utilities.generateEmployeeId(), email, school, role = "Intern") {
    super(name, id, email, role);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  setSchool(school) {
    this.school = school;
  }
}

module.exports = Intern;

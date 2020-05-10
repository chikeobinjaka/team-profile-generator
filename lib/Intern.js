// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Intern extends Employee {
  constructor(firstName, lastName, role, email, school) {
    super(firstName, lastName, role, email);
    this.school = school;
  }
}

module.exports = Intern;

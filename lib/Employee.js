const utilities = require("./utilities");

class Employee {
  constructor(firstName, lastName, role, email) {
    this.employeeId = utilities.generateEmployeeId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
  }
}

module.exports = Employee;

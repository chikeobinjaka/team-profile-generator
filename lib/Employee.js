// TODO: Write code to define and export the Employee class
import generateEmployeeId from "./utilities";
class Employee {
  constructor(firstName, lastName, role, email) {
    this.employeeId = generateEmployeeId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
  }
}

module.exports = Employee;
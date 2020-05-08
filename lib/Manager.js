// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {
  constructor(firstName, lastName, role, email, telNumber) {
    super(firstName, lastName, role, email);
    this.telNumber = telNumber;
  }
}

const utilities = require("./utilities");
class Employee {
  constructor(name, id = utilities.generateEmployeeId(), email, role = "Employee") {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }

  getEmail() {
    return this.email();
  }

  getRole() {
    return this.role;
  }

  setName(name) {
    this.name = name;
  }

  setId(id = utilities.generateEmployeeId()) {
    this.id = id;
  }

  setRole(role = "Employee") {
    this.role = role;
  }
}

module.exports = Employee;

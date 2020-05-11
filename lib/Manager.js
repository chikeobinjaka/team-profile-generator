const utilities = require("./utilities");
class Manager extends Employee {
  constructor(name, id = utilities.generateEmployeeId(), email, officeNumber, role = "Manager") {
    super(name, id, email, role);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  setOfficeNumber(officeNumber) {
    this.officeNumber = officeNumber;
  }
}

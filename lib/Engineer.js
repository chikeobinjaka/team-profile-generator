// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Engineer extends Employee {
  constructor(firstName, lastName, role, email, gitHubId) {
    super(firstName, lastName, role, email);
    this.gitHubId = gitHubId;
  }
}

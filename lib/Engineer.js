const utilities = require("./utilities");
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id = utilities.generateEmployeeId(), email, github, role = "Engineer") {
    super(name, id, email, role);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  setGithub(github) {
    this.github = github;
  }
}

module.exports = Engineer;

const utilities = require("./utilities");
class Employee extends Employee {
  constructor(name, id = utilities.generateEmployeeId(), email, github, role = "Engineer") {
    super(name, id, email, role);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  setGithub(github){
      this.github = github;
  }
}

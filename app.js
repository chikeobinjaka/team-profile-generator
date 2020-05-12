const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");

const teamHTML = path.join(__dirname, "team.html");
const indexHTML = path.join(__dirname, "index.html");
const styleCSS = path.join(__dirname, "style.css");

const teamHTMLOutput = path.join(OUTPUT_DIR, "team.html");
const indexHTMLOutput = path.join(OUTPUT_DIR, "index.html");
const styleCSSOutput = path.join(OUTPUT_DIR, "style.css");

const render = require("./lib/htmlRenderer");
const promptSync = require("prompt-sync")();
const utilities = require("./lib/utilities");
const logIt = false;

const STYLE = `.team-heading{
  background-color: #e64a58;
}

.card-header{
  background-color: #147bf3;
}
`;

function replacePlaceHolder(htmlTemplate, placeholder, replacement) {
  let retval = null;
  if (htmlTemplate != null && placeholder != null && replacement != null) {
    // retval = htmlTemplate.slice();
    let regex = new RegExp(`{{ ${placeholder} }}`, "g");
    retval = htmlTemplate.replace(regex, replacement);
  }
  return retval;
}

function loadTemplate(templateFilePath) {
  let retval = null;
  try {
    if (fs.existsSync(templateFilePath)) {
      retval = fs.readFileSync(templateFilePath, "utl8");
    }
  } catch (err) {}
  return retval;
}

function generateEmployeeId() {
  return Math.floor((Math.random() * Date.now()) / 1000000);
}

const internRoles = [
  "Clerical Intern",
  "Research Intern",
  "Gofer Intern",
  "Social Media Intern",
  "Code Formatter Intern",
  "Intern",
];

const managerRoles = [
  "Project Manager",
  "Finance Manager",
  "HR Manager",
  "Engineering Manager",
  "Production Manager",
  "Test Manager",
  "Software Manager",
  "Manager",
];

const engineerRoles = [
  "Junior Engineer",
  "Senior Engineer",
  "Development Engineer",
  "Database Engineer",
  "Data Architect",
  "Engineer",
];

const employeeQuestions = [
  {
    name: "name",
    type: "input",
    message: "Enter Name: ",
  },
  {
    name: "email",
    type: "input",
    message: "Email address",
  },
];

const internQuestions = [
  ...employeeQuestions,
  {
    name: "id",
    type: "input",
    message: "Enter ID:",
    default: function(sessionAnswer) {
      return utilities.generateEmployeeId();
    },
    
  },
  {
    name: "school",
    type: "input",
    message: "What university did intern attend? ",
    default: "<None>",
  },
  {
    name: "role",
    type: "list",
    message: "Choose Internship Role ",
    choices: [...internRoles],
    default: "Intern",
  },
];

const engineerQuestions = [
  ...employeeQuestions,
  {
    name: "id",
    type: "input",
    message: "Enter ID:",
    default: utilities.generateEmployeeId(),
  },
  {
    name: "github",
    type: "input",
    message: "Github ID? ",
  },
  {
    name: "role",
    type: "list",
    message: "Choose Engineer Role",
    choices: [...engineerRoles],
    default: "Engineer",
  },
];

const managerQuestions = [
  ...employeeQuestions,
  {
    name: "id",
    type: "input",
    message: "Enter ID:",
    default: utilities.generateEmployeeId(),
  },
  {
    name: "role",
    type: "list",
    message: "Choose Manager Role",
    choices: [...managerRoles],
    default: "Manager",
  },
  {
    name: "officeNumber",
    type: "input",
    message: "Phone Number? ",
  },
];

function renderHTML(data) {
  if (data == null) return;
  let manager = data["manager"];
  let div = managerTemplate;
  let divs = "";
  div = utilities.replacePlaceHolder(div, "name", manager.getName());
  div = utilities.replacePlaceHolder(div, "id", manager.getId());
  div = utilities.replacePlaceHolder(div, "role", manager.getRole());
  div = utilities.replacePlaceHolder(div, "email", manager.getEmail());
  div = utilities.replacePlaceHolder(div, "officeNumber", manager.getOfficeNumber());
  divs += div;
  if (logIt) console.log(div);
  let members = null;
  if ((members = data["engineers"]) != null) {
    for (let index = 0; index < members.length; index++) {
      let engineer = members[index];
      div = utilities.replacePlaceHolder(engineerTemplate, "name", engineer.getName());
      div = utilities.replacePlaceHolder(div, "id", engineer.getId());
      div = utilities.replacePlaceHolder(div, "role", engineer.getRole());
      div = utilities.replacePlaceHolder(div, "email", engineer.getEmail());
      div = utilities.replacePlaceHolder(div, "github", engineer.getGithub());
      divs += div;
    }
  }
  if ((members = data["interns"]) != null) {
    for (let index = 0; index < members.length; index++) {
      let intern = members[index];
      div = utilities.replacePlaceHolder(internTemplate, "name", intern.getName());
      div = utilities.replacePlaceHolder(div, "id", intern.getId());
      div = utilities.replacePlaceHolder(div, "role", intern.getRole());
      div = utilities.replacePlaceHolder(div, "email", intern.getEmail());
      div = utilities.replacePlaceHolder(div, "school", intern.getSchool());
      divs += div;
    }
  }
  let main = utilities.replacePlaceHolder(mainTemplate, "team", divs);
  if (logIt) console.log(main);
  // write to output(s)
  fs.writeFileSync(teamHTML, main);
  fs.writeFileSync(indexHTML, main);
  fs.writeFileSync(styleCSS, STYLE);

  fs.writeFileSync(teamHTMLOutput, main);
  fs.writeFileSync(indexHTMLOutput, main);
  fs.writeFileSync(styleCSSOutput, STYLE);
}

let data = {};
async function dataCollectionCall() {
  console.log("Collect Team Manager Information...\n\n");
  console.log("==".repeat(20));
  let manager = await inquirer.prompt(managerQuestions);
  if (logIt) console.log(manager);
  let mgr = new Manager(manager.name, manager.id, manager.email, manager.officeNumber, manager.role);
  data["manager"] = mgr;
  if (logIt) console.log(data);

  console.log("Collect Team Intern(s) Information...\n\n");
  let ans = promptSync("Add Interns to the team (y/n) Y?");
  console.clear();
  if (ans == null || ans == "") ans = "y";
  while (ans.charAt(0) !== "n") {
    console.log("==".repeat(20));
    let intern = await inquirer.prompt(internQuestions);
    if (logIt) console.log(intern);
    let intrn = new Intern(intern.name, intern.id, intern.email, intern.school, intern.role);
    if (logIt) console.log(intrn);
    data["interns"].push(intrn);
    ans = promptSync("Add another intern to the team (y/n) Y?");
    if (ans == null || ans == "") ans = "y";
  }
  if (logIt) console.log(data);

  console.log("Collect Team Engineer(s) Information...\n\n");
  ans = promptSync("Add Engineers to the team (y/n) Y?");
  if (ans == null || ans == "") ans = "y";
  console.clear();
  while (ans.charAt(0) !== "n") {
    console.log("==".repeat(20));
    let engineer = await inquirer.prompt(engineerQuestions);
    if (logIt) console.log(engineer);
    let engr = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github, engineer.role);
    if (logIt) console.log(engr);
    data["engineers"].push(engr);
    ans = promptSync("Add another engineer to the team (y/n) Y?");
    if (ans == null || ans == "") ans = "y";
  }
  if (logIt) console.log(data);
  renderHTML(data);
}

let engineerTemplate = utilities.loadTemplate("./templates/engineer.html");
let internTemplate = utilities.loadTemplate("./templates/intern.html");
let managerTemplate = utilities.loadTemplate("./templates/manager.html");
let mainTemplate = utilities.loadTemplate("./templates/main.html");

data["interns"] = [];
data["engineers"] = [];
console.clear();
dataCollectionCall();

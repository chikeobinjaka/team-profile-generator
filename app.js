const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const promptSync = require("prompt-sync")();
const utilities = require("./lib/utilities");
const logIt = true;

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

const internRoles = ["Clerical", "Research", "Gofer", "Social Media", "Code Formatter", "Intern"];

const managerRoles = ["Project", "Finance", "HR", "Engineering", "Production", "Test", "Software", "Manager"];

const engineerRoles = ["Junior", "Senior", "Development", "Database", "Architect", "Engineer"];

const employeeQuestions = [
  {
    name: "name",
    type: "input",
    message: "Enter Name: ",
  },
  {
    name: "id",
    type: "input",
    message: "Enter ID:",
    default: utilities.generateEmployeeId(),
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

// async function internCall() {
//   if (logIt) console.log("Calling Intern Inquire...\n\n");
//   let intern = await inquirer.prompt(internQuestions);
//   if (logIt) console.log(intern);
//   let intrn = new Intern(intern.name, intern.id, intern.email, intern.school, intern.role);
//   data["intern"].push(intrn);
//   if (logIt) console.log(data);
//   if (intern.again) internCall();
//   else return;
// }

// async function engineerCall() {
//   if (logIt) console.log("Calling Intern Inquire...\n\n");
//   let engineer = await inquirer.prompt(engineerQuestions);
//   if (logIt) console.log(engineer);
//   let engr = new Intern(intern.firstName, intern.lastName, intern.role, intern.email, intern.school);
//   data["engineer"].push(engr);
//   if (logIt) console.log(data);
//   if (engineer.again) engineerCall();
//   else return;
// }

let data = {};
async function dataCollectionCall() {
  if (logIt) console.log("Calling Manager Inquire...\n\n");
  let manager = await inquirer.prompt(managerQuestions);
  if (logIt) console.log(manager);
  let mgr = new Manager(manager.name, manager.id, manager.email, manager.officeNumber, manager.role);
  data["manager"] = mgr;
  if (logIt) console.log(data);

  let ans = promptSync("Add Interns to the team (y/n) Y?");
  console.clear();
  data["interns"] = [];
  if (ans == null || ans == "") ans = "y";
  while (ans.charAt(0) !== "n") {
    console.log("=".repeat(20));
    let intern = await inquirer.prompt(internQuestions);
    console.log(intern);
    let intrn = new Intern(intern.name, intern.id, intern.email, intern.school, intern.role);
    console.log(intrn);
    data["interns"].push(intrn);
    ans = promptSync("Add another intern to the team (y/n) Y?");
    if (ans == null || ans == "") ans = "y";
  }
  console.log("\nAre we waiting?\n");

  ans = promptSync("Add Engineers to the team (y/n) Y?");
  if (ans == null || ans == "") ans = "y";
  console.clear();
  data["engineers"] = [];
  while (ans.charAt(0) !== "n") {
    console.log("=".repeat(20));
    let engineer = await inquirer.prompt(engineerQuestions);
    console.log(engineer);
    let engr = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github, engineer.role);
    console.log(engr);
    data["engineers"].push(engr);
    ans = promptSync("Add another engineer to the team (y/n) Y?");
    if (ans == null || ans == "") ans = "y";
  }
}

let engineerTemplate = utilities.loadTemplate("./templates/engineer.html");
let internTemplate = utilities.loadTemplate("./templates/intern.html");
let managerTemplate = utilities.loadTemplate("./templates/manager.html");
let mainTemplate = utilities.loadTemplate("./templates/main.html");

data["intern"] = [];
data["engineer"] = [];
console.clear();
dataCollectionCall();

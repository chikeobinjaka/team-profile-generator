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

const internRoles = ["Clerical", "Research", "Gofer", "Social Media", "Code Formatter"];

const managerRoles = ["Project", "Finance", "HR", "Engineering", "Production", "Test", "Software"];

const engineerRoles = ["Junior", "Senior", "Development", "Database", "Architect"];

const employeeQuestions = [
  {
    name: "firstName",
    type: "input",
    message: "First Name? ",
  },
  {
    name: "lastName",
    type: "input",
    message: "Last Name? ",
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
  },
  // {
  //   name: "again",
  //   type: "confirm",
  //   message: "Another Intern? ",
  //   default: true,
  // },
];

const engineerQuestions = [
  ...employeeQuestions,
  {
    name: "role",
    type: "list",
    message: "Choose Engineer Role",
    choices: [...engineerRoles],
  },
  {
    name: "gitHubId",
    type: "input",
    message: "Github ID? ",
  },
  {
    name: "again",
    type: "confirm",
    message: "Another Engineer? ",
    default: true,
  },
];

const managerQuestions = [
  ...employeeQuestions,
  {
    name: "role",
    type: "list",
    message: "Choose Manager Role",
    choices: [...managerRoles],
  },
  {
    name: "telNumber",
    type: "input",
    message: "Phone Number? ",
  },
  //   {
  //     name: "again",
  //     type: "confirm",
  //     message: "Add Team Members? ",
  //     default: true,
  //   },
];

async function internCall() {
  if (logIt) console.log("Calling Intern Inquire...\n\n");
  let intern = await inquirer.prompt(internQuestions);
  if (logIt) console.log(intern);
  let intrn = new Intern(intern.firstName, intern.lastName, intern.role, intern.email, intern.school);
  data["intern"].push(intrn);
  if (logIt) console.log(data);
  if (intern.again) internCall();
  else return;
}

async function engineerCall() {
  if (logIt) console.log("Calling Intern Inquire...\n\n");
  let engineer = await inquirer.prompt(engineerQuestions);
  if (logIt) console.log(engineer);
  let engr = new Intern(intern.firstName, intern.lastName, intern.role, intern.email, intern.school);
  data["engineer"].push(engr);
  if (logIt) console.log(data);
  if (engineer.again) engineerCall();
  else return;
}

let data = {};
async function managerCall() {
  if (logIt) console.log("Calling Manager Inquire...\n\n");
  let manager = await inquirer.prompt(managerQuestions);
  if (logIt) console.log(manager);
  let mgr = new Manager(manager.firstName, manager.lastName, manager.role, manager.email, manager.telNumber);
  data["manager"] = mgr;
  if (logIt) console.log(data);

  let ans = promptSync("Add Interns to the team (y/n) Y?");
  if (ans == null || ans == "") ans = "y";
  while (ans.charAt(0) !== "n") {
    let intern = await inquirer.prompt(internQuestions);
    ans = promptSync("Add Interns to the team (y/n) Y?");
    if (ans == null || ans == "") ans = "y";
  }
  console.log("\nAre we waiting?\n");

  ans = promptSync("Add Engineers to the team (y/n) Y?");
  if (ans == null || ans == "") ans = "y";
  if (ans.toLowerCase().charAt(0) != "n") {
    await engineerCall();
  }
  console.log("\nAre we waiting?\n");
}

let engineerTemplate = utilities.loadTemplate("./templates/engineer.html");
let internTemplate = utilities.loadTemplate("./templates/intern.html");
let managerTemplate = utilities.loadTemplate("./templates/manager.html");
let mainTemplate = utilities.loadTemplate("./templates/main.html");

if (logIt) {
  console.log("==".repeat(20));
  console.log(mainTemplate);
  console.log("==".repeat(20) + "\n");
  console.log(engineerTemplate);
  console.log("==".repeat(20) + "\n");
  console.log(internTemplate);
  console.log("==".repeat(20) + "\n");
  console.log(engineerTemplate);
  console.log("==".repeat(20) + "\n");
  console.log(managerTemplate);
  console.log("==".repeat(20) + "\n");
}
data["intern"] = [];
data["engineer"] = [];
managerCall();

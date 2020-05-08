const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
let engineerTemplate = loadTemplate("./templates/engineer.html");
let internTemplate = loadTemplate("./templates/intern.html");
let managerTemplate = loadTemplate("./templates/manager.html");
let mainTemplate = loadTemplate("./templates/main.html");

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
  {
    name: "again",
    type: "confirm",
    message: "Another Intern? ",
    default: true,
  },
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
  {
      name: "again",
      tyype: "confirm",
      message: "Add Team Members? ",
      default: true,
  }
];

let data = {};
async function managerCall(){
    console.log("Calling Maager Inquuire...");
    let manager = await inquirer.prompt(managerQuestions);
    data["manager"]
    if (manager.again === true){
        
    }
    console.log("Called...");
    console.log(manager);
}

managerCall();
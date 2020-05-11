const fs = require("fs");
/***
 * Replaces placeholder in template.
 * @htmlTemplate The template is the HTML text that is uused to build the employee profile.
 * @placeholder The placeholder is the text that resides within the "{{ }}" marker in the template
 * @replacement : The text that will replace the placeholder
 * @return The template with the replacement. If no replacement is made, the original templatte will be returned.
 */
const replacePlaceHolder = function (htmlTemplate, placeholder, replacement) {
  let retval = null;
  if (htmlTemplate != null && placeholder != null && replacement != null) {
    // retval = htmlTemplate.slice();
    let regex = new RegExp(`{{ ${placeholder} }}`, "g");
    retval = htmlTemplate.replace(regex, replacement);
  }
  return retval;
};

const loadTemplate = function (templateFilePath) {
  let retval = null;
  try {
    if (fs.existsSync(templateFilePath)) {
      retval = fs.readFileSync(templateFilePath, "utf8");
    }
  } catch (err) {}
  return retval;
};

const generateEmployeeId = function () {
  return Math.floor((Math.random() * Date.now()) / 1000000);
};

module.exports = {
  generateEmployeeId: generateEmployeeId,
  replacePlaceHolder: replacePlaceHolder,
  loadTemplate: loadTemplate,
};

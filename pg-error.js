// pg-error.js
// micro-module to make postgresql errors less opaque in node.js
var errors = require('./errors.json');

// formats an error object returned by node-pg
function format(error) {
  if (!error.sqlState) {
    return error;
  }
  var codeObj = lookup(error.sqlState);
  error.code_name = codeObj.code_name;
  error.code_level = codeObj.code_level;
  error.code_group_name = codeObj.code_group_name;

  return error;
}
module.exports.format = format;

function getLevel(code) {
  return lookup(code).code_level;
}
module.exports.getLevel = getLevel;

function getGroupName(code) {
  return lookup(code).code_group_name;
}
module.exports.getGroupName = getGroupName;

function getCodeName(code) {
  return lookup(code).code_name;
}
module.exports.getCodeName = getCodeName;

function lookup(code) {
  // get the first two chars of the code
  var base_code = code.charAt(0) + code.charAt(1);
  if (errors[base_code]) {
    if (errors[base_code][code]) {
      return {
        code_name: errors[base_code][code],
        code_level: errors[base_code].level,
        code_group_name: errors[base_code].group_name
      };
    }
  }
  // return a blank object
  // its keys will be undefined and not require a null check in above functions
  return {};
}
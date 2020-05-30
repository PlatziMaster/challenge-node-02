/* eslint-disable no-console */
const { bold } = require('kleur');

// Handle errors and end the process
function handleFatalError(error) {
  console.log(bold('Something was wrong. Process finished'));
  console.log(bold().red(`[Error]: ${error.message}`));
  process.exit(1);
}

module.exports = handleFatalError;

const helpers = require('./helpers/helper_function');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const screenshotsPath = path.resolve('./screenshots/');

const extensionPopupHtml = 'index.html';
// Last parameter is supposed to be deleted after tab changes are official

if (!fs.existsSync(screenshotsPath)) {
  mkdirp.sync(screenshotsPath);
}

const extensionURL = async function() {
  console.log(chalk.green('Setup Puppeteer'));
  const browser = await helpers.getBrowser();

  // Get Chrome Extension ID without hard-coding it
  /*
  const targets = await  browser.targets();
  const extensionTarget = targets.find(({ _targetInfo }) => {
    return _targetInfo.title === 'To-Do List';
  });
  console.log(extensionTarget);
  const extensionUrl = extensionTarget._targetInfo.url || '';
  const [,, extensionID] = extensionUrl.split('/');
  */
  const extensionURL = `chrome-extension://jimdhomgkpmmhhcegiebdajlkmjgikaf/${extensionPopupHtml}`;

  browser.close();
  return extensionURL;
}();

module.exports = extensionURL;

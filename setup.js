const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const screenshotsPath = path.resolve('./screenshots/');
//const pathToExtension = path.resolve('./build'); // Use this if you have a local build of the extension
//This is the path where the extension build lives in MacOS, for other operating systems please add yours:
const pathToExtension = ('/Users/eledezma/Library/Application Support/Google/Chrome/Default/Extensions/jimdhomgkpmmhhcegiebdajlkmjgikaf/1.3.5_0');

if (!fs.existsSync(screenshotsPath)) {
  mkdirp.sync(screenshotsPath);
}

/**
 * Creates and returns Browser instance with Chrome extension loaded.
 * @returns {Promise<*>} browser
 */
exports.getBrowser = async function() {
  return await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      '--user-agent=PuppeterAgent',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
};

/**
 * Returns Extension URL that will be used as a webpage.
 * @returns {String} extensionURL
 */
exports.extensionURL = async function() {
  console.log(chalk.green('Setup Puppeteer'));

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
  const extensionURL = `chrome-extension://jimdhomgkpmmhhcegiebdajlkmjgikaf/index.html`;
  return extensionURL;
}();


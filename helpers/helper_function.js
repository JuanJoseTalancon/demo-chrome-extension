const puppeteer = require('puppeteer');
const path = require('path');
//const pathToExtension = path.resolve('./build');
const pathToExtension = ('/Users/eledezma/Library/Application Support/Google/Chrome/Default/Extensions/jimdhomgkpmmhhcegiebdajlkmjgikaf/1.3.5_0');
const screenshotsPath = path.resolve('./screenshots/');

/** @param {int} seconds to wait */
exports.waitSeconds = async function (seconds) {
  function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
  await delay(seconds);
};

/**
 * Gets Chrome Extension URL
 * @returns {string} Chrome Extension URL
 * */
exports.getExtensionUrl = async function (params) {
  const extensionPopupHtml = 'index.html';
  const targets = await  global.__BROWSER__.targets();

  const extensionTarget = targets.find(({ _targetInfo }) => {
    return _targetInfo.title === 'Simple To-Do List';
  });
  const extensionUrl = extensionTarget._targetInfo.url || '';
  const [,, extensionID] = extensionUrl.split('/');
  return `chrome-extension://${extensionID}/${extensionPopupHtml}`;
};

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

exports.getTimeStamp = async function() {
  const m = new Date();
  const dateString =
    m.getFullYear() + '-' +
    ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
    ('0' + m.getDate()).slice(-2) + '_' +
    ('0' + m.getHours()).slice(-2) + '-' +
    ('0' + m.getMinutes()).slice(-2) + '-' +
    ('0' + m.getSeconds()).slice(-2);

  return dateString;
};

exports.takeScreenshot = async function(page, imageFileName) {
  const image = imageFileName.split(' ').join('_');
  const png = await page.screenshot({
    path: path.join(screenshotsPath, image),
  });
};

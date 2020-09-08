const path = require('path');
const screenshotsPath = path.resolve('./screenshots/');

/** @param {int} seconds to wait */
exports.waitSeconds = async function (seconds) {
  function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
  await delay(seconds);
};

/**
 * Takes a screenshot of the chrome extension and saves it in a fixed path.
 */
exports.takeScreenshot = async function(page, imageFileName) {
  const image = imageFileName.split(' ').join('_');
  const png = await page.screenshot({
    path: path.join(screenshotsPath, image),
  });
};

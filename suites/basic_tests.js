const ExtensionPage = require('../extension_models/extension_page');
const helpers = require('../helpers/helper_function');
const config = require('../setup');
const expect = require('chai').expect;

suite('Basic Test', async function () {

  let extensionURL;
  let browser;
  let taskPage;

  suiteSetup (async function () {
    extensionURL = await config.extensionURL;
    console.log('extensionURL: ', extensionURL);
  });

  setup(async function () {
    browser = await config.getBrowser();
    taskPage = await browser.newPage();
    await taskPage.setViewport({
      width: 405,
      height: 200,
      deviceScaleFactor: 1,
    });
    await taskPage.goto(extensionURL, {
      waitUntil: 'load',
      timeout: 3000
    });
    await taskPage.waitFor(1000);
    extensionPage = new ExtensionPage(taskPage);
  });

  teardown(async function () {
    console.log('Testcase -', this.currentTest.title, 'Status:', this.currentTest.state);
    if (this.currentTest.state !== 'passed') {
      const imageFileName = `${this.currentTest.title}.png`;
      await helpers.takeScreenshot(taskPage, imageFileName);
    }
    await taskPage.close();
    await browser.close();
  });

  test('Task is properly added', async function()  {
    // User can add tasks
    const task = "Dar curso en QA Minds";
    await extensionPage.typeTask(task);
    expect(await extensionPage.getTaskText()).to.eql(task);
  });

});
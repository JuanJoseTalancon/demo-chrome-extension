class ExtensionPage {
  constructor(page) {
    this.extensionPage = page;

    this.newTask = '#new-task';
    this.addTask = '#submit';
    this.taskParent = 'body > ul > li:nth-child(1) > div.task';
  }

  /**
   * Writes a new task in the extension
   * @returns {Object}
   */

  async typeTask(task_text) {
    await this.extensionPage.type(this.newTask, task_text, {delay:50});
    await this.extensionPage.click(this.addTask);
    await this.extensionPage.waitFor(1000);
  }

  async getTaskText() {
    const taskText = await this.extensionPage.$eval(this.taskParent, e => e.innerHTML);
    console.log('taskText: ', taskText);
    return taskText;
  }

}
module.exports = ExtensionPage;

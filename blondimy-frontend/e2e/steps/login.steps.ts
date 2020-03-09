import { Given, When, Then, Before } from 'cucumber';
import { LoginPage } from '../src/login/login.po'
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { browser } from 'protractor';

let loginPage = new LoginPage();
const expect = chai.expect;

Before(() => {
    loginPage = new LoginPage();
});

Given('I have navigated to the login view', async () => {
  await loginPage.navigateTo();
});

When('I use wrong crendetials {string} and {string}', async (string, string2) => {
  // Write code here that turns the phrase above into concrete actions
  await loginPage.setValues(string, string2);
  await loginPage.submitButton.click();
});

Then('an error message {string} is displayed', (string) => {
    browser.sleep(3000);
    loginPage.errors.getText().then(error => expect(error).to.equal(string));
});

When('I use my correct credentials {string} and {string}', async (string, string2) => {
    // Write code here that turns the phrase above into concrete actions
    await loginPage.setValues(string, string2);
});

Then('I can see my home screen', () => {
    browser.sleep(3000);
    expect(loginPage.home.getText()).to.eventually.equal('Home works!');
});

When('I click in the signin option', async () => {
    await loginPage.switchButton.click();
});

When('I enter my credentials {string} and {string}', async (string, string2) => {
    await loginPage.setValues(string, string2);
});

When('I use an used username as {string}', async function (string) {
    await loginPage.setValues(string, 'example-password');
});
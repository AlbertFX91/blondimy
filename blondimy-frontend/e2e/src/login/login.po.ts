import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  loginForm: ElementFinder;
  username: ElementFinder;
  password: ElementFinder;
  submitButton: ElementFinder;
  switchButton: ElementFinder;
  errors: ElementFinder;
  home: ElementFinder;

  constructor() {
    this.loginForm = element(by.css('#login-form'));
    this.username = element(by.name('username'));
    this.password = element(by.name('password'));
    this.submitButton = element(by.css('#submit-button'));
    this.switchButton = element(by.css("label[for='mode-switch']"));
    this.errors = element(by.css('#error-container'));
    this.home = element(by.css('p'));
  }

  async setValues(username: string, password: string) {
    await this.username.sendKeys(username);
    await this.password.sendKeys(password);
  }

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }
}

import { AppPage } from './app.po';
import { browser, logging, by, element  } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('When a new user enters in the application', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('blondimy-frontend app is running!');
  });
  */
 it('it should display the login page', () => {
    page.navigateTo();
    expect(element(by.css('app-root #login-screen')).isPresent()).toBe(true);
  });

  /* WAITING FOR REGISTER FR */
  /*
  it('it can log in with its credentials', () => {
    var username = element(protractor.By.name('username'));
    var password = element(protractor.By.name('password'));
    var submit = element(protractor.By.tagName('button'));
    
    username.sendKeys('testing');
    password.sendKeys('testing');
    submit.click();
    // expect(element(by.css('//#endregionlogin-form')).isPresent()).toBe(true);
  });
  it('it can display its home page when the user has been logged', () => {
    var EC = protractor.ExpectedConditions;
    var isDisplayed = EC.visibilityOf(element(by.css('p')));

    browser.wait(isDisplayed, 1000);

    expect(element(by.css('p')).getText()).toEqual("home works!");
  });
  */
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

import { LoginPage } from './login.po';
import { browser, logging, by, element  } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('When a new user enters in the application', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

 it('it should display the login page', () => {
    page.navigateTo();
    expect(page.loginForm.isPresent()).toBe(true);
  });

  /* WAITING FOR REGISTER FR */
  it('it can log in with its credentials', () => {
    page.setValues('testing', 'testing');
    page.submitButton.click();
    expect(page.errors.isPresent()).toBe(false);
  });
  it('it can display its home page when the user has been logged', () => {
    var EC = protractor.ExpectedConditions;
    var isDisplayed = EC.visibilityOf(element(by.css('p')));

    browser.wait(isDisplayed, 1000);

    expect(element(by.css('p')).getText()).toEqual("home works!");
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

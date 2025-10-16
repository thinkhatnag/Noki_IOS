import LoginPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js";
import HomePage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js";
import {
  verify,
  verifyAndClick,
  validate,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import { all } from "axios";
describe("English", () => {
  beforeEach(() => {
    allureReporter.addOwner("Mobile Team");
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addParentSuite("English");
  });
  describe("Login", () => {
    befoireEach(async () => {
      await LoginPage.restartApp();
    })

    it("Login UI Verification", async () => {
      await validate(LoginPage.emailField);
      await LoginPage.emailField;
      await validate(LoginPage.passwordField);
      await validate(LoginPage.loginButton);
      await validate(LoginPage.forgotPassword);
    });
  

    it(`Error message verification: "Password not Provided"`, async () => {
      await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
      await LoginPage.selectMultiTenant();
      await LoginPage.clickLogin();
      await validate(LoginPage.errorMessage);
    });

    it(`Error message verification: "short Password"`, async () => {
      await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
      await LoginPage.enterPassword("123456");
      await LoginPage.selectMultiTenant();
      await LoginPage.clickLogin();
      await validate(LoginPage.shortPassword);
    });

    it(`Error messge verification: "Email is not provided"`, async () => {
      await LoginPage.enterEmail("  ");
      await LoginPage.clickLogin();
      await validate(LoginPage.emailError);
    });

    it(`Error message verification: "invalid Email"`, async () => {
      await LoginPage.enterEmail("nag.subbarayudu@");
      await LoginPage.clickLogin();
      await validate(LoginPage.invalidEmailError);
    });

    it(`Error message verification: "not registered Email"`, async () => {
      await LoginPage.enterEmail("vqejvcievciye@gmail.com");
      await validate(LoginPage.emailNotRegisteredError);
    });

    it(`Error message verification: "wrong password"`, async () => {
      await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
      await LoginPage.enterPassword("Welcome@124");
      await LoginPage.selectMultiTenant();
      await LoginPage.clickLogin();
      await validate(LoginPage.WrongPassword);
    });

    it("Login with correct credentials & verify Home screen", async () => {
      await LoginPage.enterEmail(process.env.Email);
      await LoginPage.enterPassword(process.env.Password);
      await LoginPage.selectMultiTenant();
      await LoginPage.clickLogin();
      await validate(LoginPage.homescreenAnimation);
    });
  });

})
import {
  validate,
  verify,
  verifyAndClick,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import allureReporter from "@wdio/allure-reporter";
import LoginPage from "../../screenObjectModel/login.page.js";
describe("Spanish", () => {
  beforeEach(() => {
    allureReporter.addOwner("Mobile Team");
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addParentSuite("Spanish");
  });
  describe("Login", () => {
  
    beforeEach(async () => {
      await LoginPage.restartApp();
    });

      it("Login ES_UI element Verification", async () => {
        await validate(SpanishLanguage.forgotPassword);
        await validate(SpanishLanguage.emailField);
        await validate(SpanishLanguage.passwordField);
        await validate(SpanishLanguage.loginButton);
        await validate(SpanishLanguage.forgotPassword);
      });
    
 
      it(`Error message verification: "password not provided" `, async () => {
        await SpanishLanguage.enterEmail("nag.subbarayudu@thinkhat.ai");
        await SpanishLanguage.selectMultiTenant();
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.errorMessage);
      });

      it(`Error message verification: "short password"`, async () => {
        await SpanishLanguage.enterEmail("nag.subbarayudu@thinkhat.ai");
        await SpanishLanguage.enterPassword("123456");
        await SpanishLanguage.selectMultiTenant();
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.shortPassword);
      });

      it(`Error message verification: "Email not provided"`, async () => {
        await SpanishLanguage.enterEmail(" ");
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.emailError);
      });

      it(`Error message verifcation: "invalid Email"`, async () => {
        await SpanishLanguage.enterEmail("bheema.badri@");
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.invalidEmailError);
      });

      it(`Error message verification: "unrigisted mail"`, async () => {
        await SpanishLanguage.enterEmail("vqejvcievciye@gmail.com");
        await verify(SpanishLanguage.emailNotRegisteredError);
      });

      it(`Error message verification: "Wrong password"`, async () => {
        await SpanishLanguage.enterEmail(process.env.Email);
        await SpanishLanguage.enterPassword("Welcome@124");
        await SpanishLanguage.selectMultiTenant();
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.WrongPassword);
      });

      it("Login with correct credential and verify Home screen animation", async () => {
        await SpanishLanguage.enterEmail(process.env.Email);
        await SpanishLanguage.enterPassword(process.env.Password);
        await SpanishLanguage.selectMultiTenant();
        await SpanishLanguage.clickLogin();
        await verify(SpanishLanguage.homescreenAnimation);
      });
    });
  

  })
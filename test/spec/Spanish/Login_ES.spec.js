import { verify, verifyAndClick } from "../../../helpers/helper.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import allureReporter from "@wdio/allure-reporter";
import LoginPage from "../../screenObjectModel/login.page.js";
import HomePage from "../../screenObjectModel/home.page.js";
beforeEach(() => {
  allureReporter.addSubSuite("Login");
});
beforeEach(async () => {
  await LoginPage.restartApp();
});

it("Login UI element Verification -Es", async () => {
  await verify(SpanishLanguage.forgotPassword);
  await verify(SpanishLanguage.emailField);
  await verify(SpanishLanguage.passwordField);
  await verify(SpanishLanguage.loginButton);
  await verify(SpanishLanguage.forgotPassword);
});

it(`Login Error message verification: "password not provided" -Es `, async () => {
  await SpanishLanguage.enterEmail("nag.subbarayudu@thinkhat.ai");
  await verifyAndClick(SpanishLanguage.Done);
  await SpanishLanguage.selectMultiTenant();
  await SpanishLanguage.clickLogin();
  await verify(SpanishLanguage.errorMessage);
});

it(`Login Error message verification: "short password" -Es`, async () => {
  await SpanishLanguage.enterEmail("nag.subbarayudu@thinkhat.ai");
  await SpanishLanguage.enterPassword("123456");
  await SpanishLanguage.selectMultiTenant();
  await SpanishLanguage.clickLogin();
  await verify(SpanishLanguage.shortPassword);
});

it(`Login Error message verification: "Email not provided" -Es`, async () => {
  await SpanishLanguage.enterEmail(" ");
  await SpanishLanguage.clickLogin();
  await verify(SpanishLanguage.emailError);
});
it(`Login Error message verifcation: "invalid Email" -Es`, async () => {
  await SpanishLanguage.enterEmail("bheema.badri@");
  await SpanishLanguage.clickLogin();
  await verify(SpanishLanguage.invalidEmailError);
});

it(`Login Error message verification: "unrigisted mail" -Es`, async () => {
  await SpanishLanguage.enterEmail("vqejvcievciye@gmail.com");
  await verify(SpanishLanguage.emailNotRegisteredError);
});

it(`Login Error message verification: "Wrong password" -Es`, async () => {
  await SpanishLanguage.enterEmail(process.env.Email);
  await SpanishLanguage.enterPassword("Welcome@124");
  await SpanishLanguage.selectMultiTenant();
  await SpanishLanguage.clickLogin();
  await verify(SpanishLanguage.WrongPassword);
});

it("Login with correct credential and verify Home screen animation -Es", async () => {
  await SpanishLanguage.enterEmail(process.env.Email);
  await SpanishLanguage.enterPassword(process.env.Password);
  await SpanishLanguage.selectMultiTenant();
  await SpanishLanguage.clickLogin();
  await HomePage.notNowBtn.click();
  await verify(SpanishLanguage.homescreenAnimation);
});

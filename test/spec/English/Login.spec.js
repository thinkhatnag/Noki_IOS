import LoginPage from "../../screenObjectModel/login.page.js";
import HomePage from "../../screenObjectModel/home.page.js";
import { verify, verifyAndClick } from "../../../helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
beforeEach(() => {
  allureReporter.addSubSuite("Login");
});
beforeEach(async () => {
  await LoginPage.restartApp();
});

it("Login UI Verification", async () => {
  await verify(LoginPage.emailField);
  await LoginPage.emailField;
  await verify(LoginPage.passwordField);
  await verify(LoginPage.loginButton);
  await verify(LoginPage.forgotPassword);
});

it(`Error message verification: "Password not Provided"`, async () => {
  await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
  await LoginPage.selectMultiTenant();
  await LoginPage.clickLogin();
  await verify(LoginPage.errorMessage);
});

it(`Error message verification: "short Password"`, async () => {
  await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
  await LoginPage.enterPassword("123456");
  await LoginPage.selectMultiTenant();
  await LoginPage.clickLogin();
  await verify(LoginPage.shortPassword);
});

it(`Error messge verification: "Email is not provided"`, async () => {
  await LoginPage.enterEmail("  ");
  await LoginPage.clickLogin();
  await verify(LoginPage.emailError);
});

it(`Error message verification: "invalid Email"`, async () => {
  await LoginPage.enterEmail("nag.subbarayudu@");
  await LoginPage.clickLogin();
  await verify(LoginPage.invalidEmailError);
});

it(`Error message verification: "not registered Email"`, async () => {
  await LoginPage.enterEmail("vqejvcievciye@gmail.com");
  await verify(LoginPage.emailNotRegisteredError);
});

it(`Error message verification: "wrong password"`, async () => {
  await LoginPage.enterEmail("nag.subbarayudu@thinkhat.ai");
  await LoginPage.enterPassword("Welcome@124");
  await LoginPage.selectMultiTenant();
  await LoginPage.clickLogin();
  await verify(LoginPage.WrongPassword);
});

it("Login with correct credentials & verify Home screen", async () => {
  await LoginPage.enterEmail(process.env.Email);
  await LoginPage.enterPassword(process.env.Password);
  await LoginPage.selectMultiTenant();
  await LoginPage.clickLogin();
  await verify(LoginPage.homescreenAnimation);
});

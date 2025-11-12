import LoginPage from "../../screenObjectModel/login.page.js";
import { verify, verifyAndClick, validate } from "../../../helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";

describe("English", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("English");
  });
  beforeEach(async () => {
    await LoginPage.restartApp();
  });

  it("Verify all Forgot Passwi=ord screen Elements", async () => {
    await verifyAndClick(LoginPage.forgotPassword);
    await validate(LoginPage.forgotPasswordEmailField);
    await validate(LoginPage.sendResetLinkBtn);
    await validate(LoginPage.loginLink);
  });

  it(`Error message verification: "Email is not rigisterd"`, async () => {
    await verifyAndClick(LoginPage.forgotPassword);
    await LoginPage.enterForgotPasswordEmail("nag.subbarayudu@gmail.com");
    await verify(LoginPage.emailNotRegisteredError);
    await verifyAndClick(LoginPage.loginLink);
  });
  it(`Error message verification: "Invalid Email"`, async () => {
    await verifyAndClick(LoginPage.forgotPassword);
    await LoginPage.enterForgotPasswordEmail("bheema.badri@");
    await verify(LoginPage.invalidEmailError);
    await verifyAndClick(LoginPage.loginLink);
  });

  it(`Error message verifcation: "Email not Enterd"`, async () => {
    await verifyAndClick(LoginPage.forgotPassword);
    await LoginPage.enterForgotPasswordEmail("  ");
    await verify(LoginPage.emailError);
    await verifyAndClick(LoginPage.loginLink);
  });

  it(`verify the succes message for correct Email generation to re set the password`, async () => {
    await verifyAndClick(LoginPage.forgotPassword);
    console.log("Email env:", process.env.Email);
    await LoginPage.enterForgotPasswordEmail(process.env.Email);
    await verify(LoginPage.successMessageForResetLink);
    await verifyAndClick(LoginPage.continueToLogin);
    await validate(LoginPage.emailField);
  });
});

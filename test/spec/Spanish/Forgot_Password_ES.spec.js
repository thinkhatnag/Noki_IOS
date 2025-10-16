import LoginPage from "../../screenObjectModel/login.page.js";
import { verify, verifyAndClick } from "../../../helpers/helper.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import allureReporter from "@wdio/allure-reporter";

describe("Spanish", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("Spanish");
  });
  beforeEach(async () => {
    await LoginPage.restartApp();
  });

  it("", async () => {
    await verifyAndClick(SpanishLanguage.forgotPassword);
    await verify(SpanishLanguage.forgotPasswordEmailField);
    await verify(SpanishLanguage.sendResetLinkBtn);
    await verify(SpanishLanguage.loginLink);
  });

  it("", async () => {
    await LoginPage.restartApp();
    await verifyAndClick(SpanishLanguage.forgotPassword);
    await SpanishLanguage.enterForgotPasswordEmail("nag.subbarayudu@gmail.com");
    await verify(SpanishLanguage.emailNotRegisteredError);
    await verifyAndClick(SpanishLanguage.loginLink);
  });
  it("", async () => {
    await LoginPage.restartApp();
    await verifyAndClick(SpanishLanguage.forgotPassword);
    await SpanishLanguage.enterForgotPasswordEmail("bheema.badri@");
    await verify(SpanishLanguage.invalidEmailError);
    await verifyAndClick(SpanishLanguage.loginLink);
  });

  it("", async () => {
    await LoginPage.restartApp();
    await verifyAndClick(SpanishLanguage.forgotPassword);
    await SpanishLanguage.enterForgotPasswordEmail("  ");
    await verify(SpanishLanguage.forgotPasswordEmailError);
    await verifyAndClick(SpanishLanguage.loginLink);
  });

  it.skip("", async () => {
    await LoginPage.restartApp();
    await verifyAndClick(SpanishLanguage.forgotPassword);
    await SpanishLanguage.enterForgotPasswordEmail(process.env.Email);
    await verify(SpanishLanguage.successMessageForResetLink);
    await verifyAndClick(SpanishLanguage.continueToLogin);
  });
});

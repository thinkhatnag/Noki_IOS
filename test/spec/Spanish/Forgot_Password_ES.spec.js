import LoginPage from "../../screenObjectModel/login.page.js";
import { verify, verifyAndClick } from "../../../helpers/helper.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import allureReporter from "@wdio/allure-reporter";

beforeEach(() => {
  allureReporter.addSubSuite("Forgot Password");
});
beforeEach(async () => {
  await LoginPage.restartApp();
});

// it("Forgot PassWord UI verification -Es", async () => {
//   await verifyAndClick(SpanishLanguage.forgotPassword);
//   await verify(SpanishLanguage.forgotPasswordEmailField);
//   await verify(SpanishLanguage.sendResetLinkBtn);
//   await verify(SpanishLanguage.loginLink);
// });

// it("Verify Error message when unrigistered mail is Entered -Es", async () => {
//   await LoginPage.restartApp();
//   await verifyAndClick(SpanishLanguage.forgotPassword);
//   await SpanishLanguage.enterForgotPasswordEmail("nag.subbarayudu@gmail.com");
//   await verify(SpanishLanguage.emailNotRegisteredError);
//   await verifyAndClick(SpanishLanguage.loginLink);
// });
// it("Verify Error message when Invalid mail is Entered -Es", async () => {
//   await LoginPage.restartApp();
//   await verifyAndClick(SpanishLanguage.forgotPassword);
//   await SpanishLanguage.enterForgotPasswordEmail("bheema.badri@");
//   await verify(SpanishLanguage.invalidEmailError);
//   await verifyAndClick(SpanishLanguage.loginLink);
// });

// it("Verify Error message when mail is not Entered -Es", async () => {
//   await LoginPage.restartApp();
//   await verifyAndClick(SpanishLanguage.forgotPassword);
//   await SpanishLanguage.enterForgotPasswordEmail("  ");
//   await verify(SpanishLanguage.forgotPasswordEmailError);
//   await verifyAndClick(SpanishLanguage.loginLink);
// });

it("Verify Reset Password mail generation -Es", async () => {
  await LoginPage.restartApp();
  await verifyAndClick(SpanishLanguage.forgotPassword);
  await SpanishLanguage.enterForgotPasswordEmail(process.env.Email);
  await verify(SpanishLanguage.successMessageForResetLink);
  await verifyAndClick(SpanishLanguage.continueToLogin);
  await LoginPage.activategmailApp();
  await LoginPage.restartApp();
});

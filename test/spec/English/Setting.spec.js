import LoginPage from "../../screenObjectModel/login.page.js";
import HomePage from "../../screenObjectModel/home.page.js";
import { verify, verifyAndClick } from "../../../helpers/helper.js";
import SettingsPage from "../../screenObjectModel/setting.page.js";
import allureReporter from "@wdio/allure-reporter";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage";
beforeEach(() => {
  allureReporter.addSubSuite("Settings screen");
});
it.skip("Verify Settings screen Profille Edit #Skipped:-proffile edit is skipped due to Known Issue, related to Api change", async () => {
  await LoginPage.restartApp();
  await verifyAndClick(HomePage.settings);
  await SettingsPage.profileSettingScreen();
});
it("Verify Settings screen support_Verification ", async () => {
  await SettingsPage.support_VerifiCation();
});

it("Verify  launguag change option", async () => {
  await SettingsPage.launguageChange();
});
it("Verify  general settings ", async () => {
  await SettingsPage.generalSettingsUpdate();
});

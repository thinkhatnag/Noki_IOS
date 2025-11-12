import LoginPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js";
import HomePage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js";
import {
  verify,
  verifyAndClick,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import adapterFactory from "@wdio/mocha-framework";
import allureReporter from "@wdio/allure-reporter";
import spanishLanguage from "../../screenObjectModel/spanishLanguage";
describe("English", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("English");
  });
  describe("setting screen ", () => {
    beforeEach(() => {
      allureReporter.addSuite("Setting screen");
    });
    it.skip("Verify Settings screen Profille Edit #Skipped:-proffile edit is skipped due to Known Issue, related to Api change", async () => {
      await LoginPage.restartApp();
      await verifyAndClick(HomePage.settings);
      await SettingsPage.profileSettingScreen();
    });
    it("Verify Settings screen support_VerifiCation ", async () => {
      await SettingsPage.support_VerifiCation();
    });

    it("Verify Settings screen launguage", async () => {
      await SettingsPage.launguageChange();
    });
    it("Verify Settings screen launguage", async () => {
      await SettingsPage.generalSettingsUpdate();
    });
  });
});

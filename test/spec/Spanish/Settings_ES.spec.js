import allureReporter from "@wdio/allure-reporter";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
beforeEach(() => {
  allureReporter.addSubSuite("Settings screen");
});

it.skip("Verify Settings screen Profille Edit ", async () => {
  await SpanishLanguage.profileSettingScreen();
});
it("Verify Settings screen support verification ", async () => {
  await SpanishLanguage.support_VerifiCation();
});

it.only("Verify Settings screen launguage and general settings", async () => {
  await SpanishLanguage.launguageChange();
});
it("Verify Settings screen general settings", async () => {
  await SpanishLanguage.generalSettingsUpdate();
});

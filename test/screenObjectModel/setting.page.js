import {
  verifyAndClick,
  verify,
  waitForElement,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import HomePage from "./home.page.js";
import RecordingPage from "./recording.page.js";
import { faker } from "@faker-js/faker";
import SpanishLanguage from "./spanishLanguage.js";
import LoginPage from "./login.page.js";
import { homeEnvVarCheck } from "appium-xcuitest-driver/build/lib/doctor/required-checks.js";
class SettingsPage {
  get stettings() {
    return $('//XCUIElementTypeNavigationBar[@name="Settings"]');
  }
  get nokiDashBoard() {
    return $("~noki dashboard");
  }
  get startNewEncounter() {
    return $(``);
  }
  get profileSettings() {
    return $("~profilesettings");
  }
  get help() {
    return $("~support");
  }
  get phone() {
    return $("~phone");
  }
  get text() {
    return $("~text");
  }
  get phoneText() {
    return $("~text");
  }
  get messagetext() {
    return $("~text");
  }

  get email() {
    return $("~email");
  }
  get() {
    return $(``);
  }
  get() {
    return $(``);
  }
  get launguage() {
    return $("~language");
  }
  get Idioma() {
    return $("~Idioma");
  }
  get generalSettings() {
    return $("~General Settings");
  }
  get generalSettingsShowUp() {
    return $("~chevron.down");
  }
  get generalSettingsClose() {
    return $("~chevron.up");
  }
  get logoutBtn() {
    return $("~logout");
  }
  get name() {
    return $("~nagasurendra Badri");
  }
  get back() {
    return $("~backArrow");
  }
  get profileEditback() {
    return $("~arrow.backward");
  }
  get ConsultWithUS() {
    return $("~Consult with us!");
  }
  get WriteUsNow() {
    return $("~Write to us now!");
  }
  get english() {
    return $("~Inglés");
  }
  get Inglish() {
    return $('(//XCUIElementTypeStaticText[@name="LanguageSettingTVC"])[1]');
  }
  get spanish() {
    return $("~Spanish");
  }
  get edit() {
    return $("~Edit");
  }
  get firstName() {
    return $('//XCUIElementTypeTextField[@value="Naga"]');
  }
  get firstNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"
    );
  }
  get middleName() {
    return $('//XCUIElementTypeTextField[@value="Naga"]');
  }
  get middleNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]"
    );
  }
  get lastName() {
    return $('//XCUIElementTypeTextField[@value="Subbarayudu"]');
  }
  get lastNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]"
    );
  }
  get home() {
    return $("~home");
  }
  get save() {
    return $("~Save");
  }
  get cancel() {
    return $("~Cancel");
  }
  get speciality() {
    return $("~speciality");
  }
  get loginMail() {
    return $("~nag.subbarayudu@thinkhat.ai");
  }

  get selectAllOn() {
    return $("~selectallbuttonoff");
  }

  get selectAllOff() {
    return $("~selectallbuttonon");
  }
  get cdss() {
    return $("~cdsson");
  }
  get cdssDisabled() {
    return $("~cdssoff");
  }
  get diognosisJustificationDisabled() {
    return $("~diagnosisjustificationoff");
  }

  get diognosisJustification() {
    return $("~diagnosisjustificationon");
  }
  get logoutcancelationBtn() {
    return $("~no");
  }
  get logoutBtn() {
    return $("~logout");
  }
  get logoutConformationBtn() {
    return $("~yes");
  }
  get logingoutText() {
    return $("~Are you sure you want to logout?");
  }
  get sync() {
    return $("~syncing");
  }
  get Done() {
    return $("~done");
  }

  get ok() {
    return $("~OK");
  }
  get hideKeyBoard() {
    return $("~Return");
  }

  get firstnameError() {
    return $(`~First Name is required.`);
  }
  get lastNameError() {
    return $(`~Last Name is required.`);
  }
  get phoneNumberError() {
    return $(`~Phone is required.`);
  }
  get specialityserchField() {
    return $(`//XCUIElementTypeTextField[@value="Search Speciality"]`);
  }
  get enterSpcificSpecialityTextField() {
    return $(
      `//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[4]`
    );
  }
  get specialityDropDown() {
    return $(`~arrowtriangle.down.fill`);
  }
  get specificSpecialityError() {
    return $(`~Speciality is required.`);
  }
  get phoneNumberTextfield() {
    return $(`//XCUIElementTypeTextField[@value="Phone Number"]`);
  }

  get keyboardClose() {
    return $(`~Return`);
  }
  get number() {
    return $(`//XCUIElementTypeTextField[@value="(999) 999-9999"]`);
  }
  get noChangeInfoMessage() {
    return $(`~No changes to update!`);
  }
  get call() {
    return $(`~Call +1 (516) 550-7579`);
  }
  get callCancel() {
    return $('-ios class chain:**/XCUIElementTypeButton[`name == "Cancel"`]');
  }

  async profileSettingScreen() {
    await verifyAndClick(this.profileSettings);
    await verifyAndClick(this.edit);
    await verifyAndClick(this.firstName);
    await this.firstName.clearValue();
    await this.lastName.clearValue();
    await driver.execute("mobile: swipe", { direction: "up" });
    await verifyAndClick(this.number);
    await this.number.clearValue();
    await verifyAndClick(this.specialityDropDown);
    await verifyAndClick(this.specialityserchField);
    await this.specialityserchField.setValue("Other");
    await $(`~Other`).click();
    await verifyAndClick(this.enterSpcificSpecialityTextField);
    await driver.execute("mobile: swipe", { direction: "down" });
        await driver.execute("mobile: swipe", { direction: "down" });
    await verifyAndClick(this.firstNameTextField);
    await verifyAndClick(this.keyboardClose);
    await verifyAndClick(this.save);
    await driver.pause(3000);
    await verify(this.firstnameError);
    await verify(this.lastNameError);
    await verify(this.specificSpecialityError);
    await driver.execute("mobile: swipe", { direction: "up" });
    await verify(this.phoneNumberError);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.edit);
    const FirstName = await this.firstNameTextField.setValue("Naga");
    await verifyAndClick(this.middleName);
    const MiddleName = await this.middleNameTextField.setValue("Surendra");
    const LastName = await this.lastNameTextField.setValue("Subbarayudu");
    const PhoneNumber = await this.number.setValue("9999999999");
    await driver.execute("mobile: swipe", { direction: "down" });
    await verifyAndClick(this.firstNameTextField);
    await verifyAndClick(this.keyboardClose);
    await driver.execute("mobile: swipe", { direction: "up" });
    await verifyAndClick(this.cancel);
    await driver.pause(4000);
    await verifyAndClick(this.ok);
    await verifyAndClick(this.profileEditback);
    await verifyAndClick(this.profileSettings);
    await verifyAndClick(this.edit);
    await verify(this.firstName);
    await verify(this.middleName);
    await verify(this.lastName);
    await verify(this.number);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.profileEditback);
  }
  async empttFirstNameErrorValidation() {
    await verifyAndClick(this.profileSettings);
    await verifyAndClick(this.edit);
    await verifyAndClick(this.firstName);
    await this.firstName.clearValue();
    await verifyAndClick(this.save);
    await verify(this.firstnameError);
  }
  async firstNameUpdateValidation() {
    const FirstName = await this.firstNameTextField.setValue("Naga");
    await verifyAndClick(this.save);
    await verify(this.noChangeInfoMessage);
    await verifyAndClick(this.ok);
  }
  async LastNameErrorValidation() {
    await verifyAndClick(this.lastName);
    await this.lastName.clearValue();
    await verifyAndClick(this.save);
    await verify(this.lastNameError);
  }
  async LastNameUpdateValidation() {
    const LastName = await this.lastNameTextField.setValue("Subbarayudu");
    await verifyAndClick(this.phoneNumberTextfield);
    await this.phoneNumberTextfield.clearValue();
    await verifyAndClick(this.save);
    await verify(this.phoneNumberError);
  }
  async LastNameUpdateValidation() {
    const LastName = await this.lastNameTextField.setValue("Subbarayudu");
    await verifyAndClick(this.phoneNumberTextfield);
    await this.phoneNumberTextfield.clearValue();
    await verifyAndClick(this.save);
    await verify(this.phoneNumberError);
  }
  async specificSpecialityErrorValidation() {
    await verifyAndClick(this.specialityDropDown);
    await verifyAndClick(this.specialityserchField);
    await this.specialityserchField.setValue("Other");
    await $(`~Other`).click();
    await this.enterSpcificSpecialityTextField.clearValue();
    await verifyAndClick(this.save);
    await verify(this.specificSpecialityError);
  }
  async specificSpecialityUpdateValidation() {
    const enterSpcificSpeciality =
      await this.enterSpcificSpecialityTextField.setValue("Ortho");
    await verifyAndClick(this.save);
    await verify(this.noChangeInfoMessage);
    await verifyAndClick(this.ok);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.profileEditback);
  }

  async support_VerifiCation() {
    await LoginPage.restartApp();
    await waitForElement(HomePage.startNewEncounterButton);
    await verifyAndClick(HomePage.settings); // till the profile edit is working or not
    await verifyAndClick(this.help);
    // await verifyAndClick(this.phone);
    // await this.call.click()
    // await driver.pause(2000)

    // const phoneBundleId = "com.apple.Numbers"; // phone's bundle ID for iOS

    // // Check if phone is in the foreground (state 4 indicates the app is active)
    // const appState = await driver.execute("mobile: queryAppState", {
    //   bundleId: phoneBundleId,
    // });
    // if (appState !== 4) {
    //   throw new Error(
    //     `phone (${phoneBundleId}) is not active. Current app state: ${appState}`
    //   );
    // }

    // console.log("phone is active");
    // await verifyAndClick(this.callCancel)
    // // Pause for 5 seconds
    // await driver.pause(5000);
    // if (!(await this.phone.isExisting())) {
    //   await verifyAndClick(HomePage.settings);
    //   await verifyAndClick(this.help);
    // }
    await verifyAndClick(this.email);
    const gmailBundleId = "com.google.Gmail";
    const gmailAppState = await driver.execute("mobile: queryAppState", {
      bundleId: gmailBundleId,
    });
    if (gmailAppState !== 4) {
      throw new Error(
        `Gmail (${gmailBundleId}) is not active. Current app state: ${gmailAppState}`
      );
    }
    console.log("Gmail is active");
    await driver.activateApp(process.env.BUNDLE_ID);
    // await verifyAndClick(this.help);
    if (!(await this.phone.isExisting())) {
      await verifyAndClick(HomePage.settings);
      await verifyAndClick(this.help);
    }
    await verifyAndClick(this.text);
    // Verify Messages is active
    const messagesBundleId = "com.apple.MobileSMS";
    const messagesAppState = await driver.execute("mobile: queryAppState", {
      bundleId: messagesBundleId,
    });
    if (messagesAppState !== 4) {
      throw new Error(
        `Messages (${messagesBundleId}) is not active. Current app state: ${messagesAppState}`
      );
    }
    console.log("Messages is active");
    // Pause for 5 seconds and switch back
    await driver.activateApp(process.env.BUNDLE_ID);
  }
  async launguageChange() {
    await LoginPage.restartApp();
    await waitForElement(HomePage.startNewEncounterButton);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(this.launguage);
    await verifyAndClick(this.spanish);
    await verify(this.Idioma);
    await verifyAndClick(this.home);
    await verify(SpanishLanguage.startNewEncounter);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(SpanishLanguage.Idioma);
    await verifyAndClick(SpanishLanguage.english);
    await verify(this.launguage);
  }
  async generalSettingsUpdate() {
    await LoginPage.restartApp();
    await waitForElement(HomePage.startNewEncounterButton);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(this.generalSettings);
    await verifyAndClick(this.selectAllOff);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.cdssDisabled);
    await verify(this.diognosisJustificationDisabled);
    await verifyAndClick(this.selectAllOn);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.selectAllOff);
    await verify(this.cdss);
    await verify(this.diognosisJustification);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.generalSettings);
    await verifyAndClick(this.cdss);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.cdssDisabled);
    await verifyAndClick(this.cdssDisabled);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.diognosisJustification);
    await verifyAndClick(this.diognosisJustification);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.diognosisJustificationDisabled);
    await verifyAndClick(this.diognosisJustificationDisabled);
    await verifyAndClick(this.Done);
    await verifyAndClick(this.generalSettings);
    await verify(this.selectAllOff);
    await verifyAndClick(this.cancel);
  }
}

export default new SettingsPage();

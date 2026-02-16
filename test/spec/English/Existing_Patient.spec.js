import HomePage from "../../screenObjectModel/home.page.js";
import PatientsPage from "../../screenObjectModel/patients.page.js";
import EncounterPage from "../../screenObjectModel/encounter.page.js";
import SearchPatientPage from "../../screenObjectModel/searchPatient.page.js";
import RecordingPage from "../../screenObjectModel/recording.page.js";
// import AddPatitentPage from '../../screenObjectModel/addPatient.page.js';
import LoginPage from "../../screenObjectModel/login.page.js";
import {
  verify,
  verifyAndClick,
  waitForElement,
  aeroplaneModeOff,
  aeroplaneModeOn,
  validate,
  aeroplanemodeswipe,
} from "../../../helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import AudioManeger from "../../screenObjectModel/audioManeger.js";
import QuickActions from "../../screenObjectModel/quickActions.page.js";
import SettingPage from "../../screenObjectModel/setting.page.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
beforeEach(() => {
  allureReporter.addSubSuite("New Encounter E2E Flow");
});
it("New Encounter Creation", async () => {
  await LoginPage.restartApp();
  await driver.pause(3000);
  await SearchPatientPage.startNewConversation("Naga");
});

it("Automatic Sync Verification (Offline to Online and Vice Versa)", async () => {
  await AudioManeger.playAudio("english");
  console.log("Audio started:", AudioManeger.currentAudioFile);
  await RecordingPage.recordAudioforOfflineModeMT();
  await driver.pause(10000);
  await verifyAndClick(RecordingPage.pauseBtn);
  await AudioManeger.pauseAudio();
  console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
  await driver.pause(20000);
  await verifyAndClick(RecordingPage.playBtn);
});
it("App Killed and Reopened (Offline Mode Verification)", async () => {
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online});
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await aeroplaneModeOn();
  await driver.pause(5000);
  await AudioManeger.pauseAudio();
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying thp screen to be in recording screen even in offline
  await driver.pause(10000);
  await driver.activateApp(process.env.BUNDLE_ID);
  // await verifyAndClick(RecordingPage.errorOk)    // debug app step will not be avalable in the test/prod
  await waitForElement(RecordingPage.ContinueBtn);
  await validate(RecordingPage.ContinueBtn);
  await verifyAndClick(RecordingPage.ContinueBtn);
  console.log(
    "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page",
  );
});

it("App Killed in Offline and Reopened in Online Mode Verification", async () => {
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
  await driver.pause(10000);
  await aeroplanemodeswipe(); //online
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await waitForElement(RecordingPage.ContinueBtn);
  await validate(RecordingPage.ContinueBtn);
  await verifyAndClick(RecordingPage.ContinueBtn);
  console.log(
    "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page",
  );
  await aeroplanemodeswipe();
});
it("Offline Mode Stop and App Kill Verification", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await AudioManeger.stopAudio();
  await verifyAndClick(RecordingPage.stopBtn);
  console.log(
    "here after app got closed while recording we magaing automatically again resumed the audio",
  );
  await driver.pause(5000);
  await verify(RecordingPage.offlineConversationSaved);
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying app is killed after the stop button is clicked
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await verify(RecordingPage.offlineConversationSaved);
  await driver.pause(5000);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await aeroplanemodeswipe();
  await driver.pause(5000);
  await waitForElement(RecordingPage.PrevEncounterRefNo);
  await verify(RecordingPage.PrevEncounterRefYes); // verifying the yes button in the popup
  await verifyAndClick(RecordingPage.PrevEncounterRefNo);
});
it("First Conversation and SOAP Note Generation", async () => {
  {
  }
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue("Naga");
      await PatientsPage.firstEncounterForExistingPatient.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});
it("Transcript Verification for the First Conversation", async () => {
  await RecordingPage.Transcript_Verification();
});
it("Second Conversation for the New Encounter", async () => {
  await verifyAndClick(RecordingPage.SoapNoteBtn);
  await waitForElement(RecordingPage.AddConversation);
  await verifyAndClick(RecordingPage.AddConversation);
  await verifyAndClick(RecordingPage.AddConversationConfirmationYes);
  await AudioManeger.playAudio("english");
  await driver.pause(5000);
  await aeroplaneModeOff(); //offline
  await driver.pause(80000);
  await AudioManeger.stopAudio();
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await verifyAndClick(RecordingPage.endEncounter);
  await verify(RecordingPage.offlineConversationSaved);
  await aeroplanemodeswipe(); //online
  await driver.pause(5000);
  if (await RecordingPage.stopBtn.isDisplayed()) {
    await verifyAndClick(RecordingPage.stopBtn);
    await waitForElement(RecordingPage.PrevEncounterRef);
    await RecordingPage.PrevEncounterRefYes.click();
    allureReporter.addIssue(
      "Here even after clicking End Encouter, soap note generation is not Intiated",
    );
  } else {
    console.log("issue related to api is resolved");
  }
  await RecordingPage.PrevEncounterRefYes.click();
});
it("SOAP Note Verification for the Second Conversation", async () => {
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue("Naga");
      await PatientsPage.firstEncounterForExistingPatient.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});
it("Transcript Verification for the Second Conversation", async () => {
  await RecordingPage.Transcript_Verification();
});
it("Third Conversation (Draft Creation and Completion of Draft Transcript)", async () => {
  await verifyAndClick(RecordingPage.SoapNoteBtn);
  await RecordingPage.third_Conversation_For_Existing_Patient();
});
it("SOAP Note Generation and Verification for the Draft Conversation", async () => {
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue("Naga");
      await PatientsPage.firstEncounterForExistingPatient.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});

it("Transcript Verification for the Draft Conversation", async () => {
  await RecordingPage.Transcript_Verification();
});

it("Generation and Regeneration of Quick Action Templates (ICD & CPT, Care Plan, Feedback, Referral)", async () => {
  await QuickActions.ICD_CPT();
  await QuickActions.care_Plan();
  await QuickActions.feed_back();
  await QuickActions.referal_Letter();
  await QuickActions.SOAPNote();
});
it("Patient Info Update", async () => {
  await RecordingPage.UpdatePatientInfo();
});
it("Patient info manual update", async () => {
  await RecordingPage.manualUpdate();
});
it("HayNoki verification", async () => {
  await RecordingPage.hayNoki();
});

it("Finalize encounter", async () => {
  await RecordingPage.finalize_Encounter();
});
it("Logout ", async () => {
  await LoginPage.restartApp();
  await waitForElement(HomePage.startNewEncounterButton);
  await verifyAndClick(HomePage.settings);
  await verifyAndClick(SettingPage.launguage);
  await verifyAndClick(SettingPage.spanish);
  await verifyAndClick(SpanishLanguage.logoutBtn);
  await verifyAndClick(SpanishLanguage.logoutConformationBtn);
  await verify(SpanishLanguage.loginButton);
});

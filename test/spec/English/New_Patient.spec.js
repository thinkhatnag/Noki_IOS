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
  aeroplanemodeswipe,
} from "../../../helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import AudioManeger from "../../screenObjectModel/audioManeger.js";
import SettingsPage from "../../screenObjectModel/setting.page.js";
import AddPatitentPage from "../../screenObjectModel/addPatient.page.js";
import QuickActions from "../../screenObjectModel/quickActions.page.js";
beforeEach(() => {
  allureReporter.addSubSuite("First Encounter E2E flow");
});
const shared = { createdPatient: null };
it("Patient Creation", async () => {
  await LoginPage.restartApp();
  await waitForElement(HomePage.startNewEncounterButton);
  await verifyAndClick(HomePage.startNewEncounterButton);
  await driver.pause(2000);
  await verifyAndClick(SearchPatientPage.addPatient);
  await AddPatitentPage.addPatientWrn();
  shared.createdPatient = await AddPatitentPage.createNewPatient();
  console.log("createNewPatient returned:", shared.createdPatient); // ← critical log
});
it("Automatic Sync Verification (Offline to Online and Vice Versa) for the First Encounter", async () => {
  await RecordingPage.startConversation();
  await AudioManeger.playAudio("english");
  console.log("Audio started:", AudioManeger.currentAudioFile);
  await RecordingPage.recordAudioforOfflineModeMT();
  await driver.pause(10000);
  await verifyAndClick(RecordingPage.pauseBtn);
  await AudioManeger.pauseAudio();
  console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
  await driver.pause(5000);
  await verifyAndClick(RecordingPage.playBtn);
});
it("App Killed and Reopened (Offline Mode Verification) for the First Encounter", async () => {
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //aagain playing audio for 1 min in online});
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await aeroplaneModeOn();
  await driver.pause(5000);
  await AudioManeger.pauseAudio();
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
  await driver.pause(3000);
  await driver.activateApp(process.env.BUNDLE_ID);
  // await verifyAndClick(RecordingPage.errorOk)    // debug app step will not be avalable in the test/prod
  await waitForElement(RecordingPage.ContinueBtn);
  await verify(RecordingPage.ContinueBtn);
  await verifyAndClick(RecordingPage.ContinueBtn);
});

it("App Killed in Offline and Reopened in Online Mode Verification for the First Encounter", async () => {
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
  await aeroplanemodeswipe(); // online
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await waitForElement(RecordingPage.ContinueBtn);
  await verifyAndClick(RecordingPage.ContinueBtn);
  await aeroplanemodeswipe(); //offline
});
it("Offline Mode Stop and App Kill Verification for the First Encounter", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await AudioManeger.stopAudio();
  await verifyAndClick(RecordingPage.stopBtn);
  await driver.pause(5000);
  await verify(RecordingPage.offlineConversationSaved);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await verify(RecordingPage.offlineConversationSaved);
  await driver.pause(5000);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await aeroplanemodeswipe(); // online
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
});
it("First Conversation and SOAP Note Generation in First Encounter", async () => {
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await driver.terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue(shared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});
it("Transcript verification for the first Encounter", async () => {
  await RecordingPage.Transcript_Verification();
});
it("Second Conversation for the first Encounter", async () => {
  await verifyAndClick(RecordingPage.SoapNoteBtn);
  await waitForElement(RecordingPage.AddConversation);
  await verifyAndClick(RecordingPage.AddConversation);
  await verifyAndClick(RecordingPage.AddConversationConfirmationYes);
  await AudioManeger.playAudio("english");
  await driver.pause(5000);
  await aeroplaneModeOff(); //offline
  await driver.pause(80000);
  await AudioManeger.stopAudio();
  await driver.terminateApp(process.env.BUNDLE_ID); //app killed
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await aeroplanemodeswipe(); //online
  await driver.pause(5000);
  await waitForElement(RecordingPage.ContinueBtn);
  await verifyAndClick(RecordingPage.endEncounter);
  await driver.pause(5000);
});
it("SOAP Note Verification for the Second Conversation in First Encounter", async () => {
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await driver.terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue(shared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});
it("Transcript verification for the Second Conversation in first Encounter", async () => {
  await RecordingPage.Transcript_Verification();
});

it("Third Conversation (Draft Creation and Completion of Draft Transcript) for the First Encounter}", async () => {
  await RecordingPage.SoapNoteBtn.click();
  await RecordingPage.third_Conversations_For_New_Patient();
});
it("SOAP Note Generation and Verification for the Draft Conversation in the First Encounter", async () => {
  try {
    await waitForElement(QuickActions.quickActionButton);
  } catch (error) {
    if (await QuickActions.quickActionButton.isDisplayed()) {
      await RecordingPage.SOAPNote_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await driver.terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await HomePage.patients.click();
      await PatientsPage.patientSearchAndContinue(shared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await RecordingPage.SOAPNote_Verification();
});
it("Transcript verification for the Third Conversation in first Encounter", async () => {
  await RecordingPage.Transcript_Verification();
});

it("Quick Action Templet Generation and Regeneration", async () => {
  await QuickActions.ICD_CPT();
  await QuickActions.care_Plan();
  await QuickActions.feed_back();
  await QuickActions.referal_Letter();
  await QuickActions.SOAPNote();
});

it("Patient info update", async () => {
  await RecordingPage.UpdatePatientInfo();
});
it("Patient info manual update", async () => {
  await RecordingPage.manualUpdate();
});
it("HayNoki update", async () => {
  await RecordingPage.hayNoki();
});

it("Finalize encounter", async () => {
  await RecordingPage.finalize_Encounter();
});
// });

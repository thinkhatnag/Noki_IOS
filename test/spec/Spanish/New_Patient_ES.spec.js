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
import LoginPage from "../../screenObjectModel/login.page.js";
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import RecordingPage from "../../screenObjectModel/recording.page.js";
import PatientsPage from "../../screenObjectModel/patients.page.js";
beforeEach(() => {
  allureReporter.addSubSuite("First Encounter E2E Flow -Es");
});
const shared = { createdPatient: null };

it("Patient Creation -Es", async () => {
  await LoginPage.restartApp();
  await waitForElement(SpanishLanguage.startNewEncounter);
  await SpanishLanguage.startNewEncounter.click();
  await driver.pause(2000);
  await verifyAndClick(SpanishLanguage.addPatient);
  await driver.pause(2000);
  await SpanishLanguage.addPatitentWrn();
  shared.createdPatient = await SpanishLanguage.createNewPatient();
});
it("Automatic Sync Verification (Offline to Online and Vice Versa) for the First Encounter -Es", async () => {
  await driver.pause(2000);
  await SpanishLanguage.startConversation();
  await AudioManeger.playAudio("spanish");
  console.log("Audio started:", AudioManeger.currentAudioFile);
  await SpanishLanguage.recordAudioforOfflineModeMT();
  await driver.pause(2000);
  await SpanishLanguage.pauseBtn.click();
  await AudioManeger.pauseAudio();
  console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
  await driver.pause(5000);
  await SpanishLanguage.PlayBtn.click();
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await aeroplaneModeOn();
  await driver.pause(5000);
});
it("App Killed and Reopened (Offline Mode Verification) for the First Encounter -Es", async () => {
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(2000);
  await driver.activateApp(process.env.BUNDLE_ID);
  // await verifyAndClick(SpanishLanguage.errorOk)
  await waitForElement(SpanishLanguage.RecordingContinueBtn);
  await verifyAndClick(SpanishLanguage.RecordingContinueBtn);
});
it("App Killed in Offline and Reopened in Online Mode Verification for the First Encounter -Es", async () => {
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
  await aeroplanemodeswipe(); // online
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await waitForElement(SpanishLanguage.RecordingContinueBtn);
  await verifyAndClick(SpanishLanguage.RecordingContinueBtn);
  await aeroplanemodeswipe(); //offlline
});
it("Offline Mode Stop and App Kill Verification for the First Encounter -Es", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await AudioManeger.stopAudio();
  await verifyAndClick(RecordingPage.stopBtn);
  await driver.pause(5000);
  await verify(SpanishLanguage.offlineConversationSaved);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await verify(SpanishLanguage.offlineConversationSaved);
  await driver.pause(5000);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await aeroplanemodeswipe(); // online
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
});
it("First Conversation and SOAP Note Generation for the First Encounter -Es", async () => {
  try {
    await waitForElement(SpanishLanguage.quickActionButton);
  } catch (error) {
    if (await SpanishLanguage.quickActionButton.isDisplayed()) {
      await SpanishLanguage.SOAPNOTE_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await SpanishLanguage.patientSearch(shaared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Transcript verification for the first Encounter -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});
it("Second Conversation for the First Encounter -Es", async () => {
  await verifyAndClick(SpanishLanguage.SoapNoteBtn);
  await waitForElement(SpanishLanguage.AddConversation);
  await verifyAndClick(SpanishLanguage.AddConversation);
  await verifyAndClick(SpanishLanguage.AddConversationConfirmationYes);
  await AudioManeger.playAudio("spanish");
  await driver.pause(5000);
  await aeroplaneModeOn(); //offline
  await driver.pause(80000);
  await AudioManeger.stopAudio();
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await aeroplanemodeswipe(); //online
  await waitForElement(SpanishLanguage.endEncounter);
  await verifyAndClick(SpanishLanguage.endEncounter);
  await driver.pause(5000);
  if (await SpanishLanguage.stopBtn.isDisplayed()) {
    await verifyAndClick(SpanishLanguage.stopBtn);
    allureReporter.addIssue(
      "Here even after clicking End Encouter, soap note generation is not Intiated",
    );
  } else {
    console.log("issue related to api is resolved");
  }
});

it("SOAP Note Verification for the Second Conversation for the First Encounter -Es", async () => {
  try {
    await waitForElement(SpanishLanguage.quickActionButton);
  } catch (error) {
    if (await SpanishLanguage.quickActionButton.isDisplayed()) {
      await SpanishLanguage.SOAPNOTE_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await SpanishLanguage.patientSearch(shaared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Transcript Verification for the Second Conversation for the First Encounter -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});
it("Third Conversation {Draft Creation and Completion of Draft Transcript} for the First Encounter -Es", async () => {
  await verifyAndClick(SpanishLanguage.SoapNoteBtn);
  await SpanishLanguage.third_Conversations_For_New_Patient();
});
it("SOAP Note Generation and Verification for the Draft Conversation for the First Encounter -Es", async () => {
  try {
    await waitForElement(SpanishLanguage.quickActionButton);
  } catch (error) {
    if (await SpanishLanguage.quickActionButton.isDisplayed()) {
      await SpanishLanguage.SOAPNOTE_Verification();
    } else {
      allureReporter.addIssue(
        "Quick Action Button is not displayed even after long wait waiting",
      );
      await LoginPage.restartApp();
      await driver.pause(5000);
      await HomePage.patients.click();
      await SpanishLanguage.patientSearch(shaared.createdPatient);
      await PatientsPage.firstEncounter.click();
      await driver.pause(5000);
    }
  }
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Transcript Verification for the Draft Conversation for the First Encounter -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});

it("Generation and Regeneration of Quick Action Templates {ICD & CPT, Care Plan, Feedback, Referral}for the First Encounter -Es", async () => {
  await SpanishLanguage.ICD_CPT();
  await SpanishLanguage.care_Plan();
  await SpanishLanguage.feed_Back();
  await SpanishLanguage.referal_Letter();
  await SpanishLanguage.SOAP_NOTE();
});

it("Patient Info Update -Es", async () => {
  await SpanishLanguage.UpdatePatientInfo();
});
it("Patient info manual update -Es", async () => {
  await SpanishLanguage.manualUpdate();
});
it("Hay Noki verification -Es", async () => {
  await SpanishLanguage.hayNoki();
});

it("Finalize encounter -Es", async () => {
  await SpanishLanguage.finalize_Encounter();
});

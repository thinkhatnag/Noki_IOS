import {
  verify,
  verifyAndClick,
  waitForElement,
  aeroplaneModeOff,
  aeroplaneModeOn,
  LiveTranscript,
  validate,
  aeroplanemodeswipe,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import AudioManeger from "../../screenObjectModel/audioManeger.js";
import LoginPage from "../../screenObjectModel/login.page.js";
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import recordingPage from "../../screenObjectModel/recording.page.js";
beforeEach(() => {
  allureReporter.addEpic("NOKI IOS Automation");
  allureReporter.addOwner("Mobile Team");
  allureReporter.addSubSuite("First Encounter E2E Flow -Es");
});

it("Patient Creation -Es", async () => {
  await LoginPage.restartApp();
  await waitForElement(SpanishLanguage.startNewEncounter);
  await SpanishLanguage.startNewEncounter.click();
  await driver.pause(2000);
  await verifyAndClick(SpanishLanguage.addPatient);
  await driver.pause(2000);
  await SpanishLanguage.addPatitentWrn();
  await SpanishLanguage.createNewPatient();
});
it("Automatic Sync Verification (Offline to Online and Vice Versa) for the First Encounter -Es", async () => {
  await driver.pause(2000);
  await SpanishLanguage.startConversation();
  await AudioManeger.playAudio("spanish");
  console.log("Audio started:", AudioManeger.currentAudioFile);
  await SpanishLanguage.recordAudioforOfflineModeMT();
  await driver.pause(5000);
  await verifyAndClick(SpanishLanguage.pauseBtn);
  await AudioManeger.pauseAudio();
  console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
  await driver.pause(10000);
  await SpanishLanguage.PlayBtn.click();
  await AudioManeger.resumeAudio(); //correct
  console.log("Audio resumed:", AudioManeger.currentAudioFile);
  await driver.pause(30000); //again playing audio for 1 min in online
  await AudioManeger.pauseAudio();
  await driver.pause(2000);
  await aeroplaneModeOn();
  await driver.pause(5000);
  await AudioManeger.pauseAudio();
});
it("App Killed and Reopened (Offline Mode Verification) for the First Encounter -Es", async () => {
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  // await verifyAndClick(SpanishLanguage.errorOk)
  await waitForElement(SpanishLanguage.RecordingContinueBtn);
  await verify(SpanishLanguage.RecordingContinueBtn);
  await verify(SpanishLanguage.endEncounterBtn);
  await verifyAndClick(SpanishLanguage.RecordingContinueBtn);
  console.log(
    "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
  );
});
it("App Killed in Offline and Reopened in Online Mode Verification for the First Encounter -Es", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await AudioManeger.stopAudio();
  await verifyAndClick(SpanishLanguage.stopBtn);
  console.log(
    "here after app got closed while recording we magaing automatically again resumed the audio"
  );
  await driver.pause(5000);
  await verify(SpanishLanguage.offlineConversationSaved);
  await aeroplanemodeswipe();
  await driver.pause(5000);
  console.log(
    "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved"
  );
});
it("Offline Mode Stop and App Kill Verification for the First Encounter -Es", async () => {
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("First Conversation and SOAP Note Generation for the First Encounter -Es", async () => {
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
  await driver.pause(60000);
  await AudioManeger.stopAudio();
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(5000);
  await aeroplanemodeswipe(); //online
  await verifyAndClick(SpanishLanguage.endEncounter);
});

it("SOAP Note Verification for the Second Conversation for the First Encounter -Es", async () => {
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
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Transcript Verification for the Draft Conversation for the First Encounter -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});

it("Generation and Regeneration of Quick Action Templates {ICD & CPT, Care Plan, Feedback, Referral}for the First Encounter -Es", async () => {
  await SpanishLanguage.translate_SoapNoteToSpanish()
  await SpanishLanguage.ICD_CPT();
  await SpanishLanguage.care_Plan();
  await SpanishLanguage.feed_Back();
  await SpanishLanguage.referal_Letter();
  await SpanishLanguage.SOAP_NOTE();
});

it("Patient Info Update -Es", async () => {
  await SpanishLanguage.UpdatePatientInfo();
  await SpanishLanguage.manualUpdate();
});
it("Hay Noki verification -Es", async () => {
  await SpanishLanguage.hayNoki();
});

it("Finalize encounter -Es", async () => {
  await SpanishLanguage.finalize_Encounter();
});

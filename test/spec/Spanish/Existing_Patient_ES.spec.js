import LoginPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js";
import AudioManeger from "../../screenObjectModel/audioManeger.js";
import {
  verify,
  verifyAndClick,
  waitForElement,
  aeroplaneModeOff,
  aeroplaneModeOn,
  validate,
  aeroplanemodeswipe,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
import HomePage from "../../screenObjectModel/home.page.js";
beforeEach(() => {
  allureReporter.addEpic("NOKI IOS Automation");
  allureReporter.addOwner("Mobile Team");
  allureReporter.addSubSuite("New Encounter E2E flow -Es");
});

it("New Encounter Creation -Es", async () => {
  await LoginPage.restartApp();
  await driver.pause(2000);
  await SpanishLanguage.startNewEncounter.click();
  await driver.pause(2000);

  await SpanishLanguage.patientSearch("Naga");
  await validate(SpanishLanguage.startConversationBtn);
});
it("Automatic Sync Verification (Offline to Online and Vice Versa) -Es", async () => {
  await SpanishLanguage.startConversation();
  await AudioManeger.playAudio("spanish");
  console.log("Audio started:", AudioManeger.currentAudioFile);
  await SpanishLanguage.recordAudioforOfflineModeMT();
  await driver.pause(3000);
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
  await driver.pause(3000);
  await AudioManeger.pauseAudio();
});
it("App Killed and Reopened (Offline Mode Verification) -Es", async () => {
  await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
  await driver.pause(3000);
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
it("App Killed in Offline and Reopened in Online Mode Verification -Es", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await AudioManeger.pauseAudio();
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(3000);
  await aeroplanemodeswipe(); //online
  await driver.pause(3000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await waitForElement(SpanishLanguage.RecordingContinueBtn);
  await verifyAndClick(SpanishLanguage.RecordingContinueBtn);
});
it("Offline Mode Stop and App Kill Verification -Es", async () => {
  await AudioManeger.resumeAudio();
  await driver.pause(30000);
  await aeroplanemodeswipe(); // offline
  await AudioManeger.stopAudio();
  await verifyAndClick(SpanishLanguage.stopBtn);
  console.log(
    "Here after app got closed while recording automatically again resumed the audio"
  );
  await driver.pause(3000);
  await verify(SpanishLanguage.offlineConversationSaved);
  await driver.terminateApp(process.env.BUNDLE_ID);
  await aeroplanemodeswipe(); //online
  await driver.pause(3000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await verifyAndClick(SpanishLanguage.endEncounter);
  await waitForElement(SpanishLanguage.PrevEncounterRef);
  await verify(SpanishLanguage.PrevEncounterRef);
  await verifyAndClick(SpanishLanguage.PrevEncounterRefNo);
});
it("First Conversation and SOAP Note Generation -Es", async () => {
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Trascript verification -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});

it("Second Conversation for the New Encounter -Es", async () => {
  await verifyAndClick(SpanishLanguage.SoapNoteBtn);
  await waitForElement(SpanishLanguage.AddConversation);
  await verifyAndClick(SpanishLanguage.AddConversation);
  await verifyAndClick(SpanishLanguage.AddConversationConfirmationYes);
  await AudioManeger.playAudio("spanish");
  await driver.pause(3000);
  await aeroplaneModeOn(); //offline
  await driver.pause(60000);
  await AudioManeger.stopAudio();
  await driver.terminateApp(process.env.BUNDLE_ID);
  await driver.pause(3000);
  await driver.activateApp(process.env.BUNDLE_ID);
  await driver.pause(3000);
  await aeroplanemodeswipe(); //online
  await driver.pause(3000);
  await verifyAndClick(SpanishLanguage.endEncounter);
  await verifyAndClick(SpanishLanguage.PrevEncounterRefYes);
});
it("SOAP Note Verification for the Second Conversation -Es", async () => {
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Trascript verification for the Second Conversation -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});

it("Third Conversation {Draft Creation and Completion of Draft Transcript}", async () => {
  await verifyAndClick(SpanishLanguage.SoapNoteBtn);
  await SpanishLanguage.third_Conversation_For_Existing_Patitent();
});
it("SOAP Note Generation and Verification for the Draft Conversationm-Es", async () => {
  await SpanishLanguage.SOAPNOTE_Verification();
});
it("Transcript Verification for the Draft Conversation -Es", async () => {
  await SpanishLanguage.Transcript_Verification();
});

it("Generation and Regeneration of Quick Action Templates (ICD & CPT, Care Plan, Feedback, Referral) -Es", async () => {
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

it("Finalize Encounter -Es", async () => {
  await SpanishLanguage.finalize_Encounter();
});
it("Logout -Es", async () => {
  await LoginPage.restartApp();
  await verifyAndClick(HomePage.settings);
  await verifyAndClick(SpanishLanguage.launguage);
  await verifyAndClick(SpanishLanguage.english);
  await verifyAndClick(SettingsPage.logoutBtn);
  await verifyAndClick(SettingsPage.logoutConformationBtn);
  await validate(LoginPage.loginButton);
});

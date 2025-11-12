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
import spanishLanguage from "../../screenObjectModel/spanishLanguage.js";
describe("Spanish", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("Spanish");
  });
  describe("Existing Patient", () => {
    beforeEach(() => {
      allureReporter.addSuite("Existing Patient");
    });

    it("Intiating the conversation for a Existing conversation", async () => {
      await LoginPage.restartApp();
      await SpanishLanguage.startNewEncounter.click();
      await SpanishLanguage.patientSearch("Naga");
      await validate(SpanishLanguage.startConversationBtn);
    });
    it("Recording the conversation for multiple times offline ", async () => {
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
      await AudioManeger.resumeAudio();
      console.log("Audio resumed:", AudioManeger.currentAudioFile);
      await driver.pause(30000); //again playing audio for 1 min in online
      await AudioManeger.pauseAudio();
    });
    it("Offline mode app kill state verification", async () => {
      await driver.pause(2000);
      await aeroplaneModeOn();
      await driver.pause(5000);
      await AudioManeger.pauseAudio();
      await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      //  await verifyAndClick(SpanishLanguage.errorOk);
      await waitForElement(SpanishLanguage.continue);
      await verifyAndClick(SpanishLanguage.continue);
      console.log(
        "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
      );
    });
    it("Offline mode app  buttons verification", async () => {
      await AudioManeger.resumeAudio();
      await driver.pause(30000);
      await AudioManeger.pauseAudio();
      await terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await aeroplanemodeswipe();
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await waitForElement(SpanishLanguage.continue);
    });
    it("Offline mode app  buttons verification", async () => {
      await AudioManeger.resumeAudio();
      await driver.pause(30000);
      await AudioManeger.stopAudio();
      await verifyAndClick(SpanishLanguage.stopBtn);
      console.log(
        "here after app got closed while recording we magaing automatically again resumed the audio"
      );
      await driver.pause(5000);
      await verify(SpanishLanguage.offlineConversationSaved);
      await driver.terminateApp(process.env.BUNDLE_ID);
      await aeroplanemodeswipe();
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await waitForElement(SpanishLanguage.PrevEncounterRef);
      await validate(SpanishLanguage.PrevEncounterRef);
      await verifyAndClick(SpanishLanguage.PrevEncounterRefNo);
      await waitForElement(SpanishLanguage.quickActionButton);
      await validate(SpanishLanguage.quickActionButton);
    });
    it("SOAP NOTE  & Transcript Verification for the First conversation", async () => {
      await SpanishLanguage.SOAPNOTE_Verification();
      await SpanishLanguage.Transcript_Verification();
    });
 it("Add Conversation for Existing Encounter", async () => {
      await waitForElement(SpanishLanguage.AddConversation);
      await verifyAndClick(SpanishLanguage.AddConversation);
      await verifyAndClick(SpanishLanguage.AddConversationConfirmationYes);
      await AudioManeger.playAudio("spanish");
      await driver.pause(60000);
      await aeroplaneModeOn()
      await driver.pause(5000)
      await driver.terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await driver.pause(5000)
      await verifyAndClick(SpanishLanguage.endEncounter)
      await verifyAndClick(SpanishLanguage.PrevEncounterRefYes)
    });
    it("SOAP NOTE  & Transcript Verification for the second conversation", async () => {
      await SpanishLanguage.SOAPNOTE_Verification();
      await SpanishLanguage.Transcript_Verification();
    });
    it("Thiord Conversation {makingh the converastion as draft and completing the draft Transcript }", async () => {
      await SpanishLanguage.third_Conversation_For_Existing_Patitent();
      await validate(SpanishLanguage.quickActionButton);
    });
    it("SOAP NOTE  & Transcript Verification for the Third Conversation", async () => {
      await SpanishLanguage.SOAPNOTE_Verification();
      await SpanishLanguage.Transcript_Verification();
    });

    it("ICD & CPT Codes Generation and Regeneration", async () => {
      await SpanishLanguage.ICD_CPT();
    });

    it("Care Plan generation and Regeneration ", async () => {
      await SpanishLanguage.care_Plan();
    });

    it("Feed back on the doctor genaration and Regenaration ", async () => {
      await SpanishLanguage.feed_Back();
    });
    it("Referall leter genaration and Regenaration", async () => {
      await SpanishLanguage.referal_Letter();
    });
    it("Regenerate SOAP_Note and update verification", async () => {
      await SpanishLanguage.SOAP_NOTE();
      await SpanishLanguage.UpdatePatientInfo();
    });
    it.skip("manual update verification", async () => {
      await SpanishLanguage.manualUpdate();
    });
    it("HayNoki update verification", async () => {
      await SpanishLanguage.hayNoki();
    });

    it("finalize Encounter", async () => {
      await SpanishLanguage.finalize_Encounter();
    });
  });
});

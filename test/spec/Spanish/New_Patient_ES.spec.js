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

import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import SpanishLanguage from "../../screenObjectModel/spanishLanguage.js";
describe("Spanish", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("Spanish");
  });
  describe("Existing Patient", () => {
    beforeEach(() => {
      allureReporter.addSuite("New Patient");
    });

  it("Intiating the conversation for a Newly created Patient", async () => {
    await waitForElement(SpanishLanguage.startNewEncounter);
    await SpanishLanguage.startNewEncounter.click();
    await verifyAndClick(SpanishLanguage.addPatient);
    await SpanishLanguage.addPatitentWrn();
    await SpanishLanguage.createNewPatient();
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
    await AudioManeger.resumeAudio(); //correct
    console.log("Audio resumed:", AudioManeger.currentAudioFile);
    await driver.pause(30000); //again playing audio for 1 min in online
    await AudioManeger.pauseAudio();
    await driver.pause(2000);
    await aeroplaneModeOn();
    await driver.pause(5000);
    await AudioManeger.pauseAudio();
  });
  it("Offline mode app kill state verification", async () => {
    await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
    await driver.pause(5000);
    await driver.activateApp(process.env.BUNDLE_ID);
    // await verifyAndClick(SpanishLanguage.errorOk)
    await waitForElement(SpanishLanguage.ContinueBtn);
    await validate(SpanishLanguage.ContinueBtn);
    await validate(SpanishLanguage.discardBtn)
    await validate(SpanishLanguage.endEncounterBtn)
    await verifyAndClick(SpanishLanguage.ContinueBtn);
    console.log(
      "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
    );
  });
  it("Offline mode app pause/Stop buttons verification", async () => {
    await AudioManeger.resumeAudio();
    await driver.pause(30000);
    await AudioManeger.stopAudio();
    await verifyAndClick(SpanishLanguage.stopBtn);
    console.log(
      "here after app got closed while recording we magaing automatically again resumed the audio"
    );
    await driver.pause(5000);
    await verify(SpanishLanguage.offlineConversationSaved);

     // device come to online
     await aeroplanemodeswipe()
    await driver.pause(5000);
    console.log(
      "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved"
    );
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
      });
  
  it("SOAP NOTE  & Transcript Verification for the second conversation", async () => {
    await SpanishLanguage.SOAPNOTE_Verification();
    await SpanishLanguage.Transcript_Verification();
  });
  it("Thiord Conversation {makingh the converastion as draft and completing the draft Transcript }", async () => {
    await SpanishLanguage.third_Conversations_For_New_Patient();
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
  it("Regenerate SOAP Note and update Patient-info verification", async () => {
    await SpanishLanguage.SOAP_NOTE();
    await SpanishLanguage.UpdatePatientInfo();
  });
  it.skip("manual Update verification", async () => {
    await SpanishLanguage.manualUpdate();
  });
  it.skip("HayNoki update verification", async () => {
    await SpanishLanguage.hayNoki();
  });

  it("Finalizing the encounter", async () => {
    await SpanishLanguage.finalize_Encounter();
  });
});
})
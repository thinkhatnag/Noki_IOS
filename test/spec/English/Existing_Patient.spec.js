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
describe("English", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("English");
  });
  describe("Existing patient E2E Flow ", () => {
    it("Search Patient", async () => {
      await LoginPage.restartApp();
      await verifyAndClick(HomePage.startNewEncounterButton);
      await SearchPatientPage.patientSearch("Naga");
      await verifyAndClick(SearchPatientPage.proceedBTn);
      allureReporter.startStep(
        "Verifying the start conversation button and cliking and starting the conversation"
      );
      await validate(RecordingPage.startConversationBtn);
      allureReporter.endStep("passed");
    });

    it("Automatic sync Verification when app goes offline and online", async () => {
      await RecordingPage.startConversation();
      await AudioManeger.playAudio("english");
      console.log("Audio started:", AudioManeger.currentAudioFile);
      await RecordingPage.recordAudioforOfflineModeMT();
      await driver.pause(10000);
      await validate(RecordingPage.pauseBtn);
      await verifyAndClick(RecordingPage.pauseBtn);
      await AudioManeger.pauseAudio();
      console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
      await driver.pause(20000);
      await verifyAndClick(RecordingPage.playBtn);
    });
    it("App Killed in Offline Mode verification", async () => {
      await AudioManeger.resumeAudio(); //correct
      console.log("Audio resumed:", AudioManeger.currentAudioFile);
      await driver.pause(30000); //aagain playing audio for 1 min in online});
      await AudioManeger.pauseAudio();
      await driver.pause(2000);
      await aeroplaneModeOn();
      await driver.pause(5000);
      await AudioManeger.pauseAudio();
      await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
      await driver.pause(10000);
      await driver.activateApp(process.env.BUNDLE_ID);
      // await verifyAndClick(RecordingPage.errorOk)    // debug app step will not be avalable in the test/prod
      await waitForElement(RecordingPage.ContinueBtn);
      await validate(RecordingPage.ContinueBtn);
      await verifyAndClick(RecordingPage.ContinueBtn);
      console.log(
        "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
      );
    });

    it("App Killed in Offline and re-open in online verification", async () => {
      await AudioManeger.resumeAudio(); //correct
      console.log("Audio resumed:", AudioManeger.currentAudioFile);
      await driver.pause(30000); //again playing audio for 1 min in online
      await AudioManeger.pauseAudio();
      await driver.pause(2000);
      await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen even in offline
      await driver.pause(10000);
      await aeroplanemodeswipe();
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await waitForElement(RecordingPage.ContinueBtn);
      await validate(RecordingPage.ContinueBtn);
      await verifyAndClick(RecordingPage.ContinueBtn);
      console.log(
        "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
      );
      await aeroplanemodeswipe();
    });
    it("Offline mode stop and app kill Verification", async () => {
      await AudioManeger.resumeAudio();
      await driver.pause(30000);
      await AudioManeger.stopAudio();
      await verifyAndClick(RecordingPage.stopBtn);
      console.log(
        "here after app got closed while recording we magaing automatically again resumed the audio"
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
      console.log(
        "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved"
      );
      await waitForElement(RecordingPage.PrevEncounterRefNo);
      await validate(RecordingPage.PrevEncounterRefYes); // verifying the yes button in the popup
      await verifyAndClick(RecordingPage.PrevEncounterRefNo);
    });
    it("SoapNote and Transcript verification for the First conversation", async () => {
      await RecordingPage.SOAPNote_Verification();
      await RecordingPage.Transcript_Verification();
    });
    it("Add Conversation for Existing Encounter", async () => {
      await waitForElement(this.AddConversation);
      await verifyAndClick(this.AddConversation);
      await verifyAndClick(this.AddConversationConfirmationYes);  
      await AudioManeger.playAudio("english");
      await driver.pause(60000);
      await aeroplaneModeOn()
      await driver.pause(5000)
      await driver.terminateApp(process.env.BUNDLE_ID);
      await driver.pause(5000);
      await driver.activateApp(process.env.BUNDLE_ID);
      await driver.pause(5000)
      await verifyAndClick(RecordingPage.endEncounter)
      await verifyAndClick(RecordingPage.PrevEncounterRefYes)

    });
    it("SOAP NOTE  & Transcript Verification for the second conversation", async () => {
      await RecordingPage.SOAPNote_Verification();
      await RecordingPage.Transcript_Verification();
    });
    it("Third Conversation {making the conversation as draft and completing the draft Transcript }", async () => {
      await RecordingPage.third_Conversation_For_Existing_Patient();
    });
    it("SOAP NOTE  & Transcript Verification for the Third Conversation", async () => {
      await RecordingPage.SOAPNote_Verification();
      await RecordingPage.Transcript_Verification();
    });

    it("ICD & CPT Codes Generation & Regeneration", async () => {
      await QuickActions.ICD_CPT();
    });

    it("Care Plan generation & Regeneration ", async () => {
      await QuickActions.care_Plan();
    });

    it("Feed back on the doctor genaration & Regenaration ", async () => {
      await QuickActions.feed_back();
    });
    it("Referall leter genaration & Regenaration", async () => {
      await QuickActions.referal_Letter();
    });
    it("Regenerate SOAP Note verification", async () => {
      await QuickActions.SOAPNote();
    });

    it.skip(" Manual update verification", async () => {
      await RecordingPage.manualUpdate();
    });
    it("HayNoki update verification", async () => {
      await RecordingPage.hayNoki();
    });

    it("Finalizing the encounter", async () => {
      await RecordingPage.finalize_Encounter();
    });
  });
});

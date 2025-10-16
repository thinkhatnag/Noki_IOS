import HomePage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js";
import PatientsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/patients.page.js";
import EncounterPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js";
import SearchPatientPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/searchPatient.page.js";
import RecordingPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js";
// import AddPatitentPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js';
import LoginPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js";
import {
  verify,
  verifyAndClick,
  waitForElement,
  aeroplaneModeOff,
  aeroplaneModeOn,
  aeroplanemodeswipe
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import allureReporter from "@wdio/allure-reporter";
import AudioManeger from '../../screenObjectModel/audioManeger.js'
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import AddPatitentPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js";
import QuickActions from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/quickActions.page.js";
describe("English", () => {
  beforeEach(() => {
    allureReporter.addEpic("NOKI IOS Automation");
    allureReporter.addOwner("Mobile Team");
    allureReporter.addParentSuite("English");
  });
  describe("New patient E2E Flow ", () => {
    beforeEach(() => {
      allureReporter.addSuite("New patient E2E Flow ");
    });
  it('Intiating the conversation for a Newly created Patient', async() => {
    await waitForElement(HomePage.startNewEncounterButton);
    await HomePage.startNewEncounterButton.click();
    await verifyAndClick(SearchPatientPage.addPatient);
    await AddPatitentPage.addPatientWrn();
    await AddPatitentPage.createNewPatient();
  });
  it('Recording the conversation for multiple times offline ', async() => {
    await RecordingPage.startConversation();
    await AudioManeger.playAudio("english");
    console.log("Audio started:", AudioManeger.currentAudioFile);
    await RecordingPage.recordAudioforOfflineModeMT();
    await driver.pause(10000);
    await verifyAndClick(RecordingPage.pauseBtn);
    await AudioManeger.pauseAudio();
    console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
    await driver.pause(20000);
    await RecordingPage.playBtn.click();
    await AudioManeger.resumeAudio();  //correct
    console.log("Audio resumed:", AudioManeger.currentAudioFile);
    await driver.pause(60000); //aagain playing audio for 1 min in online
    await AudioManeger.pauseAudio(); 
    await driver.pause(2000);

    await aeroplaneModeOn();

    await driver.pause(5000);
    await AudioManeger.pauseAudio();
   
    
  });
  it('Offline mode app kill state verification', async() => {
    await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
    await driver.pause(10000);
    await driver.activateApp(process.env.BUNDLE_ID);
    // await verifyAndClick(RecordingPage.errorOk)
    await waitForElement(RecordingPage.ContinueBtn);
    await verifyAndClick(RecordingPage.ContinueBtn);
    console.log(
      "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
    );
  })
  it('Offline mode app pause/Stop buttons verification', async() => {

    await AudioManeger.resumeAudio();
    await driver.pause(60000);
    await AudioManeger.stopAudio();
    await verifyAndClick(RecordingPage.stopBtn);
    console.log(
      "here after app got closed while recording we magaing automatically again resumed the audio"
    );
    await driver.pause(5000);
    await verify(RecordingPage.offlineConversationSaved);
    
     // device come to online
     await aeroplanemodeswipe()
    await driver.pause(5000);
    console.log(
      "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved"
    );
  });
  it('SOAP NOTE  & Transcript Verification for the First conversation', async() => {
    await RecordingPage.SOAPNote_Verification()
    await RecordingPage.Transcript_Verification()
  });
  it('Second Conversation Intiation ', async() => {
    await RecordingPage.second_Conversations_For_New_Patient()
  });
  it('SOAP NOTE  & Transcript Verification for the second conversation', async() => {
    await RecordingPage.SOAPNote_Verification()
    await RecordingPage.Transcript_Verification()

  });
  it('Thiord Conversation {makingh the converastion as draft and completing the draft Transcript }', async() => {
    await RecordingPage.third_Conversations_For_New_Patient()
  });
  it('SOAP NOTE  & Transcript Verification for the Third Conversation', async() => {
    await RecordingPage.SOAPNote_Verification()
    await RecordingPage.Transcript_Verification()
  });

  it('ICD & CPT Codes Generation and Regeneration', async() => {
    await QuickActions.ICD_CPT()
  });

  it('Care Plan generation and Regeneration ', async() => {
    await QuickActions.care_Plan()
  });

  it('Feed back on the doctor genaration and Regenaration ', async() => {
    await QuickActions.feed_back()
  });
  it('Referall leter genaration and Regenaration', async() => {
    await QuickActions.referal_Letter()
  });
  it('Regenerate SOAP Note verification', async() => {
    await QuickActions.SOAPNote()
    await RecordingPage.UpdatePatientInfo()
  });
  
  it.skip(' HayNoki update verification', async() => {
    await RecordingPage.manualUpdate()
  });
  it.skip('update and HayNoki update verification', async() => {
    await RecordingPage.hayNoki()
  });

  it('Finalizing the encounter', async() => {
    await RecordingPage.finalize_Encounter()
  }); 

})
})
import HomePage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js';
import PatientsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/patients.page.js';
import EncounterPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js';
import SearchPatientPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/searchPatient.page.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js';
import AddPatitentPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js';
import LoginPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js';
import { networkFailureVerification } from '../../helpers/helper.js';

describe(' all the the soap note generation process are verified here ', () => {

    it('Verify if encounter starts and SOAP note is generated for a new patient', async() => {
       await HomePage.startNewEncounterButton.click()
       await SearchPatientPage.addPatient.click()
       await AddPatitentPage.createNewPatient()
       await RecordingPage.recordAudio()
       await RecordingPage.ctsConformation()
       await RecordingPage.finalizeEncounter()
       await LoginPage.restartApp();

    });
   
    it('verifying the dtata storing in the draft after app switch after clicking stop button instantly ', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await RecordingPage.recordAudioForExicistingPatient()
        await driver.navigateTo('https://www.youtube.com/watch?v=5t6Yr4eZ9wY');
        await driver.pause(120000)
        await driver.activateApp('com.thinkhat.devNoki');
        await HomePage.patients.click()
        await PatientsPage.patientSearchAndContinue('chandu')
        await expect($('~chandu')).toBeDisplayed();
        await LoginPage.restartApp();
    });
    it('verifying the CTS conformation for an existig Patient', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await RecordingPage.recordAudioForExicistingPatient()
        await RecordingPage.ctsConformation()
        console.log("%c The CTS conformation for an existing Patient is working fine without any issue", "color: blue");
    });
    it('Verify data is stored  after app switch after few sec of clicking stop button ', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await RecordingPage.recordAudio()
        await RecordingPage.Audio()
        await HomePage.patients.click()
        await PatientsPage.Search('chandu')
        console.log("%c The draft date has to verify manually","color: blue; font-weight: bold;")
        await driver.pause(5000)
        console.log("the draft vdate has to verify manually","color: blue; font-weight: bold;")
        await LoginPage.restartApp();

    });
    it('Verify SOAP note generation for a draft transcript and after app switch after clicking on stop Button and wait until the genrating the soap note button is displayedafter app switch after clicking on stop Button and wait until the genrating the soap note button is displayed', async() => {
        await HomePage.encounter.click()
        await EncounterPage.searchNote.click();
        await EncounterPage.searchNote.setValue('chandu');
        await RecordingPage.search.click()   
        await EncounterPage.draft.click()
        await driver.pause(2000)
        await RecordingPage.recordAudioForDraft()
        await driver.pause(5000)
        await RecordingPage.Audio()
        await HomePage.patients.click()
        await PatientsPage.Search('chandu')
        console.log("%cthe draft vdate has to verify manually","color: green; font-weight: bold;")
        await driver.pause(5000)
        console.log("the draft vdate has to verify manually","color: green; font-weight: bold;")
        await LoginPage.restartApp();

    });

    //sleep mde test cases
    it('Verify SOAP note generation after sleep mode,instantly after clicking on stop Button and reopen the app to verify soap note button is displayed', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await driver.executeScript("mobile: lock", [{"seconds":50 }]);
        await driver.activateApp('com.thinkhat.devNoki');
        await driver.pause(5000)
        await RecordingPage.stopBtn.click()
        await RecordingPage.PrevEncounterRefYes.click()
        await driver.pause(1000)
        await driver.executeScript("mobile: lock", [{"seconds":30}]);
        await driver.activateApp('com.thinkhat.devNoki');
        await HomePage.patients.click()
        await PatientsPage.Search('chandu')
        await $('~chandu').click()
        await driver.pause(5000)
        console.log("%cthe draft vdate has to verify manually","color: green; font-weight: bold;")
        await driver.pause(5000)
        console.log("the draft vdate has to verify manually","color: green; font-weight: bold;")
        await LoginPage.restartApp();

    });
  
    // Network failure test cases
    it.only('verify the transcript is saved as draft when the internet connction is lost after clicking stop Button ', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await RecordingPage.recordAudioForExicistingPatient()
        await networkFailureVerification()

    });
    it('verify the transcript is saved as draft when the internet connction is lost before clickiing the stop button', async() => {
        await SearchPatientPage.startNewConversation('chandu')
        await RecordingPage.recordAudio()
        await networkFailureVerification()
    });

});
import HomePage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js';
import PatientsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/patients.page.js';
import EncounterPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js';
import { verify, verifyAndClick  } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js';
import SearchPatientPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/searchPatient.page.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js';
import AddPatitentPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js';
import LoginPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js';


describe('enconter elements functinalities and flows are verified here ', () => {
    it('Create a new patient from the encounter screen and check the flow up to recording {TC17}', async() => {
        await HomePage.encounter.click()
        await EncounterPage.nokiDashboard.click()
        await EncounterPage.startNewEncounter.click()
        await SearchPatientPage.addPatient.click()
        await AddPatitentPage.createNewPatient()
        await RecordingPage.RecordingBack.click()
        await LoginPage.restartApp();
    })
    it.only('Search for a draft transcript and verify the flow {TC17-A}', async() => {
        await HomePage.encounter.click()
        await EncounterPage.searchNote.click()
        await EncounterPage.searchNote.setValue('Draft Transcript')
        await RecordingPage.search.click()
        await EncounterPage.draft.click()
        await verify(RecordingPage.resumeRecording)
        await RecordingPage.back.click()
        await verify(EncounterPage.searchNote)
        await LoginPage.restartApp();
        
    })
    // it.only('Create a patient, start recording for the first encounter, save as draft, delete the encounter, and verify {TC18}', async() => {
        // await HomePage.encounter.click()    
        // await EncounterPage.nokiDashboard.click()
        // await EncounterPage.startNewEncounter.click()
        // await SearchPatientPage.addPatient.click()
        // const name = await AddPatitentPage.createNewPatient()
        // await driver.pause(3000)
        // await RecordingPage.Audio()
        // await driver.pause(10000)
        // await RecordingPage.RecordingBack.click()
        // await RecordingPage.saveAsDraftBtn.click()
        // await driver.pause(5000)
    //     await HomePage.encounter.click()
    //     //await EncounterPage.noteSearch(name)
    //     await EncounterPage.deleteEncounter()
    //     await EncounterPage.searchNote.click()
    //     await EncounterPage.searchNote.setValue(name)
    //     await verify(EncounterPage.noEncounterFound)
    //     await LoginPage.restartApp();

    // })
  

})
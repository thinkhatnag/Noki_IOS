import HomePage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js';
import PatientsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/patients.page.js';
import EncounterPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js';
import SettingsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js';
import { verify, verifyAndClick,  } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js';
import SearchPatientPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/searchPatient.page.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js';
import AddPatitentPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js';
import LoginPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js';


describe('Patitent screen  elements functinalities and flows are verified here ', () => {
    it('Verify all patient screen functionalities {TC15}', async() => {
        await verifyAndClick(HomePage.patients);
        await PatientsPage.Search('badri');
        await verify(PatientsPage.noPatitentFound)
        await PatientsPage.clear.click()
        await PatientsPage.cancel.click()
        await PatientsPage.nokiDashboard.click()
        await PatientsPage.addPatient.click()
        await AddPatitentPage.addPatientWrn()
        await AddPatitentPage.cancel.click()
        await LoginPage.restartApp();
        
    })
    it('Verify patient screen and encounter flow {TC16}', async() => {
        await HomePage.patients.click()
        await PatientsPage.patientSearchAndContinue('chandu')
        await driver.pause(3000)
        await PatientsPage.nokiDashboard.click()      
        await PatientsPage.startNewEncounter.click()
        await verify(RecordingPage.startConversationBtn)
        await RecordingPage.back.click()
        await verify(PatientsPage.patients)
        await LoginPage.restartApp();

    })
    it('Verify add patient functionality {TC16-A}', async() => {
        await HomePage.patients.click()
        await PatientsPage.nokiDashboard.click()
        await PatientsPage.addPatient.click()
        await AddPatitentPage.createNewPatient();
        await LoginPage.restartApp();
    })
})
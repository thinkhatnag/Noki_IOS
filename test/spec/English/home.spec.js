import HomePage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js';
import PatientsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/patients.page.js';
import EncounterPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js';
import SettingsPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js';
import SearchPatientPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/searchPatient.page.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js';
import AddPatientPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js';
import { verify,  verifyAndClick  } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js';
import LoginPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page'
describe("English", () => {
    beforeEach(() => {
      allureReporter.addEpic("NOKI IOS Automation");
      allureReporter.addOwner("Mobile Team");
      allureReporter.addParentSuite("English");
    });
    describe("Existing Patient", () => {
      beforeEach(() => {
        allureReporter.addSuite("Existing Patient");
      });
  
    it('Verify all tab bar elements are working correctly {TC11}', async() => {
        await HomePage.patients.click();
        await verify(PatientsPage.patientSearch)
        await verifyAndClick(HomePage.encounter)
        await verify(EncounterPage.Encounter)
        await verifyAndClick(HomePage.settings)
        await verify(SettingsPage.profileSettings)
        await LoginPage.restartApp()
    });
})
})
//     it('Verify the audio recording process {TC12}', async() => {
//         await HomePage.startNewEncounterButton.click();
//        await SearchPatientPage.patientSearch('Naga')
//         await SearchPatientPage.proceedBTn.click();
//         await verify(RecordingPage.startConversationBtn)
//         await RecordingPage.launguageSelectior.click();
//         await verify(RecordingPage.englishLanOpt)
//         await verifyAndClick(RecordingPage.spanishLanOpt)
//         await LoginPage.restartApp()
//     });

//     it('Start recording after adding a new patient {TC14}', async() => {
//         await HomePage.nokiDashboardButton.click();
//         await HomePage.startNewEncounterButtonNokiDashboard.click();
//         await SearchPatientPage.addPatient.click();
//         await AddPatientPage.addPatientWrn()
//         await AddPatientPage.createNewPatient()
//         await verify(RecordingPage.startConversationBtn)
//         await LoginPage.restartApp()
//     });
// })



// await this.quickActions.click()
// await this.regenerateIcdAndCptCodes.click()
// // await this.ok.click()
// await verify(this.cancle)
// await verifyAndClick(this.Proceed)
// await waitForElement(icdAndCptCodes)
//         await RecordingPage.copyMailPrint()
// await driver.execute('mobile: swipe', { direction: 'up' });
// await this.quickActions.click()
// await this.regenerateCarePlan.click()
// // await this.ok.click()
// await verify(this.cancle)
// await verifyAndClick(this.Proceed)
// await waitForElement(this.carePlan)
//         await RecordingPage.copyMailPrint()
// await driver.execute('mobile: swipe', { direction: 'up' });
// await this.quickActions.click()
// await this.regenerateFeedBack.click()
// // await this.ok.click()
// await verify(this.cancle)
// await verifyAndClick(this.Proceed)
// await waitForElement(this.feedBack)
//         await RecordingPage.copyMailPrint()
// await driver.execute('mobile: swipe', { direction: 'up' });
// await this.quickActions.click()
// await this.regenerateReferalLetter.click()
// // await this.ok.click()
// await verify(this.cancle)
// await verifyAndClick(this.Proceed)
// await waitForElement(this.referalLetter)
//         await RecordingPage.copyMailPrint()
// await driver.execute('mobile: swipe', { direction: 'up' });


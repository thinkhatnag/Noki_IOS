import {  verify, verifyAndClick   } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js'
import HomePage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js'
class SearchPatientPage {
    get patient() {
        return $('~Select Patient');
    }
    get searchPatientsField() {
        return $('//XCUIElementTypeTextField[@value="Search Patients"]');
    }
    get addPatient() {
        return $('//XCUIElementTypeButton[@name="Add Patient"]');
    }
  
    get proceedBTn(){
        return $('//XCUIElementTypeButton[@name="Proceed"]');
    }
    get cancel() {
        return $('//XCUIElementTypeButton[@name="Cancel"]');
    }
    get nokiDashboard() {
        return $('~noki dashboard');
    }
    get startNewEncounter() {
        return $('//XCUIElementTypeButton[@name="Start New Encounter"]');
    }
    async patientName(patient) {
        return $(`~${patient}`); 
    }
    async patientSearch(patient) {
        await this.searchPatientsField.click();
        await this.searchPatientsField.setValue(patient);
        await driver.pause(2000)  
        const patientElement = await this.patientName(patient)
        await verifyAndClick(patientElement);  
        
    }
    async startNewConversation(patient){
        await HomePage.startNewEncounterButton.click()
        await this.patientSearch(patient);
        await this.proceedBTn.click()
        await verifyAndClick(RecordingPage.acknowledgeCheckBox)
        await verifyAndClick(RecordingPage.startConversationBtn)
    }
}
export default new SearchPatientPage();
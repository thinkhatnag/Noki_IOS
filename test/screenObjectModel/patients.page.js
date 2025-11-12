import searchPatientPage from "./searchPatient.page";
import { verifyAndClick } from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";

class PatientsPage {
    get patients() 
    { 
        return $('//XCUIElementTypeStaticText[@name="Patients"]'); 
    }
    get draft() 
    { 
        return $('(//XCUIElementTypeStaticText[@name="Draft Transcript"])[1]'); 
    }

    get patientSearch() 
    { 
        return $('~Search Patients'); 
    }
    get nokiDashboard() 
    { 
        return $('~noki dashboard'); 
    }
    get addPatient() 
    { 
        return $('//XCUIElementTypeButton[@name="Add Patient"]'); 
    }
    get clear() 
    { 
        return $('~Clear text'); 
    }
    get cancel() 
    { 
        return $('//XCUIElementTypeButton[@name="Cancel"]'); 
    }
    get noPatitentFound() 
    { 
        return $('~No Patient Found'); 
    }
    get goBack() 
    { 
        return $('~Left'); 
    }
    get startNewEncounter() 
    { 
        return $('//XCUIElementTypeButton[@name="Start New Encounter"]'); 
    } 
  
    get keyBoardSearch() 
    { 
        return $('~Search'); 
    } 
    async Search(patientName) {
        await this.patientSearch.click();
        await this.patientSearch.setValue(patientName);
    }
    async patientSearchAndContinue(patientName) {
        await this.Search(patientName);
        await driver.pause(2000)  
        const patientElement = await searchPatientPage.patientName(patientName)
        await verifyAndClick(patientElement); 
    }
    

}

export default new PatientsPage();

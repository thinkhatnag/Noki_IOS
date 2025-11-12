import { verify, verifyAndClick } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js';
import RecordingPage from '/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/recording.page.js';
import { faker } from '@faker-js/faker';


class AddPatientPage {
    get addPatientTxt() {
        return $('(//XCUIElementTypeStaticText[@name="Add Patient"])[2]');
    }
    get patientName() {
        return $('//XCUIElementTypeTextField[@value="* First Name & Last Name"]');
    }
    get DOB() {
        return $('//XCUIElementTypeTextField[@value="* DOB"]');
    }
    get  genderPickerTxtField() {
        return $('//XCUIElementTypeTextField[@value="* Gender"]');
    }
    get dobPicker() {
        return $('(//XCUIElementTypeImage[@name="chevron.down"])[2]');
    }
    get yearPickerShow() {
        return $('~DatePicker.Show');
    }
    get previousMonth() {
        return $('~DatePicker.PreviousMonth');
    }
    get nextMonth() {
        return $('~DatePicker.NextMonth');
    }
    get  yearPickerHide() {
        return $('~DatePicker.Hide');
    }
    get monthPicker() {
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }); 
        return $(`//XCUIElementTypePickerWheel[@value="${currentMonth}"]`);
    }
    get  yearPicker() {
        return $('//XCUIElementTypePickerWheel[@value="2025"]');
    }
   
    get  ok() {
        return $('~OK');
    }
    get  genderPicker() {
        return $('~go down');
    }
    get male() {
        return $('~Male');
    }
    get female() {
        return $('~Female');
    }
    get other() {
        return $('~Other');
    }
    get unknown() {
        return $('~Unknown');
    }
    get addAndProceed() {
        return $('//XCUIElementTypeButton[@name="Add and Proceed"]');
    }
    get cancel() {
        return $('//XCUIElementTypeButton[@name="Cancel"]');
    }
    get nameError() {
        return $('~First Name & Last Name is required');
    } 
    get dateError() {
        return $('~DOB is Required');
    } 
    get genderError() {
        return $('~Gender is Required');
    }
    async createNewPatient() {
        const name = faker.person.fullName(); 
        const year = faker.number.int({ min: 1920, max: 2023 }); 
        const month = faker.number.int({ min: 1, max: 12 }); 
        await verifyAndClick(this.patientName)
        await this.patientName.setValue(name)
        await this.dobPicker.click()
        await this.previousMonth.click()
        await this.nextMonth.click()
        await this.yearPickerShow.click()
        await this.yearPicker.setValue(year)
        await this.monthPicker.setValue(month)
        await this.yearPickerHide.click()
        await this.ok.click()
        await this.genderPicker.click()
        await verifyAndClick(this.female)
        await this.genderPicker.click()
        await verifyAndClick(this.other)
        await this.genderPicker.click()
        await verifyAndClick(this.unknown)
        await this.genderPicker.click()
        await this.male.click()
        await verify(this.cancel)
        await verifyAndClick(this.addAndProceed)
        await RecordingPage.patientCreatedOk.click()
        return name
    }
    async addPatientWrn() 
    {
        await verifyAndClick(this.addAndProceed)
        await verify(this.nameError)
        await verify(this.dateError)
        await verify(this.genderError)
    }
}
export default new AddPatientPage();
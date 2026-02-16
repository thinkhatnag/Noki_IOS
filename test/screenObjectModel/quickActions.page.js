import {
  verify,
  verifyAndClick,
  waitForElement,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import RecordingPage from "../screenObjectModel/recording.page.js";

class QuickActions {
  //Quick Action Related
  get quickActionButton() {
    return $('//XCUIElementTypeButton[@name="Quick Actions"]');
  }
  get quicktionsSearchField() {
    return $('//XCUIElementTypeTextField[@value="Search Quick Actions"]');
  }
  get regenerateSoapNote() {
    return $("~Regenerate SOAP Note");
  }

  get translateSoapNote() {
    return $("~Translate soap note to");
  }
  // get french()
  // {
  //     return $('~french');
  // }
  get spanish() {
    return $("~Spanish");
  }
  get english() {
    return $("~English");
  }

  get generateIcdAndCptCodes() {
    return $("~Generate ICD & CPT codes");
  }
  get generateCarePlan() {
    return $("~Generate Care Plan with Explanation");
  }
  get generateFeedBack() {
    return $("~Generate Feedback on Doctor Performance");
  }
  get generateReferalLetter() {
    return $("~Generate Referral Letter");
  }
  get icdAndCptCodes() {
    return $("~ICD & CPT codes");
  }

  get regenerateIcdAndCpt() {
    return $("~Regenerate ICD & CPT codes");
  }
  get regenerateCarePlan() {
    return $("~Regenerate Care Plan with Explanation");
  }
  get carePlan() {
    return $("~Care Plan with Explanation");
  }
  get regenerateFeedBack() {
    return $("~Regenerate Feedback on Doctor Performance");
  }
  get feedBack() {
    return $("~Feedback on Doctor Performance");
  }
  get regenerateReferalLetter() {
    return $("~Regenerate Referral Letter");
  }
  get referalLetter() {
    return $("~Referral Letter");
  }

  get Proceed() {
    return $('//XCUIElementTypeButton[@name="Proceed"]');
  }
  get cancel() {
    return $('//XCUIElementTypeButton[@name="Cancel"]');
  }

  get yes() {
    return $('//XCUIElementTypeButton[@name="Yes"]');
  }
  get no() {
    return $('//XCUIElementTypeButton[@name="No"]');
  }
  get ok() {
    return $("~Ok");
  }
  get C_OK() {
    return $("~OK");
  }
  // get PatientInformationInFrench()
  // {
  //     return $('');
  // }
  get PatientInformationInSpnish() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Información del Paciente"]'
    );
  }
  get PatientInformation() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Patient Information"]'
    );
  }
  get save() {
    return $('//XCUIElementTypeButton[@name="Save"]');
  }
  get cancel() {
    return $('//XCUIElementTypeStaticText[@name="Cancel"]');
  }
  get yes() {
    return $('//XCUIElementTypeStaticText[@name="Yes"]');
  }
  get no() {
    return $('//XCUIElementTypeStaticText[@name="No"]');
  }
  async SOAPNote() {
    await waitForElement(this.quickActionButton);
    await this.quickActionButton.click();
    await verify(this.quicktionsSearchField);
    await verifyAndClick(this.regenerateSoapNote);
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(RecordingPage.SoapNoteBtn);
    await RecordingPage.copyMailPrint();
  }
  async translateSoapNote() {
    await waitForElement(this.quickActionButton);
    await this.quickActionButton.click();
    await this.translateSoapNote.click();
    await this.spanish.click();
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.PatientInformationInSpnish);
    await RecordingPage.copyMailPrint();

    // await driver.execute('mobile: swipe', { direction: 'up' });
    // await driver.execute('mobile: swipe', { direction: 'down' });
    //                 await driver.execute('mobile: swipe', { direction: 'down' });

    await this.quickActionButton.click();
    await this.translateSoapNote.click();
    await this.english.click();
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.PatientInformation);
  }
  // await driver.execute('mobile: swipe', { direction: 'up' });                  //icd and cpt codes
  // await driver.execute('mobile: swipe', { direction: 'down' });
  // await driver.execute('mobile: swipe', { direction: 'up' });
  // await driver.execute('mobile: swipe', { direction: 'down' });
  async ICD_CPT() {
    await waitForElement(RecordingPage.quickActionButton);
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.generateIcdAndCptCodes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.icdAndCptCodes);
    await RecordingPage.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateIcdAndCpt);
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.icdAndCptCodes);
    await RecordingPage.copyMailPrint();
  }
  async care_Plan() {
    await this.quickActionButton.click();
    await this.generateCarePlan.click();
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.carePlan);
    await RecordingPage.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateCarePlan);
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.carePlan);
    await RecordingPage.copyMailPrint();
  }
  async feed_back() {
    await this.quickActionButton.click();
    await this.generateFeedBack.click();
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.feedBack);
    await RecordingPage.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateFeedBack);
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.feedBack);
    await RecordingPage.copyMailPrint();
  }
  async referal_Letter() {
    await this.quickActionButton.click();
    await this.generateReferalLetter.click();
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.referalLetter);
    await RecordingPage.copyMailPrint();
    await this.quickActionButton.click();
    await verifyAndClick(this.regenerateReferalLetter);
    await verifyAndClick(this.yes);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await waitForElement(this.referalLetter);
    await RecordingPage.copyMailPrint();
  }
  async NotesAndScales(){
    
  }
}
export default new QuickActions();

// await driver.execute('mobile: swipe', { direction: 'up' });
// await driver.execute('mobile: swipe', { direction: 'down' });
// await driver.execute('mobile: swipe', { direction: 'down' });
// await this.quickActions.click()
// await verifyAndClick(this.translateSoapNote)
// await verify(this.french)
// await verify(this.cancel)
// await verifyAndClick(this.Proceed)
// await waitForElement(this.PatientInformationInSpnish)
// await RecordingPage.copyMailPrint()
// await driver.execute('mobile: swipe', { direction: 'up' });

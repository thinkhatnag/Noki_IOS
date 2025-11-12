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
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import SettingsPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/setting.page.js";
import AddPatitentPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/addPatient.page.js";
import QuickActions from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/quickActions.page.js";
import SpanishLanguage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/spanishLanguage.js";


it("home Screen UI Verifation", async () => {
  await verify(HomePage.homeScreenAnimation);
  await verifyAndClick(HomePage.patients);
  await verify(PatientsPage.patientSearch);
  await verifyAndClick(HomePage.encounter);
  await verify(EncounterPage.Encounter);
  await verifyAndClick(HomePage.settings);
  await verifyAndClick(SettingsPage.home);
});
it("Setting screen Profile Edit Verification ", async () => {
  await HomePage.settings.click();
  await verifyAndClick(SettingsPage.profileSettings);
  await SettingsPage.profileSettingScreen();
});

it("NOKI Support Verification ", async () => {
  await SettingsPage.SetthingsPageVerifiCation();
});

it("verifying the Laguage Change and general settings for Noki settings screen", async () => {
  await HomePage.settings.click();
  await verifyAndClick(SettingsPage.launguage);
  await verifyAndClick(SettingsPage.spanish);
  await verifyAndClick(SettingsPage.Idioma);
  await verifyAndClick(SettingsPage.english);
  await verifyAndClick(SettingsPage.generalSettings);
  await verifyAndClick(SettingsPage.diognosisJustification);
  await verifyAndClick(SettingsPage.cdss);
  await verifyAndClick(SettingsPage.cancel);
  await verifyAndClick(SettingsPage.generalSettings);
  await verify(SettingsPage.cdss);
  await verify(SettingsPage.diognosisJustification);
  await SettingsPage.cancel.click();
  // await verifyAndClick(SettingsPage.logoutBtn)
  // await verifyAndClick(SettingsPage.logoutcancelationBtn)
  await verifyAndClick(SettingsPage.home);
});

it("Initiate conversations with existing patient", async () => {
  await HomePage.startNewEncounterButton.click();
  await SearchPatientPage.patientSearch("Naga");
  await verifyAndClick(SearchPatientPage.proceedBTn);
});

it("Record the  first conversation for Exiciting patient and verifying all the Offline Scenarios ", async () => {
  await RecordingPage.startConversation();
  await RecordingPage.recordAudioforOfflineForExistingPatient()
}); 

it("CDSS  Transcript  SOAP Note - verification for an exiciting patient for First Conversation", async () => {
  await RecordingPage.CDSS_Transcript_SOAPNote_Conformation();
});

it("Second conversation, verifying SOAP_NOTE and Transcript generation for ", async () => {
  await RecordingPage.multiple_Conversations_For_Existing_Patient();
});
it("Third conversation, making draft transcript and verify the Draft,verify SoapNote and Transcript", async () => {
  await RecordingPage.multiple_Conversation_For_Existing_Patient();
});

it("Quick Actions flow for generation /regenerationof all templates and sending emails for every update.", async () => {
  await QuickActions.quickAction();
});

it("verifying the Finalizing of the encounter with out any draft is ther in that particular transcript", async () => {
  await RecordingPage.finalize_Encounter();
  await LoginPage.restartApp();
});

it("crating a new Patient", async () => {
  //crating a new Patient
  await waitForElement(HomePage.startNewEncounterButton);
  await HomePage.startNewEncounterButton.click();
  await verifyAndClick(SearchPatientPage.addPatient);
  await AddPatitentPage.addPatientWrn();
  await AddPatitentPage.createNewPatient();
});

it.only("Record First the conversation for new patient ", async () => {
  await RecordingPage.startConversation();
  await RecordingPage.recordAudioforOfflineMode()});
  

it("CDSS - Transcript - SOAP Note verification For newly created Patient", async () => {
  await RecordingPage. CDSS_Transcript_SOAPNote_Conformation();
});

it("Second Conversation, verifying CDSS Transcript SOAP NOTE verification", async () => {
  await RecordingPage.multiple_Conversations_For_New_Patient();

});
it("Third conversation, verifying of draft trancript completion before finalizing the encounter", async () => 
  {
  await RecordingPage.multiple_Conversation();

});


it("Quick Actions flow for generation /regenerationof all templates and sending emails for every update. ", async () => {
  await QuickActions.quickAction();
});

it("verifying the Finalizing of the encounter of a newly created patient ", async () => {
  await RecordingPage.finalize_Encounter();
  await LoginPage.restartApp();
});

it("Verification of app switching to spanish launguage", async () => {
  await LoginPage.restartApp();
  await verifyAndClick(HomePage.settings);
  await verifyAndClick(SettingsPage.launguage);
  await verifyAndClick(SettingsPage.spanish);
  await verifyAndClick(SettingsPage.home);
});
it("creating new patient -spanish", async () => {

await SpanishLanguage.startNewEncounter.click();
  await SpanishLanguage.addPatient.click();
  await SpanishLanguage.createNewPatient();
})
it("Intiating first conversation for Offline recording and soapNote generation -Spanish", async () => {
  await SpanishLanguage.startConversation();
  await SpanishLanguage.recordAudioforOfflineMode();
});

it("CDSS - Transcript - SOAP Note verification For newly created Patient -Spanish", async () => {
  await SpanishLanguage.CDSS_Transcript_SOAPNote_Conformation();
});
it("Second Conversation, verifying CDSS Transcript SOAP NOTE verification for Newly created patient -Spanish", async () => {
  await SpanishLanguage.second_Conversations_For_New_Patient();
});

it("Third onversation, verifying CDSS Transcript SOAP NOTE verification for Newly created patient -Spanish", async () => {
  await SpanishLanguage.multiple_Conversation()
});

it("Quick Actions for a new patient, verifying generation/regeneration of all templates and sending emails for every update, app launguage is spanish", async () => {
  await SpanishLanguage.quickAction();
});

it("verifying the Finalizing of the encounter of a newly created patient, app launguage is in spanish", async () => {
  await SpanishLanguage.finalize_Encounter();
  await LoginPage.restartApp();
});

it("verification of intiating the new encunter for already Exicting patient", async () => {
  await SpanishLanguage.startNewEncounter.click();
  await SpanishLanguage.patientSearch("Naga");
});

it("verification of offline recording for already Existing Patient -Spanish  ", async () => {
  await SpanishLanguage.startConversation();
  await SpanishLanguage.recordAudioAndContinueForPrevEncounter();
});

it("CDSS - Transcript - SOAP Note verification for First conversation of Existing Patient -Spanish", async () => {
  await SpanishLanguage.CDSS_Transcript_SOAPNote_Conformation();
});

it("Second conversation for already Exicting Patient -Spanish", async () => {
  await SpanishLanguage.second_Conversations_For_Exicting_Patient();
});
it("Creating a draft transcript and completion and SoapNote Generation -Spanish ", async () => {
  await SpanishLanguage.third_Conversation_For_Existing_Patitent();
});

it("Quick Actions for an Exicting patient,flow for generation / Regeneration all templates and sending emails for every update - Spanish", async () => {
  await SpanishLanguage.quickAction();
});

it("verifying the Finalizing of the encounter of an Existing patient, without any draft is there in that particular Encounter -Spanish", async () => {
  await SpanishLanguage.finalize_Encounter();
  await LoginPage.restartApp();
});

// it("SettingsPage test case with complete Offlinr Recording all 10 scenarios ", async () => {
//   await RecordingPage.startConversationBtn.click();
// await RecordingPage.recordAudioforOfflineMode();
//   await driver.pause(120000);
//   await waitForElement(RecordingPage.SoapNoteBtn);
//   await verifyAndClick(RecordingPage.Transcript);
//   const recordText = await RecordingPage.dataScanning(RecordingPage.cleanedTranscriptScroll);
//   await RecordingPage.audioManager.TextComparison(recordText);
// });

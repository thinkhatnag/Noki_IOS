import {
  verifyAndClick,
  verify,
  waitForElement,
  swipe,
  aeroplaneModeOn,
  aeroplaneModeOff,
  playTTS,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import LoginPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/login.page.js";
import EncounterPage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/encounter.page.js";
import HomePage from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/home.page.js";
import { exec } from "child_process";
import allureRepoter from "@wdio/allure-reporter";
import AudioManeger from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/audioManeger.js";
import util from "util";
import path from "path";
import fs from "fs";
import QuickActions from "/Users/nagasubarayudu/Desktop/IOS/test/screenObjectModel/quickActions.page.js";

const execPromise = util.promisify(exec);

class RecordingPage {
  get search() {
    return $("~Search");
  }
  get ok() {
    return $("~Ok");
  }
  get back() {
    return $('//XCUIElementTypeButton[@name="backArrow"]');
  }
  get RecordingBack() {
    return $("~Left");
  }
  get ContinueBtn() {
    return $('//XCUIElementTypeButton[@name="CONTINUE"]');
  }
  get saveAsDraftBtn() {
    return $('//XCUIElementTypeButton[@name="SAVE AS A DRAFT"]');
  }
  get discardBtn() {
    return $('//XCUIElementTypeButton[@name="DISCARD"]');
  }
  get templateSoapNote() {
    return $('//XCUIElementTypeTextField[@value="SOAP Note"]');
  }
  get launguageSelectior() {
    return $('//XCUIElementTypeTextField[@value="English"]');
  }
  get launguageSelectText() {
    return $('//XCUIElementTypeStaticText[@name="Select a scribe Language"]');
  }
  get doneBtn() {
    return $("~Done");
  }
  get returnBtn() {
    return $("~Return");
  }
  get englishLanOpt() {
    return $("~English");
  }
  get spanishLanOpt() {
    return $("~Español");
  }
  get confirmationText() {
    return $(
      '//XCUIElementTypeTextView[@value="Please ensure you have verbal consent from the patient before using Noki\'s AI ambient scribe for clinical documentation. View Consent"]',
    );
  }

  get confirmationTextCheckBox() {
    return $("~checkmark.square.fill");
  }

  get startConversationBtn() {
    return $('//XCUIElementTypeButton[@name="Start Conversation"]');
  }
  get txtConfm() {
    return $(
      "~Please ensure you have verbal consent from the patient before using Noki's AI ambient scribe for clinical documentation. View Consent",
    );
  }
  get pauseBtn() {
    return $("~Pause");
  }
  get patientCreatedOk() {
    return $("~OK");
  }
  get resumeRecording() {
    return $('//XCUIElementTypeButton[@name="Resume Recording"]');
  }
  get resumeRecordingConformationYes() {
    return $('//XCUIElementTypeButton[@name="YES"]');
  }

  get resumeRecordingConformationNO() {
    return $('//XCUIElementTypeButton[@name="NO"]');
  }

  get stopBtn() {
    return $("~stopRecord");
  }
  get playBtn() {
    return $("~playBtnIcon");
  }
  get PrevEncounterRef() {
    return $(
      "~Would you like to use the previous encounter's SOAP note as context?",
    );
  }
  get PrevEncounterRefNo() {
    return $('//XCUIElementTypeButton[@name="NO"]');
  }
  get PrevEncounterRefYes() {
    return $('//XCUIElementTypeButton[@name="YES"]');
  }
  get notEnoughTranscript() {
    return $("~Not enough transcript to generate clinical notes.");
  }
  get notEnoughTranscriptOk() {
    return $('//XCUIElementTypeButton[@name="OK"]');
  }

  get SoapNoteBtn() {
    return $("~SOAP Note");
  }
  get soapNoteTable() {
    return $("~scrollView");
  }
  get patientInformation() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Patient Information"]',
    );
  }
  get subjective() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Subjective"]',
    );
  }
  get objective() {
    return $('//XCUIElementTypeStaticText[@name="Objective"]');
  }
  get assessment() {
    return $('//XCUIElementTypeStaticText[@name="Assessment"]');
  }
  get plan() {
    return $('//XCUIElementTypeStaticText[@name="Plan"]');
  }
  get additinalInformation() {
    return $('//XCUIElementTypeStaticText[@name="Additional Information"]');
  }
  get name() {
    return $('//XCUIElementTypeTextField[@value="Name :"]');
  }
  get age() {
    return $('//XCUIElementTypeTextField[@value="Age :"]');
  }
  get gender() {
    return $('//XCUIElementTypeTextField[@value="Gender :"]');
  }
  get encounterDate() {
    return $('//XCUIElementTypeTextField[@value="Encounter Date :"]');
  }

  get chiefComplain() {
    return $("~Chief Complaint CC");
  }
  get historyofprsentIllness() {
    return $("~History of Present Illness HPI");
  }
  get pastMedicalHistory() {
    return $("~Past Medical History");
  }
  get socialHistory() {
    return $("~Social History");
  }
  get familyHistory() {
    return $("~Review of Systems ROS");
  }
  get reviewofSystems() {
    return $("~Review of Systems ROS");
  }
  get vitalSigns() {
    return $("~Vital Signs");
  }
  get generallAppearance() {
    return $("~General Appearance");
  }
  get physicalApperence() {
    return $("~Physical Examination");
  }
  get Diognosis() {
    return $('(//XCUIElementTypeStaticText[@name="Diagnosis :"])[3]');
  }
  get clinicalImpression() {
    return $("~Treatment Plan");
  }
  get treatmentPlan() {
    return $("~Treatment Plan");
  }
  get patitentEducation() {
    return $("~Patient Education");
  }
  get followUp() {
    return $("~Follow-Up");
  }
  get medications() {
    return $("~Medications");
  }

  get allergies() {
    return $("~Allergies");
  }
  get immunization() {
    return $("~Immunizations");
  }
  get referal() {
    return $('//XCUIElementTypeTextView[@name="Referral"]');
  }

  get Transcript() {
    return $("~Transcript");
  }
  get Cdss() {
    return $("~CDSS");
  }
  get CDSSLimitExceded() {
    return $("~No CDSS Data Found");
  }
  get SuggestedDiagnosisAndInterventions() {
    return $("~Suggested Diagnosis and Interventions");
  }
  get SuggestedQuestions() {
    return $("~Suggested Questions");
  }
  get SuggestedMedications() {
    return $("~Suggested Medications");
  }
  get SuggestedFollowups() {
    return $("~Suggested Diagnostic Testing");
  }

  get originalTrnscript() {
    return $('//XCUIElementTypeButton[@name="Show Original Transcript"]');
  }
  get originalTrnscriptTableView() {
    return $("");
  }
  get claeanedTranscript() {
    return $('//XCUIElementTypeButton[@name="Show Cleaned Transcript"]');
  }
  get claeanedTranscriptTableView() {
    return $('//XCUIElementTypeButton[@name="Show Cleaned Transcript"]');
  }
  get copyBtn() {
    return $("~copy");
  }
  get update() {
    return $("~pencil.line");
  }
  get AddPatientInformation() {
    return $("~+  Add Patient Information");
  }
  get AddPatientInformationInSpanish() {
    return $("~+  Add Información del Paciente");
  }
  get save() {
    return $('//XCUIElementTypeStaticText[@name="Save"]');
  }
  get cancel() {
    return $('//XCUIElementTypeStaticText[@name="Cancel"]');
  }

  get titleInSpanish() {
    return $('(//XCUIElementTypeTextView[@value="Título"])[1]');
  }
  get discriptionInSpanish() {
    return $('(//XCUIElementTypeTextView[@value="Descripción"])[1]');
  }
  get add() {
    return $('(//XCUIElementTypeButton[@name="selected"])[1]');
  }
  get clearPatientInfo() {
    return $('(//XCUIElementTypeStaticText[@name="❌"])[1]');
  }
  get patientInfoRequiredPopUp() {
    return $("~Patient Information is Required");
  }
  get soapNoteUpdatedSucessPopUP() {
    return $("~Soap Note Updated Successfully");
  }

  get resumeConversationForMultipleConverstionScenario() {
    return $('//XCUIElementTypeButton[@name="Resume Conversation"]');
  }
  get resumeConversationForMultipleConverstionScenarioYes() {
    return $('//XCUIElementTypeButton[@name="Yes"]');
  }
  get resumeConversationForMultipleConverstionScenarioNo() {
    return $('//XCUIElementTypeButton[@name="No"]');
  }
  get popUpForForTheFinalazeEncounterOfDraftTranscript() {
    return $("~Please continue or delete the draft to finalize the encounter.");
  }
  get cleanedTranscriptScroll() {
    return $(
      '//XCUIElementTypeApplication[@name="Noki-T"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeScrollView',
    );
  }
  get offlineModeRTranscription() {
    return $("~No transcript available in offline mode");
  }
  get offlineConversationSaved() {
    return $(
      `//XCUIElementTypeStaticText[@name="We’ve saved your conversation. It’ll sync when you’re connected again."]`,
    );
  }
  get endEncounter() {
    return $(`//XCUIElementTypeStaticText[@name="End Encounter"]`);
  }

  get mailBtn() {
    return $("~mail");
  }
  get emailSentOk() {
    return $("~OK");
  }
  get printBtn() {
    return $("~print");
  }
  get printPagePrintBtn() {
    return $("~Print");
  }
  get printConformation() {
    return $('(//XCUIElementTypeButton[@name="Print"])[2]');
  }
  get printDownload() {
    return $("~Download");
  }
  get printDownloadCopyOption() {
    return $('//XCUIElementTypeCell[@name="Copy"]');
  }
  get printDownloadMarkup() {
    return $('//XCUIElementTypeStaticText[@name="Markup"]');
  }
  get printDownloadPrint() {
    return $('//XCUIElementTypeStaticText[@name="Print"]');
  }
  get printDownloadAddTags() {
    return $('//XCUIElementTypeStaticText[@name="Add Tags"]');
  }
  get printDownloadSaveToFiles() {
    return $('//XCUIElementTypeStaticText[@name="Save to Files"]');
  }
  get printDownloadExitActions() {
    return $('//XCUIElementTypeButton[@name="Edit Actions…"]');
  }
  get pdfSavedOk() {
    return $("~Ok");
  }

  get printPageOptions() {
    return $('//XCUIElementTypeStaticText[@name="Options"]');
  }
  get printCancel() {
    return $("~Cancel");
  }
  get printPageCancel() {
    return $("~Cancel");
  }
  get printPageBackBtn() {
    return $("~Left");
  }

  get Mic() {
    return $("~micIcon");
  }
  get send() {
    return $("~send_btn");
  }
  get AddConversation() {
    return $('//XCUIElementTypeButton[@name="Add Conversation"]');
  }

  get AddConversationConfirmationYes() {
    return $('//XCUIElementTypeButton[@name="Yes"]');
  }

  get AddConversationNo() {
    return $('//XCUIElementTypeButton[@name="No"]');
  }

  get finaliseEncounter() {
    return $("~finalizedBtn");
  }

  get finaliseEncounterTxt() {
    return $(
      "~Are you sure to finalize the encounter and disable all the actions available ?",
    );
  }
  get finaliseEncounterOk() {
    return $('//XCUIElementTypeButton[@name="Ok"]');
  }
  get errorOk() {
    return $("~Ok");
  }
  get finaliseEncounterCancel() {
    return $('//XCUIElementTypeButton[@name="Cancel"]');
  }
  get finaliseEncounteSuccesseTxt() {
    return $('//XCUIElementTypeStaticText[@name="Success"]');
  }
  get finaliseEncounterSuccess() {
    return $("~Encounter Finalised Successfully");
  }
  get finaliseEncounterConformed() {
    return $("~Ok");
  }
  get PatientInfo() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Patient Information"]',
    );
  }
  get Subject() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Subjective"]',
    );
  }
  get Object() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Objective"]',
    );
  }
  get Assessment() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Assessment"]',
    );
  }
  get Plan() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Plan"]',
    );
  }
  get AdditionalInfo() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Additional Information"]',
    );
  }
  get connectionLost() {
    return $("~Connection Lost!");
  }
  get connectionLostOk() {
    return $('(//XCUIElementTypeButton[@name="Close"])[2]');
  }
  get MicStop() {
    return $("~micBackgroundImage");
  }

  get backToPatientScreen() {
    return $("~Left");
  }
  get networkFailure() {
    return $("~No internet connection found. Please check your connection.");
  }
  get acknowledgeCheckBox() {
    return $("~square");
  }
  get acknowledgeAndContinue() {
    return $(
      '-ios class chain:**/XCUIElementTypeButton[`name == "Acknowledge & Continue"`]',
    );
  }
  get networkFailureOk() {
    return $('(//XCUIElementTypeButton[@name="Close"])[2]');
  }

  //multiple conversations

  get cdssFromCurrentConversation() {
    return $("");
  }

  async Audio() {
    await driver.pause(4000);
    await AudioManeger.playAudio("english");
    await driver.pause(80000);
    await AudioManeger.stopAudio();
  }
  async recordAudio() {
    await this.Audio();
    await verifyAndClick(this.stopBtn);
  }
  async CDSS_Verification() {
    if (await this.notEnoughTranscript.isDisplayed()) {
      console.error(
        "Recording failed: Please provide a proper medical conversation",
      );
    } else {
      await waitForElement(this.SoapNoteBtn);
      console.log("Recording successful: Transcript generated");
    }
    await waitForElement(QuickActions.quickActionButton);
    await verifyAndClick(this.Transcript);
    await verifyAndClick(this.Cdss);
    await driver.pause(2000);
    const elements =
      this.SuggestedDiagnosisAndInterventions ||
      this.SuggestedDiagnosticTesting ||
      this.SuggestedMedications ||
      this.SuggestedQuestions;

    if (elements.isDisplayed()) {
      console.log("CDSS is generated properly");
    } else if (this.CDSSLimitExceded.isDisplayed()) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Kindly please verify the CDSS is off / your CDSS subscription is over",
      );
    }
  }
  async Transcript_Verification() {
    await verify(this.Transcript);
    await driver.pause(3000);
    await verifyAndClick(this.Transcript);
    await this.dataScaning(this.cleanedTranscriptScroll);
    await AudioManeger.TextComparison("english");
    await verifyAndClick(this.originalTrnscript);
    await verifyAndClick(this.claeanedTranscript);
  }

  async SOAPNote_Verification() {
    await waitForElement(QuickActions.quickActionButton);
    await verify(this.SoapNoteBtn);
    await verifyAndClick(this.SoapNoteBtn);
    await this.copyMailPrint();
    await await driver.execute("mobile: swipe", { direction: "up" });
    await driver.execute("mobile: swipe", { direction: "down" });
    await driver.execute("mobile: swipe", { direction: "down" });
    await verify(this.patientInformation);
  }
  get C_OK() {
    return $("~OK");
  }
  async multiple_Conversation() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationNo);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await verify(this.pauseBtn);
    await this.recordAudioAndSaveAsDraft();
    console.log(
      "Here we are making the transcription as draft for verifying the flow of the draft trancript resuming and finalizing Encounter with a draft transcript.",
    );
    await driver.pause(3000);
    await LoginPage.restartApp();
    await waitForElement(HomePage.encounter);
    await verifyAndClick(HomePage.encounter);
    await driver.pause(3000);
    await EncounterPage.clickDraftTranscript();
    await waitForElement(this.finaliseEncounter);
    await verifyAndClick(this.finaliseEncounter);
    await driver.pause(3000);
    console.log(
      "here we have verified that enounter will not be finalized consisting of draft transcript",
    );
    await verifyAndClick(this.C_OK);
    await verifyAndClick(this.resumeConversationForMultipleConverstionScenario);
    await verifyAndClick(
      this.resumeConversationForMultipleConverstionScenarioYes,
    );
    console.log(
      "Here we are continueng our converstion  with a draft transcription",
    );
    await this.recordAudio();
  }
  async second_conversation_For_Existing_Patient() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await this.recordAudioForExicistingPatient();
  }
  async second_Conversations_For_New_Patient() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await this.recordAudio();
  }
  async third_Conversations_For_New_Patient() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await this.recordAudio();
  }
  async third_Conversation_For_Existing_Patient() {
    await this.multiple_Conversation();
    await verify(this.PrevEncounterRef);
    await verifyAndClick(this.PrevEncounterRefNo);
  }

  async finalize_Encounter() {
    await waitForElement(this.SoapNoteBtn);
    // await verifyAndClick(this.SoapNoteScreenTxtField);
    // await verifyAndClick(this.returnBtn);
    await verifyAndClick(this.finaliseEncounter);
    await verifyAndClick(this.finaliseEncounterOk);
    await driver.pause(20000);
  }
  async recordAudioAndSaveAsDraft() {
    await AudioManeger.playAudio("english");
    await driver.pause(30000);
    await AudioManeger.stopAudio();
    await driver.pause(3000);
    await verifyAndClick(this.RecordingBack);
    await verifyAndClick(this.saveAsDraftBtn);
  }
  async recordAudioForExicistingPatient() {
    await this.recordAudio();
    await verify(this.PrevEncounterRef);
    await verifyAndClick(this.PrevEncounterRefNo);
  }
  async recordAudioForDraft() {
    await verifyAndClick(this.resumeRecording);
    await verifyAndClick(this.resumeRecordingConformationYes);
    await this.recordAudio();
  }
  async startConversation() {
    await verifyAndClick(this.startConversationBtn);
    await verifyAndClick(this.acknowledgeAndContinue);
  }
  async sleepModeConformation() {
    await driver.activateApp("com.thinkhat.heynoki");
    await verifyAndClick(HomePage.encounter);
    await verifyAndClick(EncounterPage.Draft);
    try {
      await verify(this.SoapNoteBtn);
    } catch (error) {
      console.error(
        "the soap note is not yet realy displayed or somthing unexpected happened",
      );
    }
  }
  async copyMailPrint() {
    await verifyAndClick(this.copyBtn);
    await verifyAndClick(this.mailBtn);
    await verifyAndClick(this.emailSentOk);
    await verifyAndClick(this.printBtn);
    await verify(this.printDownload);
    await driver.pause(5000);
    await verifyAndClick(this.printPageCancel);
    await verifyAndClick(this.printPageBackBtn);
  }

  async recordAudioforOfflineMode() {
    await AudioManeger.playAudio("english");
    console.log("Audio started:", AudioManeger.currentAudioFile);
    await this.recordAudioforOfflineModeMT();
    await driver.pause(5000);
    await verifyAndClick(this.pauseBtn);
    await AudioManeger.pauseAudio();
    console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
    await driver.pause(5000);
    await verifyAndClick(this.playBtn);
    await AudioManeger.resumeAudio(); //correct
    console.log("Audio resumed:", AudioManeger.currentAudioFile);
    await driver.pause(30000); //aagain playing audio for 1 min in online
    await AudioManeger.pauseAudio();
    await driver.pause(2000);

    await aeroplaneModeOn();

    await driver.pause(5000);
    await AudioManeger.pauseAudio();
    await driver.terminateApp(process.env.BUNDLE_ID); // step verifying the app screen to be in recording screen only even in offline
    await driver.pause(10000);
    await driver.activateApp(process.env.BUNDLE_ID);
    await waitForElement(this.ContinueBtn);
    await verifyAndClick(this.ContinueBtn);
    console.log(
      "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page",
    );
    await AudioManeger.resumeAudio();
    await driver.pause(60000);
    await AudioManeger.stopAudio();
    await verifyAndClick(this.stopBtn);
    console.log(
      "here after app got closed while recording we magaing automatically again resumed the audio",
    );
    await driver.pause(5000);
    await verify(this.offlineConversationSaved);

    await driver
      .action("pointer")
      .move({ duration: 0, x: 355, y: 22 })
      .down({ button: 0 })
      .move({ duration: 1000, x: 354, y: 720 })
      .up({ button: 0 })
      .perform();
    const airplaneModeBtn = await $("~airplane-mode-button");
    await verifyAndClick(airplaneModeBtn);

    await driver
      .action("pointer")
      .move({ duration: 0, x: 283, y: 790 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform(); // device come to online
    await driver.pause(5000);
    console.log(
      "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved",
    );
  }
  async recordAudioforOfflineForExistingPatient() {
    await this.recordAudioforOfflineMode();
    await waitForElement(this.PrevEncounterRefNo);
    await verifyAndClick(this.PrevEncounterRefNo);
  }

  async recordAudioforOfflineModeMT() {
    let timesToRun = 2;
    let count = 0;
    console.log(`Loop will run ${timesToRun} times`);
    for (let i = 0; i < timesToRun; i++) {
      await driver.pause(10000);
      await aeroplaneModeOn();
      await driver.pause(10000);
      await verify(this.offlineModeRTranscription);
      await driver.pause(5000);
      await aeroplaneModeOff();
      await driver.pause(5000);
    }
  }
  async dataScaning(scrollablelement) {
    const allScannedTexts = [];

    // ✅ Two possible stop markers
    const stopMarkers = ["--- Conversación 2 ---", "--Conversation 2 --"];

    // 1️⃣ Scan all visible text views
    const textViews = await $$("//XCUIElementTypeTextView");

    for (const textView of textViews) {
      const text = await textView.getText();
      if (text) {
        allScannedTexts.push(text.trim());
      }
    }

    const combinedText = allScannedTexts.join("\n");
    let textToSave = combinedText;

    let firstMarkerIndex = -1;
    for (const marker of stopMarkers) {
      const index = combinedText.toLowerCase().indexOf(marker.toLowerCase());
      if (
        index !== -1 &&
        (firstMarkerIndex === -1 || index < firstMarkerIndex)
      ) {
        firstMarkerIndex = index;
      }
    }

    if (firstMarkerIndex !== -1) {
      textToSave = combinedText.substring(0, firstMarkerIndex).trim();
      console.log(
        `🛑 Found stop marker at index ${firstMarkerIndex}. Saving only text BEFORE it.`,
      );
    } else {
      console.log(`✅ No stop markers found. Saving ALL scanned content.`);
    }

    // 4️⃣ Split into lines and remove empty lines
    const seen = new Set();
    const finalContentArray = [];

    textToSave
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .forEach((line) => {
        if (!seen.has(line)) {
          seen.add(line); // keep FIRST occurrence
          finalContentArray.push(line);
        }
      });

    // 5️⃣ Save to file
    const dirPath = "./_results_";
    const filePath = path.join(dirPath, `scanned_texts_${Date.now()}.txt`);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, finalContentArray.join("\n"), "utf-8");

    console.log(`✅ Saved ${finalContentArray.length} lines to: ${filePath}`);
    return finalContentArray;
  }

  async bloodGroup(name) {
    return $(
      `//XCUIElementTypeStaticText[@name="main label" and @label="${name}"]`,
    );
  }

  async bloodName(name) {
    return await waitForElement($(`~${name}`));
  }
  get title() {
    return $('//XCUIElementTypeTextView[@value="Title"]');
  }
  get titleTextField() {
    return $(
      '-ios class chain:**/XCUIElementTypeOther[`name == "Stack view"`]/XCUIElementTypeOther[6]/XCUIElementTypeOther/XCUIElementTypeTextView[1]',
    );
  }
  get Discription() {
    return $('(//XCUIElementTypeTextView[@value="Description"])[1]');
  }
  get discriptionTextField() {
    return $(
      '-ios class chain:**/XCUIElementTypeOther[`name == "Stack view"`]/XCUIElementTypeOther[6]/XCUIElementTypeOther/XCUIElementTypeTextView[2]',
    );
  }
  async UpdatePatientInfo() {
    await waitForElement(this.update);
    await verifyAndClick(this.update);
    await verifyAndClick(this.AddPatientInformation);
    await verifyAndClick(this.title);
    await this.titleTextField.setValue("Blood Group");
    await verifyAndClick(this.Discription);
    await this.discriptionTextField.setValue("O positive");
    await verifyAndClick(this.add);
    await verifyAndClick(this.save);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await this.bloodGroup("Blood Group");
    await this.bloodName("O positive");
  }
  get SoapNoteScreenTxtField() {
    return $(
      '//XCUIElementTypeTextView[@value="Click on the mic and start speaking.."]',
    );
  }
  get SoapNoteScreenTxtFieldEntry() {
    return $(
      "-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther",
    );
  }

  async manualUpdate() {
    await waitForElement(this.SoapNoteScreenTxtField);
    await verifyAndClick(this.SoapNoteScreenTxtField);
    await this.SoapNoteScreenTxtFieldEntry.setValue("Blood Group O negitive");
    // await verifyAndClick(this.returnBtn);
    await verifyAndClick(this.send);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await this.bloodGroup("Blood Group");
    await this.bloodName("O negitive");
  }
  async hayNoki() {
    await waitForElement(this.Mic);
    await verifyAndClick(this.Mic);
    await driver.pause(2000);
    await playTTS("Blood group is B negative", "Alex", 1.1);
    await driver.pause(2000);
    await verifyAndClick(this.MicStop);
    await driver.pause(3000);
    await verifyAndClick(this.send);
    await waitForElement(this.C_OK);
    await verifyAndClick(this.C_OK);
    await this.bloodGroup("Blood Group");
    await this.bloodName("B negative");
  }
}

export default new RecordingPage();

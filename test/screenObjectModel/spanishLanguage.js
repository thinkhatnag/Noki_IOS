import {
  waitForElement,
  verifyAndClick,
  verify,
  aeroplaneModeOn,
  aeroplaneModeOff,
  playTTS,
  LiveTranscript,
  validate,
} from "../../helpers/helper.js";
import AudioManager from "../screenObjectModel/audioManeger.js";
import { faker } from "@faker-js/faker";

import LoginPage from "../screenObjectModel/login.page.js";
import RecordingPage from "../screenObjectModel/recording.page.js";
import HomePage from "../screenObjectModel/home.page.js";
import EncounterPage from "../screenObjectModel/encounter.page.js";
import AudioManeger from "../screenObjectModel/audioManeger.js";
class SpanishLanguage {
  get Done() {
    return $("~Done");
  }

  get newUserREsgistrationText() {
    return $(
      "~¿Nuevo usuario? Por favor, visita el sitio web de Noki para crear una nueva cuenta."
    );
  }
  get emailField() {
    return $('//XCUIElementTypeTextField[@value="Correo electrónico*"]');
  }
  get passwordField() {
    return $('//XCUIElementTypeSecureTextField[@value="Contraseña*"]');
  }
  get loginButton() {
    return $('//XCUIElementTypeButton[@name="Iniciar sesión"]');
  }
  get errorMessage() {
    return $("~Se requiere Contraseña");
  }
  get WrongPassword() {
    return $(
      "~La contraseña no es válida o el usuario no tiene una contraseña."
    );
  }
  get emailError() {
    return $("~Se requiere el correo electrónico");
  }
  get forgotPasswordEmailError() {
    return $("~Se requiere el correo electrónico");
  }
  get invalidEmailError() {
    return $("~Correo electrónico no válido");
  }
  get emailNotRegisteredError() {
    return $(
      "~No hay ninguna cuenta asociada con la dirección de correo electrónico"
    );
  }
  get shortPassword() {
    return $("~La contraseña debe tener al menos 8 caracteres.");
  }
  get homescreenAnimation() {
    return $("~homescreenanimation");
  }
  get multitenantDropDown() {
    return $("~chevron.down");
  }
  get multiTenantOption() {
    return $("~nagasurendra-badri-69g23");
  }
  get multiTenantError() {
    return $("~contraseña incorrecta");
  }
  get forgotPassword() {
    return $("~¿Olvidaste tu contraseña?");
  }
  get forgotPasswordEmailField() {
    return $('(//XCUIElementTypeTextField[@value="Correo electrónico*"])[2]');
  }
  get sendResetLinkBtn() {
    return $(
      '//XCUIElementTypeButton[@name="Enviar enlace de restablecimiento"]'
    );
  }
  get loginLink() {
    return $('//XCUIElementTypeLink[@name="Iniciar sesión"]');
  }
  get continueToLogin() {
    return $('//XCUIElementTypeButton[@name="Continuar al inicio de sesión"]');
  }
  get successMessageForResetLink() {
    return $(
      "~El enlace para restablecer la contraseña ha sido enviado correctamente a su correo electrónico."
    );
  }

  // Helper methods for actions
  async enterEmail(email) {
    await verifyAndClick(this.emailField);
    await this.emailField.setValue(email);
    await verifyAndClick(this.Done);
  }

  async enterPassword(password) {
    await verifyAndClick(this.passwordField);
    await this.passwordField.setValue(password);
    await this.Done.click();
  }

  async clickLogin() {
    await expect(this.loginButton).toBeDisplayed();
    const size = await this.loginButton.getSize();
    expect(size.width).toBeGreaterThanOrEqual(44);
    expect(size.height).toBeGreaterThanOrEqual(44);
    await this.loginButton.click();
  }
  async selectMultiTenant() {
    await this.multitenantDropDown.click();
    await driver.pause(2000);
    await this.multiTenantOption.click();
  }

  async enterForgotPasswordEmail(email) {
    await verifyAndClick(this.forgotPasswordEmailField);
    await this.forgotPasswordEmailField.setValue(email);
    await verifyAndClick(this.doneBtn);
    await verifyAndClick(this.sendResetLinkBtn);
  }

  get profileSettings() {
    return $("~profilesettings");
  }
  get help() {
    return $("~support");
  }
  get whatsapp() {
    return $("~whatsapp");
  }
  get text() {
    return $("~text");
  }
  get whatsappText() {
    return $("~text");
  }
  get messagetext() {
    return $("~text");
  }

  get email() {
    return $("~email");
  }
  get launguage() {
    return $("~language");
  }
  get Idioma() {
    return $("~Idioma");
  }
  get generalSettings() {
    return $("~generalsettings");
  }
  get generalSettingsShowUp() {
    return $("~chevron.down");
  }
  get generalSettingsClose() {
    return $("~chevron.up");
  }
  get logoutBtn() {
    return $("~logout");
  }
  get name() {
    return $("~nagasurendra Badri");
  }
  get back() {
    return $("~backArrow");
  }
  get profileEditback() {
    return $("~arrow.backward");
  }
  get ConsultWithUS() {
    return $("~Consult with us!");
  }
  get WriteUsNow() {
    return $("~Write to us now!");
  }
  get english() {
    return $("~Inglés");
  }
  get Inglish() {
    return $('(//XCUIElementTypeStaticText[@name="LanguageSettingTVC"])[1]');
  }
  get spanish() {
    return $("~Español");
  }
  get edit() {
    return $("~Editar");
  }
  get firstName() {
    return $('//XCUIElementTypeTextField[@value="Naga"]');
  }
  get firstNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"
    );
  }
  get middleName() {
    return $('//XCUIElementTypeTextField[@value="Naga"]');
  }
  get middleNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]"
    );
  }
  get lastName() {
    return $('//XCUIElementTypeTextField[@value="Subbarayudu"]');
  }
  get lastNameTextField() {
    return $(
      "//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]"
    );
  }
  get home() {
    return $("~home");
  }
  get save() {
    return $("~Guardar");
  }
  get cancel() {
    return $("~cancel");
  }
  get settingsPageCancel() {
    return $("~cancel");
  }
  get speciality() {
    return $("~speciality");
  }
  get loginMail() {
    return $("~nag.subbarayudu@thinkhat.ai");
  }

  get selectAllOn() {
    return $("~selectallbuttonoff");
  }

  get selectAllOff() {
    return $("~selectallbuttonon");
  }
  get cdss() {
    return $("~cdsson");
  }
  get cdssDisabled() {
    return $("~cdssoff");
  }
  get diognosisJustificationDisabled() {
    return $("~diagnosisjustificationoff");
  }

  get diognosisJustification() {
    return $("~diagnosisjustificationon");
  }
  get logoutcancelationBtn() {
    return $("~no");
  }

  get logoutConformationBtn() {
    return $("~yes");
  }
  get logingoutText() {
    return $("~Are you sure you want to logout?");
  }
  get sync() {
    return $("~syncing");
  }
  get Done() {
    return $("~done");
  }
  get settingPageDone() {
    return $("~done");
  }

  get hideKeyBoard() {
    return $("~Return");
  }

  get firstnameError() {
    return $(`~El nombre es obligatorio.`);
  }
  get lastNameError() {
    return $(`~El apellido es obligatorio.`);
  }
  get phoneNumberError() {
    return $(`~Se requiere teléfono.`);
  }
  get specialityserchField() {
    return $(`//XCUIElementTypeTextField[@value="Search Speciality"]`);
  }
  get enterSpcificSpecialityTextField() {
    return $(
      `//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[4]`
    );
  }
  get specialityDropDown() {
    return $(`~arrowtriangle.down.fill`);
  }
  get specificSpecialityError() {
    return $(`~Se requiere teléfono.`);
  }
  get phoneNumberTextfield() {
    return $(`//XCUIElementTypeTextField[@value="Número de teléfono"]`);
  }

  get keyboardClose() {
    return $(`~Return`);
  }
  get number() {
    return $(`//XCUIElementTypeTextField[@value="(999) 999-9999"]`);
  }

  async profileSettingScreen() {
    await LoginPage.restartApp();
    await HomePage.settings.click();
    await this.profileSettings.click();
    await verifyAndClick(this.edit);
    await verifyAndClick(this.firstName);
    await this.firstName.clearValue();
    await this.lastName.clearValue();
    await driver.execute("mobile: swipe", { direction: "up" });
    await verifyAndClick(this.number);
    await this.number.clearValue();
    await verifyAndClick(this.specialityDropDown);
    await verifyAndClick(this.specialityserchField);
    await this.specialityserchField.setValue("other");
    await $(`~Other`).click();
    await verifyAndClick(this.enterSpcificSpecialityTextField);
    await driver.execute("mobile: swipe", { direction: "down" });
    await verifyAndClick(this.firstNameTextField);
    await verifyAndClick(this.keyboardClose);
    await verifyAndClick(this.save);
    await driver.pause(3000);
    await verify(this.firstnameError);
    await verify(this.lastNameError);
    await verify(this.specificSpecialityError);
    await driver.execute("mobile: swipe", { direction: "up" });
    await verify(this.phoneNumberError);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.edit);
    const FirstName = await this.firstNameTextField.setValue("Naga");
    await verifyAndClick(this.middleName);
    const MiddleName = await this.middleNameTextField.setValue("Surendra");
    const LastName = await this.lastNameTextField.setValue("Subbarayudu");
    const PhoneNumber = await this.number.setValue("9999999999");
    await driver.execute("mobile: swipe", { direction: "down" });
    await verifyAndClick(this.firstNameTextField);
    await verifyAndClick(this.keyboardClose);
    await driver.execute("mobile: swipe", { direction: "up" });
    await verifyAndClick(this.cancel);
    await driver.pause(4000);
    await verifyAndClick(this.ok);
    await verifyAndClick(this.profileEditback);
    await verifyAndClick(this.profileSettings);
    await verifyAndClick(this.edit);
    await verify(this.firstName);
    await verify(this.middleName);
    await verify(this.lastName);
    await verify(this.number);
    await verifyAndClick(this.cancel);
    await verifyAndClick(this.profileEditback);
  }

  async support_VerifiCation() {
    await LoginPage.restartApp();
    await waitForElement(this.startNewEncounter);
    await verifyAndClick(HomePage.settings); // till the profile
    await verifyAndClick(this.help);
    // await verifyAndClick(this.whatsapp);

    // const whatsappBundleId = "net.whatsapp.WhatsApp"; // WhatsApp's bundle ID for iOS

    // // Check if WhatsApp is in the foreground (state 4 indicates the app is active)
    // const appState = await driver.execute("mobile: queryAppState", {
    //   bundleId: whatsappBundleId,
    // });
    // if (appState !== 4) {
    //   throw new Error(
    //     `WhatsApp (${whatsappBundleId}) is not active. Current app state: ${appState}`
    //   );
    // }

    // console.log("WhatsApp is active");

    // // Pause for 5 seconds
    // await driver.pause(5000);
    // // Switch back to the original app
    // await driver.activateApp(process.env.BUNDLE_ID);
    // await HomePage.settings.click();
    // await verifyAndClick(this.help);
    await verifyAndClick(this.email);
    const gmailBundleId = "com.google.Gmail";
    const gmailAppState = await driver.execute("mobile: queryAppState", {
      bundleId: gmailBundleId,
    });
    if (gmailAppState !== 4) {
      throw new Error(
        `Gmail (${gmailBundleId}) is not active. Current app state: ${gmailAppState}`
      );
    }
    console.log("Gmail is active");
    await driver.pause(5000);
    await driver.activateApp(process.env.BUNDLE_ID);
    await driver.pause(2000);
    // Open Settings and Help, then click text element to launch Messages
    await LoginPage.restartApp();
    await waitForElement(this.startNewEncounter);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(this.help);

    await verifyAndClick(this.text);
    // Verify Messages is active
    const messagesBundleId = "com.apple.MobileSMS";
    const messagesAppState = await driver.execute("mobile: queryAppState", {
      bundleId: messagesBundleId,
    });
    if (messagesAppState !== 4) {
      throw new Error(
        `Messages (${messagesBundleId}) is not active. Current app state: ${messagesAppState}`
      );
    }
    console.log("Messages is active");
    // Pause for 5 seconds and switch back
    await driver.pause(5000);
    await driver.activateApp(process.env.BUNDLE_ID);
  }

  async generalSettingsUpdate() {
    await LoginPage.restartApp();
    await waitForElement(this.startNewEncounter);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(this.generalSetting);
    await verifyAndClick(this.selectAllOff);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSetting);
    await verify(this.cdssDisabled);
    await verify(this.diognosisJustificationDisabled);
    await verifyAndClick(this.selectAllOn);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSetting);
    await validate(this.selectAllOff);
    await validate(this.cdss);
    await validate(this.diognosisJustification);
    await verifyAndClick(this.settingsPageCancel);
    await verifyAndClick(this.generalSettings);
    await verifyAndClick(this.cdss);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSettings);
    await validate(this.cdssDisabled);
    await verifyAndClick(this.cdssDisabled);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSettings);
    await validate(this.diognosisJustification);
    await verifyAndClick(this.diognosisJustification);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSettings);
    await validate(this.diognosisJustificationDisabled);
    await verifyAndClick(this.diognosisJustificationDisabled);
    await verifyAndClick(this.settingPageDone);
    await verifyAndClick(this.generalSettings);
    await validate(this.selectAllOff);
    await verifyAndClick(this.settingsPageCancel);
  }
  async launguageChange() {
    await LoginPage.restartApp();
    await waitForElement(this.startNewEncounter);
    await verifyAndClick(HomePage.settings);
    await verifyAndClick(this.Idioma);
    await verifyAndClick(this.english);
    await verifyAndClick(this.launguage);
    await verifyAndClick(this.spanish);
    await driver.pause(5000);
  }

  get homeScreenAnimation() {
    return $('//XCUIElementTypeImage[@name="homescreenanimation"]');
  }
  get welcomeThumbnail() {
    return $('//XCUIElementTypeImage[@name="WelcomeThumnail"]');
  }

  get nokiDashboardButton() {
    return $('//XCUIElementTypeButton[@name="noki dashboard"]');
  }
  get patients() {
    return $("~patients");
  }
  get encounter() {
    return $("~encounter");
  }
  get settings() {
    return $("~settings");
  }

  get startNewEncounter() {
    return $('//XCUIElementTypeButton[@name="Comenzar Nuevo Encuentro"]');
  }
  get nokiDashBoardStartNewEncounter() {
    return $('(//XCUIElementTypeButton[@name="Comenzar Nuevo Encuentro"])[2]');
  }
  get PatientsScreenTitle() {
    return $('//XCUIElementTypeStaticText[@name="Pacientes"]');
  }
  get PatientSearchTextField() {
    return $("~Buscar Pacientes");
  }
  get PatientScreenDashBoardAddPatientBtn() {
    return $('//XCUIElementTypeButton[@name="Agregar paciente"]');
  }
  get encounerScreenTitle() {
    return $('//XCUIElementTypeStaticText[@name="Notas"]');
  }
  get EncounterScreenSearchField() {
    return $("~Buscar Notas Clínicas");
  }
  get notesText() {
    return $('//XCUIElementTypeOther[@name="Notas Clínicas"]');
  }
  get DeleteBtn() {
    return $('//XCUIElementTypeStaticText[@name="Eliminar"]');
  }
  get settingPageprofile() {
    return $('//XCUIElementTypeStaticText[@name="Configuración de Perfil"]');
  }
  get doctorSpecification() {
    return $("~Odontología general");
  }
  get doctorPhoneNumber() {
    return $("~Número de teléfono no especificado");
  }
  get doctorEmail() {
    return $("~nag.subbarayudu@thinkhat.ai");
  }
  get doctorName() {
    return $("~nagasurendra Badri");
  }
  get BackArrow() {
    return $("~backArrow");
  }
  get support() {
    return $("~Soporte");
  }
  get talkToUs() {
    return $("~Háblanos");
  }

  get emailConfigurationTxt() {
    return $(
      "Configura los ajustes de tu correo electrónico para asegurarte de que puedes enviar correos electrónicos"
    );
  }
  get emailConfigurationOk() {
    return $("~ok");
  }

  get generalSetting() {
    return $("~Configuración general");
  }

  get logoutConformationTxt() {
    return $(~"¿Está seguro de que desea cerrar sesión?");
  }
  get logoutConformationBtn() {
    return $('-ios class chain:**/XCUIElementTypeButton[`name == "yes"`][2]');
  }
  get logoutCancel() {
    return $("~Cancelar");
  }

  //patitents Page
  get patients() {
    return $('//XCUIElementTypeStaticText[@name="Patients"]');
  }
  get nokiDashboard() {
    return $("~noki dashboard");
  }
  get addPatient() {
    return $('//XCUIElementTypeButton[@name="Agregar paciente"]');
  }
  get clearText() {
    return $("~Clear text");
  }
  get cancel() {
    return $('//XCUIElementTypeStaticText[@name="Cancelar"]');
  }
  get noPatitentFound() {
    return $('//XCUIElementTypeTable[@name="No se encontraron paciente"]');
  }
  get goBack() {
    return $("~Left");
  }

  //Enconter Screen
  get Encounter() {
    return $('//XCUIElementTypeStaticText[@name="Notas"]');
  }
  get searchNote() {
    return $("~Buscar Notas Clínicas");
  }
  get legPain() {
    return $("~Leg Pain and Injury");
  }
  get draft() {
    return $(
      '**/XCUIElementTypeStaticText[`name == "Borrador de transcripción"`][1]'
    );
  }
  get deleteBtn() {
    return $('//XCUIElementTypeButton[@name="Eliminar"]');
  }

  get deleteCancel() {
    return $('(//XCUIElementTypeButton[@name="Cancelar"])[2]');
  }

  get deleteConformation() {
    return $("~Eliminar");
  }
  get noEncounterFound() {
    return $("~No se encontraron notas clínicas");
  }

  // Search patitent
  get patient() {
    return $("~Seleccionar Paciente");
  }
  get searchPatientsField() {
    return $('//XCUIElementTypeTextField[@value="Buscar Pacientes"]');
  }
  get addPatient() {
    return $('//XCUIElementTypeButton[@name="Agregar paciente"]');
  }
  async patitentName(patitent) {
    return $(`//XCUIElementTypeStaticText[@name="${patitent}"]`);
  }
  get proceedBTn() {
    return $('//XCUIElementTypeButton[@name="Continuar"]');
  }
  get cancel() {
    return $('//XCUIElementTypeButton[@name="Cancelar"]');
  }
  get nokiDashboard() {
    return $("~noki dashboard");
  }
  async patientName(patient) {
    return $(`~${patient}`);
  }

  //addPAtitent
  get addPatientTxt() {
    return $('(//XCUIElementTypeStaticText[@name="Agregar paciente"])[2]');
  }
  get newpatientName() {
    return $(`//XCUIElementTypeTextField[@value="* Nombre y apellido"]`);
  }

  get DOB() {
    return $('//XCUIElementTypeTextField[@value="* Fecha de nacimiento"]');
  }
  get genderPickerTxtField() {
    return $('//XCUIElementTypeTextField[@value="* Género"]');
  }
  get dobPicker() {
    return $('(//XCUIElementTypeImage[@name="chevron.down"])[2]');
  }
  get yearPickerShow() {
    return $("~DatePicker.Show");
  }
  get previousMonth() {
    return $("~DatePicker.PreviousMonth");
  }
  get nextMonth() {
    return $("~DatePicker.NextMonth");
  }
  get yearPickerHide() {
    return $("~DatePicker.Hide");
  }

  get monthPicker() {
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });
    const formattedMonth =
      currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
    return $(`//XCUIElementTypePickerWheel[@value="${formattedMonth}"]`);
  }
  get yearPicker() {
    return $('//XCUIElementTypePickerWheel[@value="2025"]');
  }

  get ok() {
    return $("~Ok");
  }
  get genderPicker() {
    return $("~go down");
  }
  get male() {
    return $("~Masculino");
  }
  get female() {
    return $("~Femenino");
  }
  get other() {
    return $("~Otro");
  }
  get unknown() {
    return $("~Desconocido");
  }
  get addAndProceed() {
    return $('//XCUIElementTypeButton[@name="Agregar y Proceder"]');
  }
  get cancel() {
    return $('//XCUIElementTypeButton[@name="Cancelar"]');
  }
  get nameError() {
    return $("~Nombre y apellido son requeridos");
  }
  get dateError() {
    return $("~La fecha de nacimiento es requerida");
  }
  get genderError() {
    return $("~El género es requerido");
  }

  // Recording Screen
  get back() {
    return $("~backArrow");
  }
  get Back() {
    return $("~Left");
  }
  get endEncounterBtn() {
    return $('//XCUIElementTypeButton[@name="Finalizar el encuentro"]');
  }

  get saveAsDraftBtn() {
    return $('//XCUIElementTypeButton[@name="GUARDAR COMO BORRADOR"]');
  }
  get discardBtn() {
    return $('//XCUIElementTypeButton[@name="DESCARTAR"]');
  }
  get templateSoapNote() {
    return $('//XCUIElementTypeTextField[@value="Nota SOAP"]]');
  }
  get LaunguageSelectior() {
    return $('//XCUIElementTypeTextField[@value="Español"]');
  }
  get LaunguageSelectText() {
    return $('//XCUIElementTypeStaticText[@name="Selecciona un idioma"]');
  }
  get doneBtn() {
    return $("~Done");
  }
  get EngLanOpt() {
    return $("~Inglés");
  }
  get SpanLanOpt() {
    return $("~Español");
  }
  get startConversationBtn() {
    return $('//XCUIElementTypeStaticText[@name="Iniciar Conversación"]');
  }
  get TxtConfm() {
    return $(
      "~Por favor, asegúrese de tener el consentimiento verbal del paciente antes de usar el escriba ambiental de IA de Noki para la documentación clínica. Ver Consentimiento."
    );
  }
  get pauseBtn() {
    return $("~Pause");
  }
  get patientCreatedOk() {
    return $("~OK");
  }
  get resumeRecording() {
    return $('//XCUIElementTypeButton[@name="Reanudar Grabación"]');
  }
  get resumeRecordingConformationYes() {
    return $('//XCUIElementTypeButton[@name="SÍ"]');
  }
  get resumeRecordingConformationText() {
    const date = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return $(
      `~Al reanudar, la conversación en curso será grabada y la transcripción borrador se actualizará bajo el encuentro con fecha ${date}. ¿Está seguro de que desea continuar?`
    );
  }

  get resumeRecordingConformationNO() {
    return $('//XCUIElementTypeButton[@name="NO"]');
  }

  get stopBtn() {
    return $("~stopRecord");
  }
  get PlayBtn() {
    return $("~playBtnIcon");
  }
  get PrevEncounterRef() {
    return $(
      "~¿Le gustaría usar la nota SOAP del encuentro anterior como contexto?"
    );
  }
  get PrevEncounterRefNo() {
    return $('//XCUIElementTypeButton[@name="NO"]');
  }
  get PrevEncounterRefYes() {
    return $('//XCUIElementTypeButton[@name="SÍ"]');
  }
  get notEnoughTranscript() {
    return $("~No hay suficiente transcripción para generar notas clínicas.");
  }
  get notEnoughTranscript() {
    return $('//XCUIElementTypeButton[@name="Ok"]');
  }
  get generatingSNTxt() {
    return $("~Generating SOAP note...");
  }
  get SoapNoteBtn() {
    return $('//XCUIElementTypeStaticText[@name="Nota SOAP"]');
  }
  get patientInformation() {
    return $('//XCUIElementTypeStaticText[@name="Patient Information"]');
  }
  get subjective() {
    return $('//XCUIElementTypeStaticText[@name="Subjective"]');
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
    return $('//XCUIElementTypeStaticText[@name="Transcripción"]');
  }
  get Cdss() {
    return $("~CDSS");
  }
  get SuggestedDiagnosisAndInterventions() {
    return $("~Diagnóstico e intervención sugeridos");
  }
  get SuggestedQuestions() {
    return $("~Preguntas Sugeridas");
  }
  get SuggestedMedications() {
    return $("~Medicamentos Sugeridos");
  }
  get SuggestedFollowups() {
    return $("~Sugerencias de Seguimiento");
  }

  get originalTrnscript() {
    return $(
      '//XCUIElementTypeStaticText[@name="Mostrar Transcripción Original"]'
    );
  }

  get claeanedTranscript() {
    return $(
      '//XCUIElementTypeStaticText[@name="Mostrar Transcripción Limpiada"]'
    );
  }

  get copyBtn() {
    return $("~copy");
  }
  get mailBtn() {
    return $("~mail");
  }

  get printBtn() {
    return $("~print");
  }
  get printPagePrintBtn() {
    return $("~Imprimirt");
  }
  get printConformation() {
    return $('(//XCUIElementTypeButton[@name="Imprimir"])[2]');
  }
  get printDownload() {
    return $("~Descargar");
  }

  get printCancel() {
    return $("~Cancelar");
  }
  get printPageCancel() {
    return $("~Cancelar");
  }
  get printPageBackBtn() {
    return $("~Left");
  }
  get SoapNoteScreenTxtField() {
    return $(
      '//XCUIElementTypeTextView[@value="Haz clic en el micrófono y comienza a hablar.."]'
    );
  }
  // get SoapNoteTxtField()
  // {
  //     return $('');
  // }
  get Mic() {
    return $("~micIcon");
  }
  get send() {
    return $("~send_btn");
  }
  get finaliseEncounter() {
    return $("~finalizedBtn");
  }
  get finaliseEncounterTxt() {
    return $(
      "~¿Está seguro de finalizar el encuentro y deshabilitar todas las acciones disponibles?"
    );
  }
  get finaliseEncounterOk() {
    return $('//XCUIElementTypeButton[@name="Ok"]');
  }
  get finaliseEncounterCancel() {
    return $('//XCUIElementTypeButton[@name="Cancelar"]');
  }
  get finaliseEncounteSuccessrTxt() {
    return $('//XCUIElementTypeStaticText[@name="Éxito"]');
  }
  get finaliseEncounterSuccess() {
    return $("~Encuentro finalizado con éxito.");
  }
  get finaliseEncounterConformed() {
    return $("~Ok");
  }
  get PatientInfo() {
    return $('//XCUIElementTypeOther[@name="Información del paciente"]');
  }
  get Subject() {
    return $('//XCUIElementTypeStaticText[@name="Subjetivo"]');
  }
  get Object() {
    return $('//XCUIElementTypeStaticText[@name="Objetivo"]');
  }
  get Assess() {
    return $('//XCUIElementTypeStaticText[@name="Evaluación"]');
  }
  get Plan() {
    return $('//XCUIElementTypeStaticText[@name="Plan"]');
  }
  get AdditionalInfo() {
    return $('//XCUIElementTypeStaticText[@name="Información adicional"]');
  }
  get connectionLost() {
    return $("~¡Conexión perdida!");
  }
  get connectionLostClose() {
    return $('//XCUIElementTypeStaticText[@name="Cerrar"]');
  }
  get backToPatientScreen() {
    return $("~Left");
  }
  get Done() {
    return $("~Done");
  }

  //Quock Actions Flow
  get quickActionButton() {
    return $('//XCUIElementTypeButton[@name="Acciones rápidas"]');
  }
  get quicktionsSearchField() {
    return $('//XCUIElementTypeTextField[@value="Buscar acciones rápidas"]');
  }
  get regenerateSoapNote() {
    return $("~Regenerar nota SOAP");
  }

  get translateSoapNote() {
    return $("~Translate soap note to");
  }
  // get french()
  // {
  //     return $('~french');
  // }

  get generateIcdAndCptCodes() {
    return $("~Generar códigos ICD y CPT");
  }
  get generateCarePlan() {
    return $("~Generar plan de atención con explicación");
  }
  get generateFeedBack() {
    return $("~Generar comentarios sobre el desempeño del médico");
  }
  get generateReferalLetter() {
    return $("~Generar carta de derivación");
  }
  get icdAndCptCodes() {
    return $("~Códigos ICD y CPT");
  }

  get regenerateIcdAndCpt() {
    return $("~Regenerar códigos ICD y CPT");
  }
  get regenerateCarePlan() {
    return $(`~Regenerar plan de atención con explicación`);
  }
  get carePlan() {
    return $("~Plan de atención con explicación");
  }
  get regenerateFeedBack() {
    return $("~Regenerar comentarios sobre el desempeño del médico");
  }
  get feedBack() {
    return $("~Comentarios sobre el desempeño del médico");
  }
  get regenerateReferalLetter() {
    return $("~Regenerar carta de derivación");
  }
  get referalLetter() {
    return $("~Carta de derivación");
  }

  get errorOk() {
    return $("~Ok");
  }
  get addPatientInformation() {
    return $(`~+  Add Información del paciente`);
  }
  get save() {
    return $('//XCUIElementTypeButton[@name="Guardar"]');
  }
  get cancel() {
    return $('//XCUIElementTypeButton[@name="Cancelar"]');
  }
  get yes() {
    return $('//XCUIElementTypeButton[@name="SÍ"]');
  }
  get no() {
    return $('//XCUIElementTypeButton[@name="No"]');
  }
  get PatientInformationInEnlish() {
    return $("");
  }
  get update() {
    return $("~pencil.line");
  }
  get title() {
    return $('//XCUIElementTypeTextView[@value="Título"]');
  }

  get Discription() {
    return $('(//XCUIElementTypeTextView[@value="Descripción"])[1]');
  }
  get add() {
    return $('(//XCUIElementTypeButton[@name="selected"])[1]');
  }
  get SuggestedDiagnosticTesting() {
    return $("");
  }
  get AddConversation() {
    return $('//XCUIElementTypeButton[@name="Agregar Conversación"]');
  }
  get AddConversationNo() {
    return $('//XCUIElementTypeButton[@name="No"]');
  }
  get AddConversationConfirmationYes() {
    return $('//XCUIElementTypeButton[@name="SÍ"]');
  }
  get resumeConversationForMultipleConverstionScenario() {
    return $('//XCUIElementTypeButton[@name="Reanudar Conversación"]');
  }
  get resumeConversationForMultipleConverstionScenarioYes() {
    return $('//XCUIElementTypeButton[@name="SÍ"]');
  }

  get PatientInformationTxtInEnlish() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Patient Information"]'
    );
  }
  get PatientInformationTxtOnSpanish() {
    return $(
      '//XCUIElementTypeStaticText[@name="main label" and @label="Información del Paciente"]'
    );
  }

  get offlineModeTranscription() {
    return $("~No hay transcripción disponible en el modo sin conexión");
  }

  get continue() {
    return $("~Continuar");
  }
  get RecordingContinueBtn() {
    return $(
      '-ios class chain:**/XCUIElementTypeButton[`name == "CONTINUAR"`]'
    );
  }

  get endEncounter() {
    return $(`//XCUIElementTypeStaticText[@name="Finalizar el encuentro"]`);
  }
  get offlineConversationSaved() {
    return $(
      "~Hemos guardado tu conversación. Se sincronizará cuando vuelvas a estar conectado."
    );
  }
  get() {
    return $("");
  }
  get() {
    return $("");
  }
  get() {
    return $("");
  }

  get() {
    return $("");
  }
  get() {
    return $("");
  }
  get() {
    return $("");
  }
  get() {
    return $("");
  }
  get() {
    return $("");
  }
  get emailSentOk() {
    return $("~Ok");
  }
  async copyMailPrint() {
    await waitForElement(this.copyBtn);
    await verifyAndClick(this.copyBtn);
    await verifyAndClick(this.mailBtn);
    await validate(this.emailSentOk);
    await verifyAndClick(this.emailSentOk);
    await verifyAndClick(this.printBtn);
    await verify(this.printDownload);
    await driver.pause(5000);
    await verifyAndClick(this.printPageCancel);
    await verifyAndClick(this.printPageBackBtn);
  }
  async SOAP_NOTE() {
    await waitForElement(this.quickActionButton);

    await this.quickActionButton.click();
    await verify(this.quicktionsSearchField);
    await verifyAndClick(this.regenerateSoapNote);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.SoapNoteBtn);
    await this.copyMailPrint();
  }

  async translate_SoapNote() {
    await waitForElement(this.quickActionButton);
    await this.quickActionButton.click();
    await this.translateSoapNote.click();
    await this.english.click();
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.PatientInformationTxtInEnlish);
    await this.copyMailPrint();
  }
  async translate_SoapNoteToSpanish() {
    await this.quickActionButton.click();
    await this.translateSoapNote.click();
    await verifyAndClick(this.spanish);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.PatientInformationTxtOnSpanish);
    await driver.pause(4000);
  }
  async ICD_CPT() {
    await waitForElement(this.quickActionButton);

    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.generateIcdAndCptCodes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.icdAndCptCodes);
    await this.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateIcdAndCpt);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.icdAndCptCodes);
    await this.copyMailPrint();
  }
  async care_Plan() {
    await waitForElement(this.quickActionButton);

    await this.quickActionButton.click();
    await this.generateCarePlan.click();
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.carePlan);
    await this.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateCarePlan);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.carePlan);
    await this.copyMailPrint();
  }
  async feed_Back() {
    await waitForElement(this.quickActionButton);
    await this.quickActionButton.click();
    await this.generateFeedBack.click();
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.feedBack);
    await this.copyMailPrint();
    await verifyAndClick(this.quickActionButton);
    await verifyAndClick(this.regenerateFeedBack);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.feedBack);
    await this.copyMailPrint();
  }
  async referal_Letter() {
    await waitForElement(this.quickActionButton);
    await this.quickActionButton.click();
    await this.generateReferalLetter.click();
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.referalLetter);
    await this.copyMailPrint();
    await this.quickActionButton.click();
    await verifyAndClick(this.regenerateReferalLetter);
    await verifyAndClick(this.yes);
    await waitForElement(this.ok);
    await verifyAndClick(this.ok);
    await waitForElement(this.referalLetter);
    await verifyAndClick(this.copyBtn);
    await verifyAndClick(this.mailBtn);
    await verifyAndClick(RecordingPage.ok);
    await verifyAndClick(this.printBtn);
    await verifyAndClick(this.printPageCancel);
    await verifyAndClick(this.printPageBackBtn);
  }

  //AddPatitent Screen Functions
  async createNewPatient() {
    const name = faker.person.fullName();
    const cleanName = name.replace(/[^a-zA-Z0-9 ]/g, "");

    const year = faker.number.int({ min: 1920, max: 2023 });
    const month = faker.number.int({ min: 1, max: 12 });
    await verifyAndClick(this.newpatientName);
    await this.newpatientName.setValue(cleanName);
    await this.dobPicker.click();
    await this.previousMonth.click();
    await this.nextMonth.click();
    await this.yearPickerShow.click();
    await this.yearPicker.setValue(year);
    await this.monthPicker.setValue(month);
    await this.yearPickerHide.click();
    await this.COK.click();
    await this.genderPicker.click();
    await verifyAndClick(this.female);
    await this.genderPicker.click();
    await verifyAndClick(this.other);
    await this.genderPicker.click();
    await verifyAndClick(this.unknown);
    await this.genderPicker.click();
    await this.male.click();
    await verify(this.cancel);
    await verifyAndClick(this.addAndProceed);
    await RecordingPage.ok.click();
    return name;
  }
  async addPatitentWrn() {
    await verifyAndClick(this.addAndProceed);
    await waitForElement(this.nameError);
    await waitForElement(this.dateError);
    await waitForElement(this.genderError);
  }

  //Encounter Screen Function
  async noteSearch(randomName) {
    await this.searchNote.click();
    await this.searchNote.setValue(randomName);
  }
  async noteSearchVerification(randomName) {
    await this.noteSearch(randomName);
    return $(`//XCUIElementTypeStaticText[@name="${randomName}"]`);
  }
  async deleteSwipe() {
    await driver
      .action("pointer")
      .move({ duration: 0, x: 375, y: 232 })
      .down({ button: 0 })
      .move({ duration: 1000, x: 104, y: 233 })
      .up({ button: 0 })
      .perform();
  }
  async deleteEncounter() {
    await this.deleteSwipe();
    await this.deleteBtn.click();
    await this.deleteCancel.click();
    await this.deleteSwipe();
    await this.deleteBtn.click();
    await this.deleteConformation.click();
  }
  //Patient Screen
  async Search(patientName) {
    await this.patientSearch.click();
    await this.patientSearch.setValue(patientName);
  }
  async patientSearchAndContinue(patientName) {
    await this.Search(patientName);
    await verifyAndClick(`//XCUIElementTypeStaticText[@name="${patientName}`);
  }
  //Search Patient
  async patientSearch(patient) {
    await this.searchPatientsField.click();
    await this.searchPatientsField.setValue(patient);
    await driver.pause(2000);
    const patientElement = await this.patientName(patient);
    await verifyAndClick(patientElement);
    await verifyAndClick(this.proceedBTn);
  }
  async startConversation() {
    await verifyAndClick(RecordingPage.acknowledgeCheckBox);
    await verifyAndClick(this.startConversationBtn);
  }

  async startNewConveresation(patitent) {
    await this.nokiDashboard.click();
    await this.startNewEncounter.click();
    await this.patientSearch(patitent);
    const patientElement = await this.patitentName(patitent);
    await patientElement.click();
    await this.proceedBTn.click();
  }
  //Recording Screen
  async recordAudio() {
    await driver.pause(4000);
    await AudioManeger.playAudio("spanish");
    await driver.pause(80000);
    await AudioManeger.stopAudio();
    await verifyAndClick(this.pauseBtn);
    await verifyAndClick(this.stopBtn);
  }
  async recordOfflineAudio() {
    await driver.pause(4000);
    await AudioManeger.playAudio("spanish");
    await driver.pause(5000);
    await aeroplaneModeOn();
    await driver.pause(5000);
    await verify(this.offlineModeRTranscription);
    await driver.pause(40000);
    await aeroplaneModeOff();
    await driver.pause(5000);
    await LiveTranscript();
    await driver.pause(20000);
    await AudioManeger.stopAudio();
    await verifyAndClick(this.pauseBtn);
    await verifyAndClick(this.stopBtn);
  }
  async CDSS_verification() {
    if (await this.notEnoughTranscript.isDisplayed()) {
      console.error(
        "Recording failed: Please provide a proper medical conversation"
      );
    } else {
      await waitForElement(this.SoapNoteBtn);
      console.log("Recording successful: Transcript generated");
    }
    await waitForElement(this.quickActionButton);
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
        "Kindly please verify the CDSS is off / your CDSS subscription is over"
      );
    }
    await driver.pause(3000);
  }
  async Transcript_Verification() {
    await verifyAndClick(this.Transcript);
    await RecordingPage.dataScaning(RecordingPage.cleanedTranscriptScroll);
    await AudioManager.TextComparison();
    await verifyAndClick(this.originalTrnscript);
    await verifyAndClick(this.claeanedTranscript);
    await verifyAndClick(this.SoapNoteBtn);
  }
  async SOAPNOTE_Verification() {
    await waitForElement(this.quickActionButton);
    await this.SoapNoteBtn.click();
    await this.copyMailPrint();
  }

  async recordAudioAndSaveAsDraft() {
    await AudioManager.playAudio("spanish");
    await driver.pause(180000);
    const transcriptFile = await AudioManager.stopAudio();
    await verifyAndClick(this.Back);
    await verifyAndClick(this.saveAsDraftBtn);
    return transcriptFile;
  }
  async recordAudioAndContinueForPrevEncounter() {
    await this.recordAudioforOfflineMode();
    await waitForElement(this.PrevEncounterRef);
    await this.PrevEncounterRefNo.click();
  }
  async recordAudioForDraft() {
    await this.recordAudio();
    await waitForElement(this.PrevEncounterRef);
    await verifyAndClick(this.PrevEncounterRefYes);
  }
  async finalize_Encounter() {
    await waitForElement(this.SoapNoteBtn);
    await this.finaliseEncounter.click();
    await this.ok.click();
    await validate(this.finaliseEncounteSuccessrTxt);
    await driver.pause(5000);
    await LoginPage.restartApp();
  }
  get COK() {
    return $("~OK");
  }
  async clickDraftTranscript() {
    const drafts = await $$(
      '-ios class chain:**/XCUIElementTypeStaticText[`name == "Borrador de transcripción"`]'
    );

    if (drafts.length > 0) {
      await drafts[0].click();
      console.log("Clicked the first Draft Transcript element.");
    } else {
      console.log("No Draft Transcript found.");
    }
  }
  async multiple_Conversation() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationNo);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await verify(this.pauseBtn);
    await this.recordAudioAndSaveAsDraft();
    await driver.pause(3000);
    await LoginPage.restartApp();
    await driver.pause(3000);
    await verifyAndClick(HomePage.encounter);
    await driver.pause(3000);
    await this.clickDraftTranscript();
    await waitForElement(this.finaliseEncounter);
    await verifyAndClick(this.finaliseEncounter);
    await driver.pause(3000);
    await verifyAndClick(this.COK);
    await verifyAndClick(this.resumeConversationForMultipleConverstionScenario);
    await verifyAndClick(
      this.resumeConversationForMultipleConverstionScenarioYes
    );
    await this.recordAudio();
  }
  async third_Conversation_For_Existing_Patitent() {
    await this.multiple_Conversation();
    await this.PrevEncounterRef.click();
    await this.PrevEncounterRefNo.click();
  }

  async second_Conversations_For_Exicting_Patient() {
    await waitForElement(this.AddConversation);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await this.recordAudio();
    await verify(this.PrevEncounterRef);
    await verifyAndClick(this.PrevEncounterRefNo);
  }

  async second_Conversations_For_New_Patient() {
    await verifyAndClick(this.SoapNoteBtn);
    await verifyAndClick(this.AddConversation);
    await verifyAndClick(this.AddConversationConfirmationYes);
    await this.recordAudio();
  }
  async third_Conversations_For_New_Patient() {
    await this.multiple_Conversation();
  }

  async third_Conversations_For_Existing_Patient() {
    await this.multiple_Conversation();
    await verify(this.PrevEncounterRef);
    await verifyAndClick(this.PrevEncounterRefNo);
  }

  async recordAudioforOfflineMode() {
    await AudioManeger.playAudio("spanish");
    console.log("Audio started:", AudioManeger.currentAudioFile);
    await this.recordAudioforOfflineModeMT();
    await driver.pause(5000);
    await verifyAndClick(this.pauseBtn);
    await AudioManeger.pauseAudio();
    console.log("Audio paused at:", AudioManeger.pausedTime, "seconds");
    await driver.pause(5000);
    await this.PlayBtn.click();
    await AudioManeger.resumeAudio();
    console.log("Audio resumed:", AudioManeger.currentAudioFile);
    await driver.pause(30000);
    await AudioManeger.pauseAudio();
    await driver.pause(2000);
    await aeroplaneModeOn();
    await driver.pause(5000);
    await AudioManeger.pauseAudio();
    await driver.terminateApp(process.env.BUNDLE_ID);
    await driver.pause(5000);
    await driver.activateApp(process.env.BUNDLE_ID);
    await driver.pause(5000);
    await verifyAndClick(this.Continue);
    console.log(
      "Here app got restarted the app while it is in the recording screen and we verified with the app still in that page"
    );
    await AudioManeger.resumeAudio();
    await driver.pause(30000);
    await AudioManeger.stopAudio();
    await verifyAndClick(this.stopBtn);
    console.log(
      "here after app got closed while recording we magaing automatically again resumed the audio"
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
    const airplaneModeBtn = await $("~com.apple.ControlCenter.Airplane");
    await (await airplaneModeBtn).click();
    await driver
      .action("pointer")
      .move({ duration: 0, x: 283, y: 790 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await driver.pause(5000);
    console.log(
      "here we have verified that the in offline mode when we click stop button it willshould show a popup of offline conversation is saved"
    );
    if (this.PrevEncounterRefNo.isDisplayed()) {
      await this.PrevEncounterRefNo.click();
      console.log(
        "Here her are undrgoing conversation may be s followup or the patient is visted the doctor previously"
      );
    } else {
      console.log(
        "This conversation we are recording for this particulat patient is for the First time"
      );
    }
  }

  async recordAudioforOfflineModeMT() {
    let timesToRun = 2;
    let count = 0;
    console.log(`Loop will run ${timesToRun} times`);
    for (let i = 0; i < timesToRun; i++) {
      await driver.pause(5000);
      await aeroplaneModeOn();
      await driver.pause(5000);
      await verify(this.offlineModeTranscription);
      await driver.pause(30000);
      await aeroplaneModeOff();
      count++;
      console.log(`Offline Mode Loop we are Running Now  ${i + 1} completed`);
    }
  }
  async bloodGroup(text) {
    return await waitForElement(
      $(
        `//XCUIElementTypeStaticText[@name="main label" and @label="${text} : "]`
      )
    );
  }

  async bloodName(name) {
    return await waitForElement($(`~${name}`));
  }
  get titleTextField() {
    return $(
      '//XCUIElementTypeOther[@name="Stack view"]/XCUIElementTypeOther[6]/XCUIElementTypeOther/XCUIElementTypeTextView[1]'
    );
  }
  get discriptionTextField() {
    return $(
      '//XCUIElementTypeOther[@name="Stack view"]/XCUIElementTypeOther[6]/XCUIElementTypeOther/XCUIElementTypeTextView[2]'
    );
  }
  async UpdatePatientInfo() {
    await waitForElement(this.update);
    await verifyAndClick(this.update);
    await verifyAndClick(this.addPatientInformation);
    await verifyAndClick(this.title);
    await this.titleTextField.setValue("Grupo sanguíneo");
    await verifyAndClick(this.Discription);
    await this.discriptionTextField.setValue("B postivo");
    await verifyAndClick(this.add);
    await verifyAndClick(this.save);
    await waitForElement(this.COK);
    await verifyAndClick(this.COK);
    await this.bloodGroup("Grupo sanguíneo");
    await this.bloodName("B postivo");
  }

  get SoapNoteScreenTxtFieldEntry() {
    return $(
      '//XCUIElementTypeApplication[@name="Noki-T"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTextView"]'
    );
  }

  async manualUpdate() {
    await waitForElement(this.SoapNoteScreenTxtField);
    await verifyAndClick(this.SoapNoteScreenTxtField);
    await this.SoapNoteScreenTxtFieldEntry.setValue(
      "Grupo sanguíneo O postivo"
    );
    await verifyAndClick(this.doneBtn);
    await verifyAndClick(this.send);
    await waitForElement(this.COK);
    await verifyAndClick(this.COK);
    await this.bloodGroup("Grupo sanguíneo");
    await this.bloodName("O postivo");
  }
  get MicStop() {
    return $("~micBackgroundImage");
  }

  async hayNoki() {
    await waitForElement(this.Mic);
    await verifyAndClick(this.Mic);
    await driver.pause(2000);
    await playTTS("Grupo sanguíneo O negativo", "Alex", 0.8);
    await driver.pause(2000);
    await verifyAndClick(this.MicStop);
    await verifyAndClick(this.send);
    await waitForElement(this.COK);
    await validate(this.COK);
    await verifyAndClick(this.COK);
    await this.bloodGroup("Grupo sanguíneo");
    await this.bloodName("O negativo");
  }
}
export default new SpanishLanguage();

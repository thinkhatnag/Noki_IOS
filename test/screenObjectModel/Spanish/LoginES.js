import {
  waitForElement,
  verifyAndClick,
  verify,
  aeroplaneModeOn,
  aeroplaneModeOff,
  playTTS,
  validate,
} from "../../../helpers/helper.js";
import AudioManager from "../screenObjectModel/audioManeger.js";
import { faker } from "@faker-js/faker";

import LoginPage from "../screenObjectModel/login.page.js";
import RecordingPage from "../screenObjectModel/recording.page.js";
import HomePage from "../screenObjectModel/home.page.js";
import EncounterPage from "../screenObjectModel/encounter.page.js";
import AudioManeger from "../screenObjectModel/audioManeger.js";
class LoginEs {
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
}
export default new LoginEs();

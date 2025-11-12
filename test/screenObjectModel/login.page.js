import { verify, verifyAndClick } from "../../helpers/helper.js";

class LoginPage {
    get emailField() { return $('//XCUIElementTypeTextField[@value="Email*"]'); }
    get passwordField() { return $('//XCUIElementTypeSecureTextField[@value="Password*"]'); }
    get loginButton() { return $('//XCUIElementTypeButton[@name="Login"]'); }
    get errorMessage() { return $('~Password is Required'); }
    get WrongPassword() { return $('~The password is invalid or the user does not have a password.'); }
    get shortPassword() { return $('~Password should be more than or equal to 8 characters'); }

    get emailError() { return $('~Email is required'); }
    get invalidEmailError() { return $('~Invalid Email'); }
    get emailNotRegisteredError() { return $('~No account associated with the email address'); }
    get homescreenAnimation() { return $('~homescreenanimation'); }
    get Done() { return $('~Done'); }
    get multitenantDropDown() { return $('~selectAccountId'); }
    get multiTenantOption() { return $('~nagasurendra-badri-69g23'); }
    get multiTenantError() { return $('~Please select an Account ID')}
    get forgotPassword() { return $('~Forgot Password?')}
    get forgotPasswordEmailField() { return $('(//XCUIElementTypeTextField[@value="Email*"])[2]')}
    get sendResetLinkBtn() { return $('//XCUIElementTypeButton[@name="Send Reset Link"]')}
    get loginLink() { return $('//XCUIElementTypeLink[@name="Login"]')}
    get continueToLogin() { return $('//XCUIElementTypeButton[@name="Continue to Login"]')}
    get successMessageForResetLink() { return $('~Password reset link has been successfully sent to your email.')}
    get () { return $('')}
    get () { return $('')}

    // Helper methods for actions
    async enterEmail(email) {
        await verifyAndClick(this.emailField) 
        await this.emailField.setValue(email);
        await this.Done.click()

    }

    async enterPassword(password) {
        await verifyAndClick(this.passwordField)
        await this.passwordField.setValue(password);
        await this.Done.click()
    }

    async clickLogin() {
        await expect(this.loginButton).toBeDisplayed();
        const size = await this.loginButton.getSize();
        expect(size.width).toBeGreaterThanOrEqual(44);
        expect(size.height).toBeGreaterThanOrEqual(44);
        await this.loginButton.click();
    }

    async restartApp() {
        const bundleId = process.env.BUNDLE_ID 

        await driver.terminateApp(bundleId);
        await driver.activateApp(bundleId);
    }
    async selectMultiTenant() {
       await this.multitenantDropDown.click();
        await driver.pause(2000);
        await this.multiTenantOption.click();
      }
    
    async enterForgotPasswordEmail(email) {
      await verifyAndClick(this.forgotPasswordEmailField)
      await this.forgotPasswordEmailField.setValue(email)
      if(this.Done.isDisplayed()){      
      await verifyAndClick(this.Done)
    }else {
        console.log("keyboard is not shown")
    }
      await verifyAndClick(this.sendResetLinkBtn)
     }
    }
export default new LoginPage();

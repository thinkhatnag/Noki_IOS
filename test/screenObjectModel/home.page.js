class HomePage {
    get homeScreenAnimation() {
        return $('//XCUIElementTypeImage[@name="homescreenanimation"]');
    }

    get startNewEncounterButton() {
        return $('//XCUIElementTypeStaticText[@name="Start New Encounter"]');
    }
    get startNewEncounterButtonNokiDashboard() {
        return $('(//XCUIElementTypeButton[@name="Start New Encounter"])[2]');
    }

    get welcomeThumbnail() {
        return $('//XCUIElementTypeImage[@name="WelcomeThumnail"]');
    }

    get nokiDashboardButton() {
        return $('//XCUIElementTypeButton[@name="noki dashboard"]');
    }
    get startConversationBtn() {
        return $('//XCUIElementTypeButton[@name="Start Conversation"]');
    }
    get patients() {
        return $('~patients');
    }
    get encounter() {
        return $('~encounter');
    }
    get settings() {
        return $('~settings');
    }
    get home() {
        return $('//XCUIElementTypeButton[@value="1"]');
    }
    get notNowBtn() {
        return $(`~Not Now`);
    }
}

export default new HomePage();

import EncounterPage from "../screenObjectModel/encounter.page"
import HomePage from "../screenObjectModel/home.page"
import RecordingPage from "../screenObjectModel/recording.page"
import { verify, verifyAndClick, waitForElement } from '/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js'


describe('to install the application ', () => {
    it('hello noki', async () => {
        await HomePage.encounter.click()
        await EncounterPage.searchNote.click()
        await EncounterPage.searchNote.setValue('draft')
        await verifyAndClick(EncounterPage.keyBoardSearch)
        await EncounterPage.draft.click()
        await RecordingPage.resumeRecording.click()
        await verifyAndClick(RecordingPage.resumeRecordingConformationYes)
        await RecordingPage.recordAudio()
        await RecordingPage.PrevEncounterRefNo.click()
        await waitForElement(RecordingPage.SoapNoteBtn)
        await verify(RecordingPage.PatientInfo)
        await verify(RecordingPage.subjective)
        const SoapNoteTable = await RecordingPage.soapNoteTable
        const elem = [RecordingPage.objective, RecordingPage.assessment, RecordingPage.plan, RecordingPage.additinalInformation]
        // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
        await elem.scrollIntoView();
        await elem.scrollIntoView({
            direction: 'up',
            maxScrolls: 10,
            scrollableElement: $(SoapNoteTable)
        });
    })
})
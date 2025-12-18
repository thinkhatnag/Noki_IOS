import EncounterPage from "../screenObjectModel/encounter.page.js";
import RecordingPage from "../screenObjectModel/recording.page.js";

describe("Test Suite", () => {
  it("Test Case - Note Search", async () => {
    await RecordingPage.dataScaning(RecordingPage.cleanedTranscriptScroll);
  });
});

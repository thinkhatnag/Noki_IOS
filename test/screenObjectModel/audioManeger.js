import { spawn } from "child_process";
import { exec } from "child_process";
import util from "util";
import fs from "fs";
import {
  normalizeText,
  levenshtein,
} from "/Users/nagasubarayudu/Desktop/IOS/helpers/helper.js";
import RecordingPage from "../screenObjectModel/recording.page.js";
import SpanishLanguage from "../screenObjectModel/spanishLanguage.js";
// import path from "path";
import allureReporter from "@wdio/allure-reporter";
const execPromise = util.promisify(exec);
class AudioManager {
  constructor() {
    this.audioFiles = {
      english:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audioFiles/CardiacArrestEN.wav",
      spanish:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audioFiles/CardiacArrestES.mp3",
    };
    this.currentAudioFile = null;
    this.currentProcess = null;
    this.isPaused = false;
    this.pausedTime = 0; // Track paused time in seconds
    this.startTime = 0; // Track start time in seconds

    // 🔹 Added for audio duration limit
    this.playedTime = 0;
    this.maxDuration = 608; // 10:08 in seconds
    this._durationTicker = null;
  }

  _startDurationTicker() {
    if (this._durationTicker) return;
    this._durationTicker = setInterval(async () => {
      let elapsed = this.playedTime;
      if (!this.isPaused && this.startTime) {
        elapsed += Date.now() / 1000 - this.startTime;
      }
      if (elapsed >= this.maxDuration) {
        clearInterval(this._durationTicker);
        this._durationTicker = null;
        await this.stopAudio();
        console.log("Audio auto-stopped at 10:08 (608 sec)");
      }
    }, 1000);
  }

  async LiveTranscript(language = "english", checkInterval = 2000) {
    const TRANSCRIPT_SELECTOR = '//XCUIElementTypeTextView';
    const englishOffline = await RecordingPage.offlineModeRTranscription;
    const spanishOffline = await SpanishLanguage.offlineModeRTranscription;
  
    const OFFLINE_SELECTORS = {
      english: englishOffline,
      spanish: spanishOffline,
    };
  
    const offlineSelector = OFFLINE_SELECTORS[language];
  
    let previousText = "";
    this._monitoring = true;
  
    (async () => {
      while (this._monitoring) {
        try {
          const offlineElements = await $$(offlineSelector);
          if (offlineElements.length > 0) {
            allureReporter.addStep(
              `⚠️ Device offline detected (${language}), stopping live transcript monitoring`,
              {},
              "broken"
            );
            break;
          }
  
          const transcriptElement = await $(TRANSCRIPT_SELECTOR);
          const currentText = await transcriptElement.getText();
  
          if (currentText && currentText.trim() !== previousText) {
            previousText = currentText;
            allureReporter.addStep(
              `✅ Live transcript updated (${language})`,
              { text: currentText.slice(0, 500) },
              "passed"
            );
          } else {
            allureReporter.addStep(
              `⚠️ Live transcript not updated yet (${language})`,
              { lastText: previousText.slice(0, 500) },
              "broken"
            );
          }
  
          const audioPlayedTime =
            this.playedTime +
            (this.isPaused ? 0 : Date.now() / 1000 - this.startTime);
          if (audioPlayedTime >= this.maxDuration) {
            this._monitoring = false;
            allureReporter.addStep(
              `⏹️ Audio finished (${language}), stopping live transcript monitoring`,
              {},
              "passed"
            );
            break;
          }
  
          await driver.pause(checkInterval);
        } catch (err) {
          allureReporter.addStep(
            `❌ Error reading live transcript (${language})`,
            { error: err.message },
            "failed"
          );
        }
      }
    })();
  }
  
  async playAudio(language) {
    const audioFilePath = this.audioFiles[language] 

    if (this.isPaused && this.currentProcess) {
      this.currentProcess = spawn("afplay", [
        "-t",
        String(Number.MAX_SAFE_INTEGER),
        "-ss",
        String(this.pausedTime),
        audioFilePath,
      ]);
      this.currentProcess.on("error", (err) => {
        console.error("Failed to resume afplay:", err);
      });
      this.startTime = Date.now() / 1000;
      this.isPaused = false;
      this._startDurationTicker(); // 🔹 start ticker on resume
      return audioFilePath;
    } else {
      if (this.currentProcess) {
        await this.stopAudio();
      }
      this.currentAudioFile = audioFilePath;
      this.currentProcess = spawn("afplay", [audioFilePath]);
      this.currentProcess.on("error", (err) => {
        console.error("Failed to start afplay:", err);
      });
      this.startTime = Date.now() / 1000;
      this.isPaused = false;
      this._startDurationTicker(); // 🔹 start ticker on play
      return this.currentAudioFile;
    }
  }
  
  
  async pauseAudio() {
    if (this.currentProcess && !this.isPaused) {
      this.playedTime += Date.now() / 1000 - this.startTime; // 🔹 accumulate playback
      this.pausedTime = this.playedTime;

      const { stdout } = await execPromise("pgrep afplay || true");
      if (stdout.trim()) {
        await execPromise("pkill -STOP afplay");
        this.isPaused = true;
      }
    }
  }
  async resumeAudio() {
    if (this.currentProcess && this.isPaused) {
      await execPromise("pkill -CONT afplay");
      this.startTime = Date.now() / 1000;
      this.isPaused = false;
      this._startDurationTicker(); // 🔹 restart ticker
    }
  }

  async stopAudio() {
    if (this.currentProcess) {
      const { stdout } = await execPromise("pgrep afplay || true");
      if (stdout.trim()) {
        await execPromise("killall afplay");
      }
      this.currentProcess = null;
    }

    // 🔹 Final played time update
    if (!this.isPaused && this.startTime) {
      this.playedTime += Date.now() / 1000 - this.startTime;
    }

    // Load full transcript (linked to current audio)
    const transcriptMap = {
      english:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audiotranscripts/CardiacArrest.txt",
      spanish:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audiotranscripts/CardiacArrestEs.txt",
    };

    // Find which transcript to use
    let language = "english";
    for (const [lang, path] of Object.entries(this.audioFiles)) {
      if (path === this.currentAudioFile) {
        language = lang;
      }
    }

    const transcriptPath = transcriptMap[language];
    const fullTranscript = fs
      .readFileSync(transcriptPath, "utf8")
      .trim()
      .split(/\s+/);

    // Approximate slice of transcript
    const wordsPerSecond = fullTranscript.length / this.maxDuration;
    const wordsToTake = Math.floor(this.playedTime * wordsPerSecond);

    const partialTranscript = fullTranscript.slice(0, wordsToTake).join(" ");

    // Save to .txt file
    const logDir = "/Users/nagasubarayudu/Desktop/IOS/utils/audioLogs";
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = `${logDir}/played_audio_${Date.now()}.txt`;
    fs.writeFileSync(logFile, partialTranscript, "utf8");

    console.log("Transcript of played audio saved to:", logFile);

    // Reset state
    this.isPaused = false;
    this.pausedTime = 0;
    this.startTime = 0;
    this.playedTime = 0;
    if (this._durationTicker) {
      clearInterval(this._durationTicker);
      this._durationTicker = null;
    }
    return logFile;
  }

  async TextComparison(language) {
    // Constants inside the function
    const TRANSCRIPTS = {
      english:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audiotranscripts/CardiacArrest.txt",
      spanish:
        "/Users/nagasubarayudu/Desktop/IOS/utils/audiotranscripts/CardiacArrestES.txt",
    };

    const SCANNED_DIR =
      "/Users/nagasubarayudu/Desktop/IOS/TranscriptFiles/_results_";

    // Helper functions inside the function
    const normalizeText = (text) => {
      return text
        .replace(/--+\s*Conversation\s*\d+\s*--+/gi, " ")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    };

    const deduplicateText = (text) => {
      const lines = text
        .split(/\n+/)
        .map((l) => l.trim())
        .filter(Boolean);
      return [...new Set(lines)].join(" ");
    };

    // Select transcript file based on language
    const transcriptPath = TRANSCRIPTS[language.toUpperCase()];
    if (!transcriptPath)
      throw new Error(`Transcript not found for language: ${language}`);
    if (!fs.existsSync(transcriptPath))
      throw new Error(`Transcript file missing: ${transcriptPath}`);

    // Automatically get latest scanned text
    const scannedFiles = fs
      .readdirSync(SCANNED_DIR)
      .filter((f) => f.startsWith("scanned_texts_") && f.endsWith(".txt"))
      .sort((a, b) => b.localeCompare(a));
    if (!scannedFiles.length) throw new Error("No scanned text files found.");
    const latestScanned = path.join(SCANNED_DIR, scannedFiles[0]);

    // Read and normalize scanned text
    const scannedTextRaw = fs.readFileSync(latestScanned, "utf8");
    const scannedText = normalizeText(deduplicateText(scannedTextRaw));

    // Read and normalize transcript
    const transcriptText = normalizeText(
      fs.readFileSync(transcriptPath, "utf8")
    );

    // Take portion of transcript equal to scanned text length
    const transcriptSlice = transcriptText.slice(0, scannedText.length);

    // Compute Levenshtein similarity
    const distance = levenshtein(scannedText, transcriptSlice);
    const maxLen = Math.max(scannedText.length, transcriptSlice.length) || 1;
    const similarity = ((1 - distance / maxLen) * 100).toFixed(2);

    const threshold = 85;
    const status =
      similarity >= threshold ? "✅ Match found" : "❌ Below threshold";

    // Allure reporting
    allureReporter.step(
      `Text comparison [${language.toUpperCase()}]: ${status} (${similarity}%)`,
      () => {
        allureReporter.attachment(
          "Scanned Text (Deduplicated)",
          scannedText,
          "text/plain"
        );
      }
    );

    return {
      scannedFile: latestScanned,
      transcriptFile: transcriptPath,
      similarity: `${similarity}%`,
      status,
      language: language.toUpperCase(),
    };
  }
}

export default new AudioManager();

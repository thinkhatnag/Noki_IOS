import { exec } from "child_process";
import allureReporter from "@wdio/allure-reporter";
import AudioManager from "../test/screenObjectModel/audioManeger.js";
import RecordingPage from "../test/screenObjectModel/recording.page.js";
import fs from "fs";
import path from "path";
import say from "say";
import SpanishLanguage from "../test/screenObjectModel/spanishLanguage.js";
export async function verify(element) {
  await element?.waitForDisplayed({ timeout: 10000 });
}
export async function validate(element) {
  await verify(element);
  await expect(element).toBeDisplayed(); // assert displayed
}
export async function verifyAndClick(element) {
  await verify(element);
  await element.click();
}

export async function waitForElement(element, timeout = 150000) {
  await element?.waitForDisplayed({ timeout });
}

export async function swipe(direction, scrollElement) {
  const validDirections = ["up", "down", "left", "right"];
  // Resolve scroll element
  let element;
  element =
    typeof scrollElement === "string" ? await $(scrollElement) : scrollElement;
  await driver.execute("mobile: swipe", {
    direction,
    duration: 1000,
    percent: 0.09,
  });
}

export async function aeroplaneModeOn() {
  await driver.pause(2000);
  await RecordingPage.pauseBtn.click();
  await AudioManager.pauseAudio();
  await driver.pause(2000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 338, y: 23 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 337, y: 704 })
    .up({ button: 0 })
    .perform();
  const contexts = await driver.getContexts();
  console.log(contexts);

  await driver.pause(2000);
  const airplaneModeBtn = await $("~wifi-button");
  await verifyAndClick(airplaneModeBtn);
  await driver.pause(1000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 321, y: 725 })
    .down({ button: 0 })
    .pause(80)
    .up({ button: 0 })
    .perform();
  await driver.pause(1000);
  await waitForElement(RecordingPage.playBtn);
  await verifyAndClick(RecordingPage.playBtn);
  await AudioManager.resumeAudio();
}
export async function aeroplaneModeOff() {
  await driver.pause(2000);
  await verifyAndClick(RecordingPage.pauseBtn);
  await AudioManager.pauseAudio();
  await driver.pause(2000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 338, y: 23 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 337, y: 704 })
    .up({ button: 0 })
    .perform();
  await driver.pause(2000);
  const airplaneModeBtn = await $("~wifi-button");
  await verifyAndClick(airplaneModeBtn);
  await driver.pause(2000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 321, y: 725 })
    .down({ button: 0 })
    .pause(80)
    .up({ button: 0 })
    .perform();
  await driver.pause(4000);
  await waitForElement(RecordingPage.playBtn);
  await verifyAndClick(RecordingPage.playBtn);
  await AudioManager.resumeAudio();
}
export async function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove punctuation
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();
}

// Utility: Levenshtein Distance
export async function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

export async function playTTS(text, voice = null, speed = 1.0, volume = 0.8) {
  return new Promise((resolve, reject) => {
    // Convert volume 0.0–1.0 to macOS system volume scale 0–100
    const volPercent = Math.min(Math.max(volume * 100, 0), 100);

    // Set system volume temporarily
    exec(`osascript -e "set volume output volume ${volPercent}"`, (err) => {
      if (err) console.error("Failed to set volume:", err);
      say.speak(text, voice, speed, (err) => {
        if (err) {
          console.error("TTS failed:", err);
          reject(err);
        } else {
          console.log("TTS spoken:", text);
          resolve();
        }
      });
    });
  });
}
export async function aeroplanemodeswipe() {
  await driver.pause(2000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 338, y: 23 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 337, y: 704 })
    .up({ button: 0 })
    .perform();
  const airplaneModeBtn = await $("~wifi-button");
  await verifyAndClick(airplaneModeBtn);
  await driver.pause(2000);
  await driver
    .action("pointer")
    .move({ duration: 0, x: 321, y: 725 })
    .down({ button: 0 })
    .pause(50)
    .up({ button: 0 })
    .perform();
  await driver.pause(2000);
}

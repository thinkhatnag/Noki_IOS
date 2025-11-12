import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import archiver from "archiver";


// === CONFIG ===
const EMAIL_FROM = 'nag.subbarayudu@thinkhat.ai';
const EMAIL_TO = ['sarat.tumu@thinkhat.ai','bheema.badri@thinkhat.ai','hepsiba.kambhampati@thinkhat.ai','sagar.das@thinkhat.ai','sreedhar.mallu@thinkhat.ai','vasavi.battula@thinkhat.ai','rathan.dhondi@thinkhat.ai','anvesh.kumar@thinkhat.ai','mahabir.neogy@thinkhat.ai'];
const EMAIL_PASS = 'uagw wpci glep bxpu';
const BASE_DIR = '/Users/nagasubarayudu/Desktop/IOS';





// === STEP 2: Extract Test Summary ===
const summaryPath = path.join(BASE_DIR, "allure-report", "widgets", "summary.json");
if (!fs.existsSync(summaryPath)) {
  console.error("❌ summary.json not found.");
  process.exit(1);
}

const stats = JSON.parse(fs.readFileSync(summaryPath, "utf-8")).statistic;
const { total, passed, failed, broken, skipped, unknown } = stats;

// === STEP 3: Build Scenarios Table Dynamically ===
let testCasesHtml = `

  <h3>Test Cases Details:</h3>
  <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th>Scenarios</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
`;

const testCasesDir = path.join(BASE_DIR, "allure-report", "data", "test-cases");
if (fs.existsSync(testCasesDir)) {
  const testCaseFiles = fs.readdirSync(testCasesDir);

  testCaseFiles.forEach((file, index) => {
    const testData = JSON.parse(fs.readFileSync(path.join(testCasesDir, file), "utf-8"));

    const name = testData.name || "Unnamed Test Case";
    const status = testData.status
      ? testData.status.charAt(0).toUpperCase() + testData.status.slice(1)
      : "Unknown";

    testCasesHtml += `
      <tr>
        <td>${index + 1}. ${name}</td>
        <td>${status}</td>
      </tr>
    `;
  });
} else {
  testCasesHtml += `
    <tr>
      <td colspan="2">No test cases found in Allure report.</td>
    </tr>
  `;
}

testCasesHtml += `
    </tbody>
  </table>
`;

// === STEP 4: Send Email ===
console.log("📬 Sending email...");
const curntdate = new Date().toLocaleDateString();

async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASS,
    },
  });

  const htmlBody = `
    <p>Hi Team</>

         <p><strong>NOTE:- Any Failure happen while automation are again manually verified and Updtaed to particular Developers of the team {Because it is a direct sysytem generated mail}</strong></p>

    <ul>
      <li>✅ Passed: ${passed}</li>
      <li>❌ Failed: ${failed}</li>
      <li>⚠️ Broken: ${broken}</li>
      <li>⏭️ Skipped: ${skipped}</li>
      <li>❓ Unknown: ${unknown}</li>
      <li>🔢 Total: ${total}</li>
       <p>Thankyou</p>
    <p>Nag.Subbarayudu</p>
    </ul>
    ${testCasesHtml}
  `;
  const txtPath = path.join(BASE_DIR, "_results_", "scanned_texts.txt");
  let attachments = [];

  if (fs.existsSync(txtPath)) {
    const zipPath = await zipFile(txtPath);
    attachments.push({
      filename: "scanned_texts.zip",
      path: zipPath,
    });
  } else {
    console.warn("⚠️ scanned_texts.txt not found, skipping attachment.");
  }

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `🧪 Sanity Test Summary Report for NOKI IOS`,
    html: htmlBody,
    attachments, // ✅ zip file gets added here

  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
}

sendMail();
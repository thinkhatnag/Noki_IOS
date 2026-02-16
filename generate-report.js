import fs from "fs";
import path from "path";
import { glob, globSync } from "glob"; // ← or just the ones you actually use
console.log("\n🚀 Generating Test Report from Allure Results...\n");

// Configuration
const ALLURE_RESULTS_DIR = path.join(process.cwd(), "allure-results");
const OUTPUT_DIR = path.join(process.cwd(), "reports");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "test-report.html");

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Check if Allure results exist
if (!fs.existsSync(ALLURE_RESULTS_DIR)) {
  console.error("❌ Allure results directory not found!");
  console.error("   Expected:", ALLURE_RESULTS_DIR);
  console.error("   Please run tests first: npm run wdio");
  process.exit(1);
}

// Read all Allure result JSON files
const pattern = path.join(ALLURE_RESULTS_DIR, "*-result.json");
const resultFiles = glob.sync(pattern);

console.log(`📊 Found ${resultFiles.length} test result files`);

if (resultFiles.length === 0) {
  console.error("❌ No test result files found!");
  console.error("   Run tests first: npm run wdio");
  process.exit(1);
}

// Parse all test results
const testCases = [];

resultFiles.forEach((file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    const testResult = JSON.parse(data);

    const testName = testResult.name || "Unknown Test";
    const status = testResult.status || "unknown";
    const duration = (testResult.stop || 0) - (testResult.start || 0);
    const error = testResult.statusDetails?.message || null;

    const isSpanish =
      testName.includes("-Es") ||
      testName.includes("_Es") ||
      testName.includes(" Es ");

    const baseTestName = testName.replace(/-Es|_Es| Es /gi, "").trim();

    testCases.push({
      name: testName,
      baseTestName: baseTestName,
      passed: status === "passed",
      skipped: status === "skipped" || status === "pending",
      failed: status === "failed" || status === "broken",
      duration: duration,
      error: error,
      isSpanish: isSpanish,
      status: status,
    });
  } catch (error) {
    console.error(`⚠️  Error reading ${file}:`, error.message);
  }
});

console.log(`✅ Parsed ${testCases.length} test cases`);

// Group tests by base name
const groupedTests = {};
testCases.forEach((test) => {
  if (!groupedTests[test.baseTestName]) {
    groupedTests[test.baseTestName] = {
      baseTestName: test.baseTestName,
      english: null,
      spanish: null,
    };
  }

  if (test.isSpanish) {
    groupedTests[test.baseTestName].spanish = test;
  } else {
    groupedTests[test.baseTestName].english = test;
  }
});

const reportDate = new Date().toLocaleString();
const reportTimestamp = new Date().toISOString();

// Prepare data for embedding
const testDataJson = JSON.stringify(
  {
    testCases: testCases,
    groupedTests: Object.values(groupedTests).map((g, i) => ({
      index: i,
      baseTestName: g.baseTestName,
      english: g.english,
      spanish: g.spanish,
    })),
    stats: {
      total: testCases.length,
      passed: testCases.filter((t) => t.passed).length,
      failed: testCases.filter((t) => t.failed).length,
      skipped: testCases.filter((t) => t.skipped).length,
    },
    meta: {
      platform: "iOS",
      reportDate: reportDate,
      reportTimestamp: reportTimestamp,
    },
  },
  null,
  2,
);

// Generate standalone HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Test Report - ${reportDate}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
        }
        .header h1 { margin-bottom: 10px; font-size: 28px; }
        .header p { opacity: 0.9; font-size: 14px; }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f9fafb;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stat-card.passed { border-left-color: #10b981; }
        .stat-card.failed { border-left-color: #ef4444; }
        .stat-card.skipped { border-left-color: #f59e0b; }
        .stat-card h3 {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        .stat-card .value {
            font-size: 32px;
            font-weight: bold;
            color: #1f2937;
        }
        .test-table-section { padding: 30px; }
        .test-table-section h2 {
            margin-bottom: 20px;
            color: #1f2937;
            font-size: 20px;
        }
        .save-indicator {
            display: inline-block;
            margin-left: 10px;
            padding: 4px 12px;
            background: #10b981;
            color: white;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .save-indicator.show { opacity: 1; }
        .legend {
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 15px;
            background: #f9fafb;
            border-radius: 4px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            border: 1px solid #e5e7eb;
        }
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }
        .legend-item span { font-weight: 600; }
        .legend-item.passed span { color: #10b981; }
        .legend-item.failed span { color: #ef4444; }
        .legend-item.skipped span { color: #f59e0b; }
        .legend-item.not-run span { color: #9ca3af; }
        .test-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        .test-table thead { background: #f9fafb; }
        .test-table th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
            font-size: 14px;
            text-transform: uppercase;
        }
        .test-table td {
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
        }
        .test-table tbody tr:hover { background: #f9fafb; }
        .test-name {
            font-weight: 500;
            color: #1f2937;
            max-width: 400px;
        }
        .status { font-weight: 600; font-size: 14px; }
        .status.passed { color: #10b981; }
        .status.failed { color: #ef4444; }
        .status.skipped { color: #f59e0b; }
        .status.not-run { color: #9ca3af; }
        .comment-cell { min-width: 250px; }
        .comment-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 14px;
        }
        .comment-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .details {
            padding: 30px;
            border-top: 1px solid #e5e7eb;
        }
        .details h2 {
            margin-bottom: 20px;
            color: #1f2937;
        }
        .info-grid { display: grid; gap: 10px; }
        .info-row {
            display: grid;
            grid-template-columns: 200px 1fr;
            padding: 12px;
            background: #f9fafb;
            border-radius: 4px;
        }
        .info-label { font-weight: 600; color: #6b7280; }
        .info-value { color: #1f2937; }
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }
        .export-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
        }
        .export-btn:hover { background: #5568d3; }
        .back-link {
            display: inline-block;
            margin-bottom: 15px;
            padding: 8px 16px;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
        }
        .back-link:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="index.html" class="back-link">← Back to Dashboard</a>
            <h1>🚀 Mobile Test Report</h1>
            <p>Platform: <span id="platform"></span> | Generated: <span id="reportDate"></span></p>
            <p style="margin-top: 5px; font-size: 12px;">Standalone Report - All Data Embedded</p>
        </div>
        <div class="stats">
            <div class="stat-card">
                <h3>Total Tests</h3>
                <div class="value" id="statTotal">0</div>
            </div>
            <div class="stat-card passed">
                <h3>✓ Passed</h3>
                <div class="value" style="color: #10b981;" id="statPassed">0</div>
            </div>
            <div class="stat-card failed">
                <h3>✗ Failed</h3>
                <div class="value" style="color: #ef4444;" id="statFailed">0</div>
            </div>
            <div class="stat-card skipped">
                <h3>⊗ Skipped</h3>
                <div class="value" style="color: #f59e0b;" id="statSkipped">0</div>
            </div>
        </div>
        <div class="test-table-section">
            <h2>Test Cases Detail <span class="save-indicator" id="saveIndicator">✓ Saved</span></h2>
            <div class="legend">
                <div class="legend-item passed"><span>✓ PASS</span> - Test Passed</div>
                <div class="legend-item failed"><span>✗ FAIL</span> - Test Failed</div>
                <div class="legend-item skipped"><span>⊗ SKIPPED</span> - Test Skipped</div>
                <div class="legend-item not-run"><span>- NOT RUN</span> - Test Not Executed</div>
            </div>
            <table class="test-table">
                <thead>
                    <tr>
                        <th>Test Case</th>
                        <th>English</th>
                        <th>Spanish</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody id="testTableBody">
                </tbody>
            </table>
            <button class="export-btn" onclick="exportToCSV()">📥 Export to CSV</button>
        </div>
        <div class="details">
            <h2>Test Execution Details</h2>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">Platform:</div>
                    <div class="info-value" id="detailPlatform"></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Report Generated:</div>
                    <div class="info-value" id="detailGenerated"></div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>Automated Mobile Testing Report - WebdriverIO + Appium + Allure</p>
        </div>
    </div>
    
    <script>
        // Embedded test data
        const REPORT_DATA = ${testDataJson};
        
        // Populate stats
        document.getElementById('platform').textContent = REPORT_DATA.meta.platform.toUpperCase();
        document.getElementById('reportDate').textContent = REPORT_DATA.meta.reportDate;
        document.getElementById('statTotal').textContent = REPORT_DATA.stats.total;
        document.getElementById('statPassed').textContent = REPORT_DATA.stats.passed;
        document.getElementById('statFailed').textContent = REPORT_DATA.stats.failed;
        document.getElementById('statSkipped').textContent = REPORT_DATA.stats.skipped;
        document.getElementById('detailPlatform').textContent = REPORT_DATA.meta.platform.toUpperCase();
        document.getElementById('detailGenerated').textContent = REPORT_DATA.meta.reportDate;
        
        // Generate table rows
        const tbody = document.getElementById('testTableBody');
        REPORT_DATA.groupedTests.forEach(group => {
            const englishStatus = group.english
                ? group.english.skipped ? "skipped" : group.english.passed ? "passed" : "failed"
                : "not-run";
            
            const spanishStatus = group.spanish
                ? group.spanish.skipped ? "skipped" : group.spanish.passed ? "passed" : "failed"
                : "not-run";
            
            const englishText = group.english
                ? group.english.skipped ? "⊗ SKIPPED" : group.english.passed ? "✓ PASS" : "✗ FAIL"
                : "- NOT RUN";
            
            const spanishText = group.spanish
                ? group.spanish.skipped ? "⊗ SKIPPED" : group.spanish.passed ? "✓ PASS" : "✗ FAIL"
                : "- NOT RUN";
            
            const row = tbody.insertRow();
            row.innerHTML = \`
                <td class="test-name">\${group.baseTestName}</td>
                <td class="status \${englishStatus}">\${englishText}</td>
                <td class="status \${spanishStatus}">\${spanishText}</td>
                <td class="comment-cell">
                    <input type="text" 
                           class="comment-input" 
                           data-test-index="\${group.index}"
                           placeholder="Add comment..." 
                           onchange="saveData()" />
                </td>
            \`;
        });
        
        // Load saved comments
        function loadData() {
            const inputs = document.querySelectorAll('.comment-input');
            inputs.forEach((input) => {
                const testIndex = input.getAttribute('data-test-index');
                const saved = localStorage.getItem('test_comment_' + testIndex);
                if (saved) { input.value = saved; }
            });
        }
        
        function saveData() {
            const inputs = document.querySelectorAll('.comment-input');
            inputs.forEach((input) => {
                const testIndex = input.getAttribute('data-test-index');
                localStorage.setItem('test_comment_' + testIndex, input.value);
            });
            const indicator = document.getElementById('saveIndicator');
            indicator.classList.add('show');
            setTimeout(() => { indicator.classList.remove('show'); }, 2000);
        }
        
        function exportToCSV() {
            let csv = 'Test Case,English,Spanish,Comments\\n';
            REPORT_DATA.groupedTests.forEach(group => {
                const englishText = group.english
                    ? group.english.skipped ? "SKIPPED" : group.english.passed ? "PASS" : "FAIL"
                    : "NOT RUN";
                
                const spanishText = group.spanish
                    ? group.spanish.skipped ? "SKIPPED" : group.spanish.passed ? "PASS" : "FAIL"
                    : "NOT RUN";
                
                const input = document.querySelector(\`input[data-test-index="\${group.index}"]\`);
                const comment = input ? input.value.replace(/,/g, ';').replace(/"/g, '""') : '';
                
                csv += \`"\${group.baseTestName}","\${englishText}","\${spanishText}","\${comment}"\\n\`;
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'test-report-' + REPORT_DATA.meta.reportTimestamp.split('T')[0] + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
        
        window.addEventListener('load', loadData);
    </script>
</body>
</html>`;

// Write HTML file
fs.writeFileSync(OUTPUT_FILE, html);

console.log("\n========================================");
console.log("✅ Report Generated Successfully!");
console.log("========================================");
console.log("📁 Location:", OUTPUT_FILE);
console.log("📊 Total Tests:", testCases.length);
console.log("✓ Passed:", testCases.filter((t) => t.passed).length);
console.log("✗ Failed:", testCases.filter((t) => t.failed).length);
console.log("⊗ Skipped:", testCases.filter((t) => t.skipped).length);
console.log("========================================\n");

console.log("🎉 Done! Open the file in your browser to view the report.\n");

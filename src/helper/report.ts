const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "./test-results/reports",
  reportName: "Playwright Automation Report",
  pageTitle: "Book Art Automation",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "Version 111.0.5563.146 (Official Build) (x86_64)",
    },
    device: "Rahul's Macbook",
    platform: {
      name: "MacOS Ventura",
      version: "13.2.1 (22D68)",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Playwright Cucumber TS" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "1" },
    ],
  },
});

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  webServer: {
    command: "node tests/static-server.js",
    url: "http://localhost:4173/index.html",
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: "http://localhost:4173"
  }
});

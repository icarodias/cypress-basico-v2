const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight:860,
    viewportWidth:410,
    video:false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

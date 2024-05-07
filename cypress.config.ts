import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    viewportHeight: 550,
    viewportWidth: 660,
    setupNodeEvents(on, config: Cypress.PluginConfigOptions) {
      // implement node event listeners here


      // if version not defined, use local
      const version = config.env.version || 'stagin'

      // load env from json
      config.env = require(`./cypress/config/${version}.json`);

      // change baseUrl
      config.baseUrl = config.env.baseUrl

      return config
    },

    baseUrl: 'https://www.fanatyx.com/'
  },
});

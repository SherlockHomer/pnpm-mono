const { defineConfig } = require('cypress');
const rollupPreprocessor = require('cypress-rollup-preprocessor');
const rollupConfig = require('./rollup.config');

const { outputOptions, ...inputOptions } = rollupConfig;

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'react',
      // even I don't use vite, I have to write this code
      bundler: 'vite',
    },
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        rollupPreprocessor({
          outputOptions,
          inputOptions,
        })
      );
    },
  },
});

import { defineConfig } from 'cypress';
import rollupPreprocessor from 'cypress-rollup-preprocessor';
import rollupConfig from './rollup.config.js';

const { outputOptions, ...inputOptions } = rollupConfig;

export default defineConfig({
  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
  component: {
    devServer: {
      framework: 'react',
      // even I don't use vite, I have to write this code
      bundler: 'vite',
    },
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

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

module.exports = {
  // The root directory that Jest should scan for tests
  rootDir: '.',

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // Projects configuration for monorepo
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/FE-apps/*/jest.config.js',
    // '<rootDir>/BE-apps/*/jest.config.js',
  ],

  // Default coverage configuration
  collectCoverageFrom: [
    '<rootDir>/{packages,FE-apps,BE-apps}/**/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],

  // Transform files to make them work with Jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './babel.jest.config.js' },
    ],
  },

  // Module name mapper for non-JS files and path aliases
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@repo/(.*)$': '<rootDir>/packages/$1',
  },
};

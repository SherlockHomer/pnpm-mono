/** @type {import('jest').Config} */
module.exports = {
  // 使用项目根目录作为测试目录
  rootDir: '.',

  // 设置项目展示名称（在测试输出中显示）
  displayName: 'react-3d',

  // 指定测试环境为 jsdom (浏览器环境)
  testEnvironment: 'jsdom',

  // 指定JSDOM版本以避免兼容性问题
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },

  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  // 测试覆盖率收集配置
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/reportWebVitals.js',
    '!src/index.js',
  ],

  // 测试设置文件
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // 模块名称映射，用于处理非 JS 文件和路径别名
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@repo/(.*)$': '<rootDir>/../../packages/$1',
  },

  // 使用 Babel 进行转换
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // 定义哪些文件不需要转换
  transformIgnorePatterns: [
    '/node_modules/(?!(@repo|react-syntax-highlighter)/)',
  ],

  // 是否在每次测试后重置模拟
  resetMocks: true,
};

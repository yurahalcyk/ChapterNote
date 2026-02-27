/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'jest-fixed-jsdom',
  testMatch: ['<rootDir>/src/tests/*/*.test.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.jsx?$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(msw|until-async)/)'],
};

export default config;

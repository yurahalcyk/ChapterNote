/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/*/*.test.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.jsx?$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;

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
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // mock prisma client
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
  // to support the mocking of the prisma client
  setupFiles: ['<rootDir>/jest.setup.js'],
};

export default config;

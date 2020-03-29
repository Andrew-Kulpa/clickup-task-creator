module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/*.test.ts'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

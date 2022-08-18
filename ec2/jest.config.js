/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  // https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/__tests__/**/*.ts"],
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.ts",
    "!**/node_modules/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html"]
};

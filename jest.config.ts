import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@src$": "<rootDir>/src",
    "^@src/(.*)": "<rootDir>/src/$1"
  }
};

export default config;

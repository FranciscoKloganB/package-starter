import type { Config } from "@jest/types";
import hq from "alias-hq";

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: ["src/**/*.(t|j)s", "!src/index.ts"],
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/jest.config.ts", "<rootDir>/src/index.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: hq.get("jest")
};

export default config;

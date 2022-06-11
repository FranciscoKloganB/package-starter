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
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: hq.get("jest")
};

export default config;

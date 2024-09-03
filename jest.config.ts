import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest", // Transform JS files with Babel
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "/node_modules/(?!(some-module|another-module)/)", // Add modules that need to be transformed
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts", // Mock image imports
  },
};

export default config;

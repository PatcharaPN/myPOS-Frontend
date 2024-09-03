import "@testing-library/jest-dom";
// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["./setupTests.ts"],
  // other config options
};

export default config;

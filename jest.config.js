import dotenv from "dotenv";
import nextJest from "next/jest.js";

dotenv.config({
  path: ".env",
});

const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

export default jestConfig;

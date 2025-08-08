import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfigs = [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:jest/recommended",
    "prettier",
  ),
  {
    languageOptions: {
      globals: {},
    },
  },
  {
    ignores: [
      "node_modules",
      ".next",
      "prismicio-types.d.ts",
      "prismicio.ts",
      "slices/index.ts",
    ],
  },
];

export default eslintConfigs;

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,ts,mjs,mts,jsx,tsx,cjs,cts}"]
  },
  {
    ignores: [".docusaurus", ".generated", ".tanstack", "build", "dist", "node_modules"]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,mts,tsx,cts}"],
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "no-public"
          }
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error"
    }
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [solid]
  }
]);

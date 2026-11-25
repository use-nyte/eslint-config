import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  { files: ["**/*.{js,ts,mjs,mts,jsx,tsx,cjs,cts}"] },
  { ignores: [".docusaurus", ".generated", ".react-router", "build", "dist", "node_modules"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
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
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "19"
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  }
]);

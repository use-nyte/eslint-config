import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ ignores: ["dist", "node_modules"] },
	js.configs.recommended,
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		settings: {
			react: {
				version: "detect"
			}
		},
		rules: {
			"react/react-in-jsx-scope": "off",
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
	}
]);

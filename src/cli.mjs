#!/usr/bin/env node

import { ESLint } from "eslint";
import overrideConfig from "./eslint.config.mjs";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig,
    fix: true
  });

  const results = await eslint.lintFiles(overrideConfig[0].files).catch((error) => {
    if (error?.messageTemplate === "all-matched-files-ignored") {
      return [];
    } else {
      throw error;
    }
  });

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  if (resultText) {
    console.log(resultText);
  }

  const errorCount = results.reduce((sum, result) => sum + result.errorCount, 0);

  if (errorCount > 0) {
    process.exit(1);
  } else {
    console.log("No linting errors found.");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

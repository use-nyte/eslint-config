#!/usr/bin/env node

import { ESLint } from "eslint";
import overrideConfig from "./eslint.config.mjs";

async function main() {
  const shouldFix = process.argv.includes("--fix");

  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig,
    fix: shouldFix
  });

  const results = await eslint.lintFiles(overrideConfig[0].files).catch((error) => {
    if (error?.messageTemplate === "all-matched-files-ignored") {
      return [];
    } else {
      throw error;
    }
  });

  if (shouldFix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  if (resultText) {
    console.log(resultText);
  }

  const errorCount = results.reduce((sum, result) => sum + result.errorCount, 0);
  const warningCount = results.reduce((sum, result) => sum + result.warningCount, 0);

  if (errorCount > 0 || warningCount > 0) {
    process.exitCode = 1;
  } else {
    console.log("No linting issues found.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

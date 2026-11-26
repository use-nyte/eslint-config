import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../src/cli.mjs", import.meta.url));

test("lint checks valid and invalid consumer files without rewriting them", (context) => {
  const directory = mkdtempSync(join(tmpdir(), "nyte-lint-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const filename = join(directory, "fixture.mjs");
  writeFileSync(filename, 'console.log("nyte");\n');

  const valid = spawnSync(process.execPath, [cli], { cwd: directory, encoding: "utf8" });
  assert.ifError(valid.error);
  assert.equal(valid.status, 0, valid.stderr);

  const invalidSource = "missingFunction();\n";
  writeFileSync(filename, invalidSource);
  const invalid = spawnSync(process.execPath, [cli], { cwd: directory, encoding: "utf8" });
  assert.ifError(invalid.error);
  assert.equal(invalid.status, 1, invalid.stderr);
  assert.match(invalid.stdout, /no-undef/, invalid.stderr);
  assert.equal(readFileSync(filename, "utf8"), invalidSource);
});

import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("desktop menu uses a centered brand between two link groups", async () => {
  const menu = await readFile(new URL("../src/components/Menu.tsx", import.meta.url), "utf8");

  assert.match(menu, /<DesktopLinks[\s\S]*?<\/DesktopLinks>[\s\S]*?<DesktopBrand[\s\S]*?<\/DesktopBrand>[\s\S]*?<DesktopLinks/);
  assert.match(menu, /grid-template-columns:\s*1fr auto 1fr/);
});

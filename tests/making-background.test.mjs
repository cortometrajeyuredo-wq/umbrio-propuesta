import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('Making off uses the project library illustration instead of the unrelated cave', async () => {
  const component = await readFile(new URL('../src/components/Making.tsx', import.meta.url), 'utf8');

  assert.match(component, /assets\/production\/comp_biblioteca\.jpeg/);
  assert.doesNotMatch(component, /fondo_making\.webp/);
  assert.match(component, /background:\s*linear-gradient\([\s\S]*?url\(\$\{biblioteca\}\)/);
});

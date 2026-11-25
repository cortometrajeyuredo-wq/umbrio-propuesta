import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('location artwork fits the page and stacks above copy on narrow screens', async () => {
  const source = await readFile(new URL('../src/components/CarouselLocations.tsx', import.meta.url), 'utf8');
  const image = source.match(/const Imagen = styled\.img`([^`]*)`;/s)?.[1];
  assert.ok(image);
  assert.match(image, /height:\s*min\(50vh,\s*520px\)/);
  assert.match(image, /object-fit:\s*contain/);
  assert.match(source, /const Feature = styled\.div`[\s\S]*?@media \(max-width: 900px\) \{ grid-template-columns: 1fr; \}/);
  assert.doesNotMatch(source, /Triangulos|Triangulo/);
});

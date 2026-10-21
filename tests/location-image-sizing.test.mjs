import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('location artwork has a desktop size cap and flows above the copy on small screens', async () => {
  const source = await readFile(new URL('../src/components/CarouselLocations.tsx', import.meta.url), 'utf8');
  const image = source.match(/const Imagen = styled\.img`([^`]*)`;/s)?.[1];
  assert.ok(image);
  assert.match(image, /width:\s*min\(\d+vw,\s*\d+px\)/);
  assert.match(image, /height:\s*min\(\d+vh,\s*\d+px\)/);
  assert.match(image, /object-fit:\s*contain/);
  assert.match(image, /@media\s*\(max-width:\s*900px\)[\s\S]*position:\s*relative/);
  assert.doesNotMatch(image, /object-fit:\s*cover/);
  const copy = source.match(/const Contenido = styled\.div`([^`]*)`;/s)?.[1];
  assert.match(copy, /@media\s*\(max-width:\s*900px\)[\s\S]*position:\s*relative/);
});

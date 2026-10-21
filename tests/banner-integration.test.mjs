import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = (name) => readFile(new URL(`../src/components/${name}`, import.meta.url), 'utf8');

test('the hero keeps the full sketch visible with its title and actions on the right', async () => {
  const hero = await source('Hero.tsx');
  assert.match(hero, /const Sketch = styled\.img`[^`]*width:\s*100%;[^`]*height:\s*auto;/s);
  assert.doesNotMatch(hero, /object-fit:\s*cover/);
  assert.match(hero, /const HeroContent = styled\.div`[^`]*right:\s*clamp\(/s);
  assert.match(hero, /<HeroLinks>/);
  assert.doesNotMatch(hero, /<h1>Umbrío<\/h1>/);
  assert.match(hero, /<h1>Donde la memoria de la ciudad se encuentra con sus leyendas\.<\/h1>/);
});

test('the closing sketch spans the page and dissolves into the footer', async () => {
  const footer = await source('Footer.tsx');
  const frame = footer.match(/const ClosingFrame = styled\.div`([^`]*)`;/s)?.[1];
  assert.ok(frame);
  assert.match(frame, /width:\s*100%/);
  assert.match(frame, /img\s*\{[^}]*width:\s*100%;[^}]*height:\s*auto;/s);
  assert.match(frame, /linear-gradient\(to bottom/);
  assert.doesNotMatch(frame, /object-fit:\s*cover|border:\s*1px/);
});

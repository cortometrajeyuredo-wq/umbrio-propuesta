import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = (name) => readFile(new URL(`../src/components/${name}`, import.meta.url), 'utf8');

test('the opening character remains contained beside the title on desktop and mobile', async () => {
  const hero = await source('Hero.tsx');
  assert.match(hero, /banner\.webp/);
  assert.match(hero, /sombreron_pose_espalda\.webp/);
  assert.match(hero, /object-fit:\s*contain/);
  assert.match(hero, /@media \(max-width: 850px\)/);
  assert.doesNotMatch(hero, /<HeroLinks>|href="#Corto"|href="#Juego"/);
  assert.match(hero, /<h1>Donde la memoria de la ciudad se encuentra con sus leyendas\.<\/h1>/);
});

test('the footer keeps its closing message with the relocated illustration', async () => {
  const footer = await source('Footer.tsx');
  assert.match(footer, /La exploración continúa/);
  assert.doesNotMatch(footer, /footer-boceto\.jpeg/);
  assert.match(footer, /ilustracion-final\.webp/);
});

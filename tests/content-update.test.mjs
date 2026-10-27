import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('public story contains no placeholder copy', async () => {
  const [film, characters, places] = await Promise.all([
    source('src/components/Cortometraje.tsx'),
    source('src/data/personajesData.ts'),
    source('src/data/locationsData.ts'),
  ]);
  for (const content of [film, characters, places]) {
    assert.doesNotMatch(content, /Lorem ipsum|\.\.\.\.\.\./i);
  }
  assert.match(film, /Tunja/);
  assert.match(characters, /Noah/i);
});

test('landing page features Sombrerón while creation gallery is hidden', async () => {
  const [hero, app, menu] = await Promise.all([
    source('src/components/Hero.tsx'),
    source('src/App.tsx'),
    source('src/components/Menu.tsx'),
  ]);
  assert.match(hero, /sombreron_pose_espalda\.webp/);
  assert.doesNotMatch(hero, /Imagen en desarrollo|Boceto del banner principal|arte en desarrollo/);
  assert.doesNotMatch(app, /<Galeria|components\/Galeria/);
  assert.doesNotMatch(menu, /#Galeria/);
});

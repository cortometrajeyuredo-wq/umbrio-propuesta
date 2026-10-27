import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const component = (name) => readFile(new URL(`../src/components/${name}`, import.meta.url), 'utf8');
const data = (name) => readFile(new URL(`../src/data/${name}`, import.meta.url), 'utf8');

test('the first screen features Sombrerón and the rejected closing sketch is absent', async () => {
  const [hero, film, footer, app] = await Promise.all([
    component('Hero.tsx'), component('Cortometraje.tsx'), component('Footer.tsx'),
    readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
  ]);
  assert.match(hero, /sombreron_pose_espalda\.webp/);
  assert.match(film, /portadaTrailler\.webp/);
  assert.match(footer, /banner-boceto\.jpeg/);
  assert.doesNotMatch(footer, /footer-boceto\.jpeg/);
  assert.match(app, /<BackToTop\s*\/>/);
});

test('character selection pairs 2D portraits with available 3D renders', async () => {
  const [characters, carousel] = await Promise.all([data('personajesData.ts'), component('CarouselPersonajes.tsx')]);
  assert.match(characters, /nombre:\s*"SIMÓN"/);
  assert.match(characters, /simon\.webp/);
  assert.match(characters, /sombreron-render-transparent\.png/);
  assert.match(characters, /MANOS DE LA PARED/);
  assert.match(characters, /manospared_colorscript\.jpg/);
  assert.match(carousel, /tipoArte/);
  assert.match(carousel, /\$img=\{p\.miniatura\}/);
  assert.match(carousel, /width:\s*80px/);
});

test('locations have an ordered selector and interactive map gems', async () => {
  const [locations, map] = await Promise.all([component('CarouselLocations.tsx'), component('ModalMapa.tsx')]);
  assert.doesNotMatch(locations, /Triangulos|Triangulo/);
  assert.match(locations, /aria-roledescription="carrusel"/);
  assert.match(locations, /slides\[index\]/);
  assert.match(locations, /pergamino1\.webp/);
  assert.match(map, /mapaTunja\.webp/);
  assert.match(map, /<Gem\b/);
  assert.match(map, /pin\.webp/);
});

test('game and sign-language controls expose honest publication and media states', async () => {
  const [game, lsc, html] = await Promise.all([
    component('Videojuego.tsx'), component('ui/VideoLscModal.tsx'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  assert.match(game, /Google Play/);
  assert.match(game, /App Store/);
  assert.match(lsc, /videoSrcMobile\?/);
  assert.match(lsc, /<source media="\(max-width: 639px\)"/);
  assert.match(html, /rel="icon"/);
});

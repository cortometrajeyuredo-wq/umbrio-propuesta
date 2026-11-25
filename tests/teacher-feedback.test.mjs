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
  assert.match(footer, /ilustracion-final\.webp/);
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
  assert.match(carousel, /width:\s*64px/);
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

test('video feedback (24 nov): menu order, single typeface and palette', async () => {
  const [app, menu, css, hero] = await Promise.all([
    readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
    component('Menu.tsx'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
    component('Hero.tsx'),
  ]);
  const order = ['<Hero', '<Cortometraje', '<Videojuego', '<Locaciones', '<Personajes', '<Making', '<Artbook', '<Equipo'].map((tag) => app.indexOf(tag));
  assert.deepEqual([...order].sort((a, b) => a - b), order, 'sections follow the menu order');
  assert.match(menu, /\["Making off", "#Making"\]/);
  assert.match(app, /useHashScroll\(\)/);
  for (const token of ['--violet: #9431c0', '--cyan: #07f3f3', '--aqua: #0697a8', '--gold: #f4a009', '--navy: #011740']) {
    assert.ok(css.includes(token), `palette token ${token}`);
  }
  assert.match(css, /--sans: "Amarante"/);
  assert.match(css, /overflow-x: clip/);
  assert.match(hero, /<VideoLscModal videoSrc=\{inicioLsc\} videoSrcMobile=\{inicioLscVertical\}/);
});

test('no other typeface is declared in the site styles', async () => {
  const { readdir } = await import('node:fs/promises');
  const files = (await readdir(new URL('../src/components/', import.meta.url), { recursive: true }))
    .filter((name) => /\.tsx?$/.test(name) && !/Galeria|BotonLsc|AnimatedButton/.test(name));
  for (const name of files) {
    const text = await component(name);
    assert.doesNotMatch(text, /Georgia|system-ui/, `${name} uses only Amarante`);
  }
  const archiveCss = await readFile(new URL('../src/preproduction.css', import.meta.url), 'utf8');
  assert.doesNotMatch(archiveCss, /var\(--sans\)|Georgia|font-weight: 700/);
});

test('locations parchment rolls up between places; characters use larger portraits', async () => {
  const [locations, characters] = await Promise.all([component('CarouselLocations.tsx'), component('CarouselPersonajes.tsx')]);
  assert.match(locations, /setRolled\(true\)/);
  assert.match(locations, /scaleX\(/);
  assert.match(locations, /prefers-reduced-motion/);
  assert.match(characters, /clamp\(72px/);
});

test('preproduction has a sticky chapter bar, reels, in-page lightbox and storyboard pages', async () => {
  const { readdir } = await import('node:fs/promises');
  const [page, css] = await Promise.all([
    component('Preproduction.tsx'),
    readFile(new URL('../src/preproduction.css', import.meta.url), 'utf8'),
  ]);
  assert.match(css, /\.archive-chapters \{ position: sticky; top: 0;/);
  assert.match(page, /aria-roledescription="carrusel"/);
  assert.match(page, /role="dialog" aria-modal="true"/);
  assert.doesNotMatch(page, /href=\{`\/preproduccion\/\$\{item\.id\}\.jpg`\}/);
  assert.match(page, /-blanco/);
  assert.match(css, /\.archive-section\.archive-section-bocetos \{ background: #120a1c var\(--archive-texture\)/);
  const storyboard = (await readdir(new URL('../public/preproduccion/storyboard/', import.meta.url))).filter((name) => name.endsWith('.webp'));
  assert.equal(storyboard.length, 109);
  assert.match(page, /STORYBOARD_PAGE_COUNT = 109/);
});
test('LSC modal never floats over content on phones and tablets in portrait', async () => {
  const [modal, juego] = await Promise.all([component('ui/VideoLscModal.tsx'), component('Videojuego.tsx')]);
  assert.match(modal, /@media \(max-width: 1023px\) \{\s*position: relative;/);
  assert.match(modal, /\(max-height: 600px\) and \(orientation: landscape\)/);
  assert.match(juego, /padding-right: max\(0px, calc\(clamp\(170px, min\(17vw, 27vh\), 290px\)/);
});
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, stat } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('Making links to a directly loadable preproduction page', async () => {
  const [making, vite, entry] = await Promise.all([
    read('src/components/Making.tsx'),
    read('vite.config.ts'),
    read('preproduccion/index.html'),
  ]);
  assert.match(making, /href="\/preproduccion\/"/);
  assert.match(vite, /preproduccion\/index\.html/);
  assert.match(entry, /preproductionMain\.tsx/);
});

test('preproduction header uses the gold Umbrío logo', async () => {
  const page = await read('src/components/Preproduction.tsx');
  assert.match(page, /import umbrioLogo from '\.\.\/assets\/brand\/umbrio-logo-gold\.png'/);
  assert.match(page, /<img src=\{umbrioLogo\} alt="Umbrío"/);
  await stat(new URL('src/assets/brand/umbrio-logo-gold.png', root));
});

test('the curated archive has 27 distinct images; colour keeps the sets but not the character art', async () => {
  const manifest = JSON.parse(await read('src/data/preproduction.json'));
  assert.equal(manifest.length, 27);
  assert.equal(new Set(manifest.map((item) => item.id)).size, 27);
  assert.doesNotMatch(JSON.stringify(manifest), /color-script-noah/);
  assert.deepEqual(
    Object.fromEntries([...new Set(manifest.map((item) => item.section))].map(
      (section) => [section, manifest.filter((item) => item.section === section).length],
    )),
    { bocetos: 6, concepto: 8, iluminacion: 4, color: 5, texturas: 4 },
  );
  for (const item of manifest) {
    assert.ok(item.title && item.alt && item.source);
    await stat(new URL(`../2. Arte/${item.source}`, root));
    await stat(new URL(`public/preproduccion/${item.id}-thumb.jpg`, root));
    await stat(new URL(`public/preproduccion/${item.id}.jpg`, root));
  }
});

test('the storyboard is offered with a spoiler warning and artbook link', async () => {
  const page = await read('src/components/Preproduction.tsx');
  assert.match(page, /spoilers/i);
  assert.match(page, /href="\/preproduccion\/storyboard-umbrio\.pdf"/);
  assert.match(page, /href="\/#Artbook"/);
  assert.match(page, /href="\/#Making"/);
  await stat(new URL('public/preproduccion/storyboard-umbrio.pdf', root));
});

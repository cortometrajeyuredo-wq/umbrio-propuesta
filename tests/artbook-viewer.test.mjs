import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/artbookPages.ts', import.meta.url), 'utf8');
const moduleCode = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const pages = await import(`data:text/javascript;base64,${Buffer.from(moduleCode).toString('base64')}`);

test('artbook navigation stops at the first and last original pages', () => {
  assert.equal(pages.moveArtbookPage(1, -1), 1);
  assert.equal(pages.moveArtbookPage(1, 1), 2);
  assert.equal(pages.moveArtbookPage(56, 1), 57);
  assert.equal(pages.moveArtbookPage(57, 1), 57);
  assert.equal(pages.ARTBOOK_PAGE_COUNT, 57);
});

test('a page turn keeps the outgoing and incoming pages until the flip finishes', () => {
  assert.deepEqual(pages.getArtbookTurn(1, 1), { from: 1, to: 2, direction: 1 });
  assert.deepEqual(pages.getArtbookTurn(2, -1), { from: 2, to: 1, direction: -1 });
  assert.equal(pages.getArtbookTurn(1, -1), null);
  assert.equal(pages.getArtbookTurn(57, 1), null);
});

test('page URLs follow the complete ordered image set', () => {
  assert.equal(pages.artbookPageUrl(1), '/artbook/page-01.webp');
  assert.equal(pages.artbookPageUrl(57), '/artbook/page-57.webp');
  assert.equal(pages.clampArtbookPage(99), 57);
  assert.equal(pages.clampArtbookPage(0), 1);
});

test('the artbook is reachable from the page and opens as an accessible dialog', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const menu = await readFile(new URL('../src/components/Menu.tsx', import.meta.url), 'utf8');
  const viewer = await readFile(new URL('../src/components/Artbook.tsx', import.meta.url), 'utf8');

  assert.match(app, /<Artbook\s*\/>/);
  assert.match(menu, /#Artbook/);
  assert.match(viewer, /role="dialog"/);
  assert.match(viewer, /aria-modal="true"/);
  assert.match(viewer, /ArrowRight/);
  assert.match(viewer, /Escape/);
  assert.match(viewer, /<select id="artbook-page"/);
  assert.match(viewer, /Ampliar esta página/);
  assert.doesNotMatch(viewer, /target="_blank"/);
});

test('the book shell stays within narrow and short viewports', async () => {
  const viewer = await readFile(new URL('../src/components/Artbook.tsx', import.meta.url), 'utf8');
  assert.match(viewer, /const Dialog = styled\.div`[\s\S]*?box-sizing:\s*border-box/);
  assert.match(viewer, /const Dialog = styled\.div`[\s\S]*?overflow-y:\s*auto/);
  assert.match(viewer, /const BookFrame = styled\.div`[\s\S]*?box-sizing:\s*border-box/);
});

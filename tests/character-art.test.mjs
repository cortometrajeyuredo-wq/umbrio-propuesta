import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

test('the refreshed characters use transparent PNG cutouts, not framed cards', async () => {
  const source = await readFile(new URL('../src/data/personajesData.ts', import.meta.url), 'utf8');
  const transpiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const runnable = transpiled.replaceAll(
    /import\s+(\w+)\s+from\s+["']\.\.\/assets\/(?:personajes|production)\/([^"']+)["'];/g,
    (_, variable, filename) => `const ${variable} = "/assets/${filename}";`,
  );
  const module = await import(`data:text/javascript;base64,${Buffer.from(runnable).toString('base64')}`);
  const byName = new Map(module.personajes.map((personaje) => [personaje.nombre, personaje]));

  assert.equal(byName.size, 6);
  for (const [name, file] of [
    ['NOAH', 'comp_noah.png'],
    ['SIMON', 'comp_simon.png'],
    ['ESPANTO DEL PANÓPTICO', 'comp_espanto.png'],
  ]) {
    const character = byName.get(name);
    assert.ok(character, `${name} remains in the carousel`);
    assert.equal(character.personajeGrande, `/assets/${file}`);
  }
  assert.equal(byName.get('EL SOMBRERÓN').personajeGrande, '/assets/sombreron2.png');
  for (const name of ['MANO PELUDA', 'PERRO DE SAN FRANCISCO']) {
    assert.ok(byName.has(name), `${name} remains in the carousel`);
  }
  for (const character of byName.values()) {
    assert.doesNotMatch(character.personajeGrande, /carta-/);
  }
});

test('transparent character art is fitted within the character panel instead of cropped', async () => {
  const component = await readFile(new URL('../src/components/CarouselPersonajes.tsx', import.meta.url), 'utf8');
  assert.match(component, /object-fit:\s*contain/);
  assert.match(component, /const CarouselLayout = styled\.div`[\s\S]*?width:\s*min\(100%,\s*1100px\)/);
  assert.match(component, /const ArtStage = styled\.div`[\s\S]*?height:\s*clamp\(/);
  assert.match(component, /<ArtStage>\s*<Image[\s\S]*?<\/ArtStage>/);
  assert.match(component, /const Image = styled\.img`[\s\S]*?height:\s*100%/);
  assert.doesNotMatch(component, /height:\s*1000px/);
});

test('selecting another character replays a short transition without forcing motion', async () => {
  const component = await readFile(new URL('../src/components/CarouselPersonajes.tsx', import.meta.url), 'utf8');
  assert.match(component, /<ContentContainer key=\{activo\}>/);
  assert.match(component, /const (?:copyReveal|artReveal) = keyframes/);
  assert.match(component, /animation:\s*\$\{(?:copyReveal|artReveal)\}/);
  assert.match(component, /prefers-reduced-motion:\s*reduce/);
});

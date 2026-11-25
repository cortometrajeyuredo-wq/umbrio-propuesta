import assert from 'node:assert/strict';
import test from 'node:test';
import { open, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../public/artbook/', import.meta.url));

test('the complete 57-page V7 artbook is available in its original order', async () => {
  const files = (await readdir(directory)).filter((name) => name.endsWith('.webp')).sort();
  const expected = Array.from({ length: 57 }, (_, index) => `page-${String(index + 1).padStart(2, '0')}.webp`);

  assert.deepEqual(files, expected);
  for (const file of files) {
    const handle = await open(fileURLToPath(new URL(`../public/artbook/${file}`, import.meta.url)));
    try {
      const header = Buffer.alloc(12);
      await handle.read(header, 0, header.length, 0);
      assert.equal(header.toString('ascii', 0, 4), 'RIFF', `${file} is a WebP file`);
      assert.equal(header.toString('ascii', 8, 12), 'WEBP', `${file} is a WebP file`);
    } finally {
      await handle.close();
    }
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("navigation tracks the visible section and exposes the active link", async () => {
  const [hook, menu] = await Promise.all([source("src/hooks/useActiveSection.ts"), source("src/components/Menu.tsx")]);
  assert.match(hook, /IntersectionObserver/);
  assert.match(menu, /aria-current/);
});

test("experience CSS supports reveal motion, reduced motion, and pointer affordances", async () => {
  const css = await source("src/index.css");
  assert.match(css, /\[data-reveal\]/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /cursor:\s*pointer/);
});

test("map modal is keyboard-addressable as a dialog", async () => {
  const modal = await source("src/components/ModalMapa.tsx");
  assert.match(modal, /role="dialog"/);
  assert.match(modal, /onKeyDown/);
  assert.match(modal, /aria-modal="true"/);
});

test("desktop uses the custom hand cursor without affecting touch devices", async () => {
  const [cursor, app] = await Promise.all([source("src/components/CustomCursor.tsx"), source("src/App.tsx")]);
  assert.match(cursor, /matchMedia\("\(hover: hover\) and \(pointer: fine\)"\)/);
  assert.match(cursor, /mousemove/);
  assert.match(cursor, /requestAnimationFrame/);
  assert.doesNotMatch(cursor, /setPosition\(/);
  assert.match(cursor, /pointer-events:\s*none/);
  assert.match(app, /<CustomCursor/);
});

test("game demo is available while creative-team content remains hidden for later", async () => {
  const [game, team, app] = await Promise.all([source("src/components/Videojuego.tsx"), source("src/components/Equipo.tsx"), source("src/App.tsx")]);
  assert.match(game, /Ver demo del juego/);
  assert.match(game, /role="dialog"/);
  assert.match(team, /Equipo creativo/);
  assert.doesNotMatch(app, /<Equipo/);
});

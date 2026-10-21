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
  assert.match(modal, /createPortal\(/);
  assert.match(modal, /document\.body/);
  assert.match(modal, /88dvh/);
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

test("game section shows its images without pending-status copy or a false video preview", async () => {
  const game = await source("src/components/Videojuego.tsx");
  assert.match(game, /capturaMenu/);
  assert.match(game, /capturaEncuentro/);
  assert.match(game, /capturaAcertijo/);
  assert.doesNotMatch(game, /En desarrollo|Próximamente|pendiente|puede cambiar|VideoSlot|Video de avance/);
  assert.doesNotMatch(game, /<video\b|game-demo\.mp4|onClick=/);
});

test("team roster is reachable from the page and navigation", async () => {
  const [team, roster, app, menu] = await Promise.all([source("src/components/Equipo.tsx"), source("src/data/equipoData.ts"), source("src/App.tsx"), source("src/components/Menu.tsx")]);
  assert.match(team, /aria-roledescription="carrusel"/);
  assert.match(team, /Ver siguientes integrantes/);
  assert.match(team, /<VideoLscModal videoSrc={equipoLsc} \/>/);
  assert.doesNotMatch(team, /<details|<summary/);
  assert.match(roster, /Ivonne Espíndola/);
  assert.equal((roster.match(/\bid: \d+,/g) ?? []).length, 47);
  assert.doesNotMatch(roster, /Lorem Ipsum|link: "#"/);
  assert.match(app, /<Equipo/);
  assert.match(menu, /\["Equipo", "#Equipo"\]/);
});

test("film shows its cover without a coming-soon trailer dialog", async () => {
  const film = await source("src/components/Cortometraje.tsx");
  assert.match(film, /portadaTrailler/);
  assert.match(film, /alt="Portada del cortometraje Umbrío"/);
  assert.doesNotMatch(film, /Próximamente|role="dialog"|aria-modal="true"|Trailer\.mp4|<source\b/);
});

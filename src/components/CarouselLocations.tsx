import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import parchment from "../assets/img/pergamino1.webp";
import roller from "../assets/img/rodillo-pergamino.webp";
import { slides } from "../data/locationsData";

// Cada fase (enrollar y desenrollar) dura lo mismo que en la referencia que eligió la profesora.
const ROLL_MS = 800;
const ROLL_EASE = "cubic-bezier(.7, 0, .3, 1)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const CarruselLocaciones = () => {
  const [index, setIndex] = useState(0);
  // El texto cambia cuando el pergamino está enrollado, no antes.
  const [shown, setShown] = useState(0);
  const [rolled, setRolled] = useState(false);
  const touchStart = useRef<number | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const move = (direction: -1 | 1) => {
    const next = (index + direction + slides.length) % slides.length;
    setIndex(next);
    if (prefersReducedMotion()) { setShown(next); return; }
    if (timer.current) window.clearTimeout(timer.current);
    setRolled(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      setRolled(false);
    }, ROLL_MS);
  };

  const slide = slides[index];
  const era = index % 2 === 0 ? "Antes" : "Ahora";
  const story = slides[shown];
  const storyEra = shown % 2 === 0 ? "Antes" : "Ahora";

  return <Layout aria-label="Locaciones de Umbrío" aria-roledescription="carrusel" tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
    <Header>
      <span className="kicker">Descubre Tunja</span>
      <h2>Locaciones</h2>
      <p>Recorre los lugares que inspiran a Umbrío, de su pasado a su presente.</p>
    </Header>
    <Feature onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
        touchStart.current = null;
      }}>
      <ImagePanel>
        <Arrow type="button" onClick={() => move(-1)} aria-label="Locación anterior"><ChevronLeft aria-hidden="true" /></Arrow>
        <Visual key={index}>
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.imagenMobil} />
            <Imagen src={slide.imagenDesktop} alt={`${slide.titulo}, ${era.toLowerCase()}`} width={780} height={560} />
          </picture>
          <Era $ahora={era === "Ahora"}>{era}</Era>
        </Visual>
        <Arrow type="button" onClick={() => move(1)} aria-label="Locación siguiente"><ChevronRight aria-hidden="true" /></Arrow>
      </ImagePanel>
      <Scroll aria-live="polite">
        <Paper $rolled={rolled}>
          <StoryText $rolled={rolled}>
            <Counter>{String(shown + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {storyEra}</Counter>
            <h3>{story.titulo}</h3>
            <p>{story.descripcion}</p>
          </StoryText>
        </Paper>
        <Roller $side="left" $rolled={rolled} aria-hidden="true" />
        <Roller $side="right" $rolled={rolled} aria-hidden="true" />
      </Scroll>
    </Feature>
    <Hint>Usa las flechas o desliza para continuar</Hint>
  </Layout>;
};

const imageReveal = keyframes`
  from { opacity: .35; transform: translateX(20px) scale(.97); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;
const Layout = styled.div`
  width: min(1320px, 100% - 3rem); margin: auto;
  padding: clamp(4rem, 9vh, 6.5rem) 0 clamp(5rem, 10vh, 6.5rem); color: var(--cream);
  @media (max-width: 1023px) { padding-top: 1rem; }
  &:focus-visible { outline: 2px solid var(--cyan); outline-offset: 8px; }
`;
const Header = styled.header`
  max-width: 760px; margin: 0 auto clamp(1.2rem, 3.5vh, 2.5rem); text-align: center;
  h2 { margin: .4rem 0 .6rem; font-size: clamp(2.5rem, min(5.5vw, 8vh), 4.6rem); }
  p { margin: 0; font-size: clamp(1rem, 1.5vw, 1.18rem); line-height: 1.5; }
`;
const Feature = styled.div`
  display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  align-items: center; gap: clamp(1rem, 2.5vw, 3rem);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const ImagePanel = styled.div`display: flex; align-items: center; gap: .4rem; min-width: 0;`;
const Arrow = styled.button`
  display: grid; place-items: center; flex: none; width: 44px; height: 48px;
  padding: 0; border: 0; color: var(--cyan); background: transparent;
  svg { width: 34px; height: 34px; }
  &:hover { color: var(--cream); }
  &:active { transform: scale(.92); }
  &:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
  @media (max-width: 600px) { svg { width: 28px; height: 28px; } }
`;
const Visual = styled.div`
  position: relative; min-width: 0; flex: 1; animation: ${imageReveal} .45s ease-out both;
  picture { display: block; }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
const Imagen = styled.img`
  display: block; width: 100%; height: min(50vh, 520px); object-fit: contain;
  @media (max-width: 900px) { height: min(40vh, 400px); }
`;
const Era = styled.span<{ $ahora: boolean }>`
  position: absolute; left: .6rem; bottom: .6rem; padding: .3rem .8rem;
  color: ${({ $ahora }) => ($ahora ? "var(--navy)" : "var(--cream)")};
  background: ${({ $ahora }) => ($ahora ? "var(--cyan)" : "var(--violet)")};
  font-size: .9rem; text-transform: uppercase; letter-spacing: .04em;
`;

/*
 * Pergamino con dos rodillos: al cambiar de locación los rodillos se deslizan hasta
 * el centro mientras la hoja se pliega (scaleX desde el centro), el texto cambia con
 * la hoja cerrada y todo vuelve a abrirse. Misma curva para hoja y rodillos, así el
 * borde del papel siempre queda oculto bajo su rodillo.
 */
const Scroll = styled.div`
  --roller: clamp(40px, 4.2vw, 64px);
  position: relative; display: flex; min-width: 0;
  min-height: clamp(360px, 54vh, 540px);
  @media (max-width: 900px) { min-height: 340px; }
  @media (max-width: 600px) { min-height: 420px; }
`;
const Paper = styled.div<{ $rolled: boolean }>`
  /* En el flujo (no absoluto) para que la hoja crezca si el texto es largo; los rodillos siguen su alto. */
  flex: 1; min-width: 0; margin: clamp(14px, 2.2vw, 22px) calc(var(--roller) * .75);
  display: grid; place-items: center;
  padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3.5rem); box-sizing: border-box;
  background: url(${parchment}) center / 100% 100% no-repeat;
  transform-origin: center;
  transform: scaleX(${({ $rolled }) => ($rolled ? 0 : 1)});
  transition: transform ${ROLL_MS}ms ${ROLL_EASE};
  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, .45));
  /* La imagen tiene bordes rasgados arriba y abajo: el texto empieza y termina dentro de la hoja. */
  @media (max-width: 600px) { padding: 3.6rem 1.2rem; }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;
const Roller = styled.span<{ $side: "left" | "right"; $rolled: boolean }>`
  position: absolute; top: 0; bottom: 0; z-index: 2; width: var(--roller);
  ${({ $side, $rolled }) => `${$side}: ${$rolled ? "calc(50% - var(--roller))" : "0"};`}
  background: url(${roller}) center / 100% 100% no-repeat;
  ${({ $side }) => ($side === "right" ? "transform: scaleX(-1);" : "")}
  transition: left ${ROLL_MS}ms ${ROLL_EASE}, right ${ROLL_MS}ms ${ROLL_EASE};
  filter: drop-shadow(0 10px 14px rgba(0, 0, 0, .5));
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;
const StoryText = styled.div<{ $rolled: boolean }>`
  width: 100%; max-width: 52ch; text-align: center; color: #2a1d26;
  opacity: ${({ $rolled }) => ($rolled ? 0 : 1)};
  transition: opacity ${ROLL_MS / 2}ms ease;
  h3 { margin: .5rem 0 1rem; color: var(--indigo); font-size: clamp(1.6rem, 2.6vw, 2.4rem); line-height: 1.15; }
  p { margin: 0; font-size: clamp(1rem, 1.3vw, 1.2rem); line-height: 1.55; }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;
const Counter = styled.span`
  color: #6a2e86; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase;
`;
const Hint = styled.p`
  margin: 1rem 0 0; color: var(--steel); font-size: .85rem; letter-spacing: .05em; text-align: center; text-transform: uppercase;
`;

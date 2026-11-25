import styled from "styled-components";
import { Apple, Play } from "lucide-react";

import fondo from "../assets/img/fondoCorto.webp";
import capturaMenu from "../assets/game/captura-menu.png";
import capturaEncuentro from "../assets/game/captura-encuentro.png";
import capturaAcertijo from "../assets/game/captura-acertijo.png";
import juegoLsc from "../assets/videos/APP_STORE .mp4";
import { VideoLscModal } from "./ui/VideoLscModal";

export const Videojuego = () => (
  <Section id="Juego" data-reveal aria-labelledby="game-title">
    <VideoLscModal videoSrc={juegoLsc} />
    <Inner>
      <Intro>
        <Kicker className="kicker"><span /> Videojuego</Kicker>
        <h2 id="game-title">La ciudad guarda<br /><em>otra historia.</em></h2>
        <Lead>
          Umbrío imagina a Tunja como un territorio de misterio. Explora sus lugares,
          descubre relatos escondidos y enfréntate a las leyendas que habitan su memoria.
        </Lead>
        <Concepts aria-label="Conceptos del videojuego">
          <Concept><Number>01</Number><span>Explora Tunja y sus lugares</span></Concept>
          <Concept><Number>02</Number><span>Descubre pistas y relatos</span></Concept>
          <Concept><Number>03</Number><span>Decide cómo continúa la historia</span></Concept>
        </Concepts>
        <StoreButtons aria-label="Tiendas del videojuego Umbrío">
          <button type="button" disabled aria-label="Google Play: próximamente">
            <Play aria-hidden="true" fill="currentColor" />
            <span><small>Próximamente en</small><strong>Google Play</strong></span>
          </button>
          <button type="button" disabled aria-label="App Store: próximamente">
            <Apple aria-hidden="true" fill="currentColor" />
            <span><small>Próximamente en</small><strong>App Store</strong></span>
          </button>
        </StoreButtons>
      </Intro>

      <MediaArea>
        <Gallery aria-label="Imágenes del videojuego">
          <GalleryHeading>Dentro del juego</GalleryHeading>
          <GalleryGrid>
            <figure><img src={capturaMenu} alt="Pantalla inicial del juego Umbrío" loading="lazy" width={400} height={874} /><figcaption>Inicio</figcaption></figure>
            <figure><img src={capturaEncuentro} alt="Encuentro con un espanto en el juego" loading="lazy" width={400} height={874} /><figcaption>Encuentro</figcaption></figure>
            <figure><img src={capturaAcertijo} alt="Acertijo durante la exploración" loading="lazy" width={400} height={874} /><figcaption>Acertijo</figcaption></figure>
          </GalleryGrid>
        </Gallery>
      </MediaArea>

      <FooterNote>
        <span>Una experiencia móvil de exploración narrativa</span>
        <span>Diseñada para jugar en Tunja o desde casa</span>
      </FooterNote>
    </Inner>
  </Section>
);

const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: clamp(3rem, 9vh, 7rem) clamp(1.25rem, 5vw, 5rem) clamp(1.25rem, 4vh, 2.5rem);
  color: #f5ead4;
  background: #090b0e;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    opacity: .85;
    background: url(${fondo}) center 45% / cover no-repeat;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(7, 10, 13, .83) 0%, rgba(7, 10, 13, .67) 48%, rgba(7, 10, 13, .42) 100%), linear-gradient(180deg, #090b0e 0%, transparent 26%, transparent 72%, #090b0e 100%);
  }

  @media (max-width: 900px) {
    &::before { background-position: 54% center; }
    &::after { background: linear-gradient(180deg, rgba(7, 10, 13, .72), rgba(7, 10, 13, .78)), linear-gradient(180deg, #090b0e, transparent 25%, transparent 75%, #090b0e); }
  }
`;

const Inner = styled.div`
  position: relative;
  width: min(1380px, 100%);
  margin: auto;
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
  column-gap: clamp(2rem, 4.5vw, 5rem);

  @media (min-width: 1400px) { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); }
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  /* Escritorio: reserva solo la parte del modal LSC (esquina superior derecha) que invade el contenido,
     descontando el margen que ya queda a la derecha (padding de la sección o centrado del máximo de 1380px). */
  @media (min-width: 1024px) {
    padding-right: max(0px, calc(clamp(170px, min(17vw, 27vh), 290px) + clamp(12px, 2.5vw, 36px) + 1.5rem - max(clamp(1.25rem, 5vw, 5rem), (100vw - 1380px) / 2)));
    box-sizing: border-box;
  }
`;

const Intro = styled.div`
  h2 {
    margin: clamp(.6rem, 1.6vh, 1rem) 0 clamp(.7rem, 1.8vh, 1.1rem);
    color: var(--cream);
    font-size: clamp(2.4rem, min(4.2vw, 6.5vh), 4.8rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -.025em;
    text-align: left;
    text-transform: none;
  }

  h2 em { color: var(--violet-text); font-style: normal; }
`;

const Kicker = styled.p`
  display: flex;
  align-items: center;
  gap: .8rem;
  margin: 0;

  span { width: 1.4rem; height: 1px; background: currentColor; }
`;

const Lead = styled.p`
  max-width: 34rem;
  margin: 0 0 clamp(.8rem, 3vh, 2.5rem);
  color: var(--cream);
  font-size: clamp(1rem, min(1.35vw, 2.6vh), 1.18rem);
  line-height: clamp(1.5, .9 + 1vh, 1.65);
`;

const Concepts = styled.ol`
  max-width: 32rem;
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(245, 234, 212, .25);
`;

const Concept = styled.li`
  display: flex;
  gap: 1.3rem;
  align-items: baseline;
  padding: clamp(.3rem, 1.2vh, .9rem) 0;
  border-bottom: 1px solid rgba(245, 234, 212, .25);
  color: #f4ead7;
  font-size: 1rem;
`;

const Number = styled.span`
  color: var(--aqua-text);
  font-size: 1rem;
`;

const MediaArea = styled.div`min-width: 0;`;

const StoreButtons = styled.div`
  display: flex; flex-wrap: wrap; gap: .8rem; margin-top: clamp(.8rem, 3vh, 2rem);
  button {
    display: inline-flex; align-items: center; gap: .7rem; min-width: 160px; min-height: clamp(52px, 9vh, 64px);
    padding: .65rem .8rem; border: 1px solid var(--lavender); border-radius: 7px;
    color: #f6e9d2; background: var(--navy);
    box-shadow: inset 0 0 0 2px #384052, 0 10px 30px #0007;
    text-align: left; cursor: not-allowed; opacity: 1;
  }
  svg { width: 29px; height: 29px; flex: none; color: var(--cyan); }
  span { display: grid; gap: .15rem; }
  small { color: var(--mauve); font-size: .7rem; letter-spacing: .02em; text-transform: uppercase; }
  strong { font-size: 1.05rem; font-weight: 400; white-space: nowrap; }
`;

const Gallery = styled.div`width: 100%;`;

const GalleryHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: .5rem 1rem;
  margin-bottom: .9rem;
  color: #f4ead7;
  font-family: var(--heading);
  font-size: 1.1rem;

`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(.5rem, 1.2vw, 1rem);

  figure { min-width: 0; max-width: calc(min(60svh, 560px) * 400 / 874 + 1.1rem); margin: 0; padding: .45rem; border: 2px solid #827363; background: linear-gradient(140deg, #403833, #19171e 70%); box-shadow: inset 0 0 0 2px #201b1c, 0 14px 25px #0008; }

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 400 / 874;
    object-fit: cover;
    object-position: center;
    border: 1px solid rgba(245, 234, 212, .24);
    background: rgba(3, 7, 10, .78);
  }

  figcaption {
    padding-top: .55rem;
    color: var(--aqua-text);
    font-size: .85rem;
    letter-spacing: .06em;
    text-transform: uppercase;
  }
`;

const FooterNote = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(.6rem, 3.5vh, 3.5rem);
  padding-top: clamp(.6rem, 1.8vh, 1.2rem);
  border-top: 1px solid rgba(245, 234, 212, .2);
  color: var(--steel);
  font-size: .85rem;
  letter-spacing: .05em;
  text-transform: uppercase;

  @media (max-width: 600px) { flex-direction: column; }
`;

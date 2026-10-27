import styled from "styled-components";
import { Apple, Play } from "lucide-react";

import fondo from "../assets/img/fondoCorto.webp";
import capturaMenu from "../assets/game/captura-menu.png";
import capturaEncuentro from "../assets/game/captura-encuentro.png";
import capturaAcertijo from "../assets/game/captura-acertijo.png";

export const Videojuego = () => (
  <Section id="Juego" data-reveal aria-labelledby="game-title">
    <Inner>
      <Intro>
        <Kicker><span /> Videojuego</Kicker>
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
            <figure><img src={capturaMenu} alt="Pantalla inicial del juego Umbrío" loading="lazy" /><figcaption>Inicio</figcaption></figure>
            <figure><img src={capturaEncuentro} alt="Encuentro con un espanto en el juego" loading="lazy" /><figcaption>Encuentro</figcaption></figure>
            <figure><img src={capturaAcertijo} alt="Acertijo durante la exploración" loading="lazy" /><figcaption>Acertijo</figcaption></figure>
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
  min-height: 100vh;
  padding: clamp(5rem, 8vw, 8rem) clamp(1.25rem, 5vw, 5rem) 3rem;
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
  column-gap: clamp(2rem, 6vw, 7rem);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

const Intro = styled.div`
  h2 {
    margin: 1.5rem 0 1.75rem;
    color: #f6e8c8;
    font-size: clamp(2.8rem, 5.3vw, 5.8rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -.025em;
    text-align: left;
    text-transform: none;
  }

  h2 em { color: #eba94c; font-style: normal; }
`;

const Kicker = styled.p`
  display: flex;
  align-items: center;
  gap: .8rem;
  margin: 0;
  color: #75d2ca;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;

  span { width: 1.4rem; height: 1px; background: currentColor; }
`;

const Lead = styled.p`
  max-width: 34rem;
  margin: 0 0 2.5rem;
  color: #d5d2c9;
  font-size: clamp(1rem, 1.35vw, 1.18rem);
  line-height: 1.75;
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
  padding: .9rem 0;
  border-bottom: 1px solid rgba(245, 234, 212, .25);
  color: #f4ead7;
  font-size: .92rem;
  letter-spacing: .025em;
`;

const Number = styled.span`
  color: #75d2ca;
  font-family: var(--heading);
  font-size: .85rem;
`;

const MediaArea = styled.div`min-width: 0;`;

const StoreButtons = styled.div`
  display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem;
  button {
    display: inline-flex; align-items: center; gap: .8rem; min-width: 180px; min-height: 64px;
    padding: .65rem 1rem; border: 1px solid #b58b55; border-radius: 7px;
    color: #f6e9d2; background: linear-gradient(140deg, #243042, #151b2b 72%);
    box-shadow: inset 0 0 0 2px #384052, 0 10px 30px #0007;
    text-align: left; cursor: not-allowed; opacity: 1;
  }
  svg { width: 29px; height: 29px; flex: none; color: #e7ac52; }
  span { display: grid; gap: .15rem; }
  small { color: #85d5d5; font-size: .6rem; letter-spacing: .08em; text-transform: uppercase; }
  strong { font: 1rem var(--heading); white-space: nowrap; }
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

  figure { min-width: 0; margin: 0; padding: .45rem; border: 2px solid #827363; background: linear-gradient(140deg, #403833, #19171e 70%); box-shadow: inset 0 0 0 2px #201b1c, 0 14px 25px #0008; }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    object-fit: contain;
    border: 1px solid rgba(245, 234, 212, .24);
    background: rgba(3, 7, 10, .78);
  }

  figcaption {
    padding-top: .55rem;
    color: #75d2ca;
    font-size: .63rem;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const FooterNote = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(3rem, 8vw, 7rem);
  padding-top: 1.2rem;
  border-top: 1px solid rgba(245, 234, 212, .2);
  color: #b8bbb4;
  font-size: .68rem;
  letter-spacing: .12em;
  text-transform: uppercase;

  @media (max-width: 600px) { flex-direction: column; }
`;

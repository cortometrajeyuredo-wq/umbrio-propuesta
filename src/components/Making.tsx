import styled from "styled-components";
import biblioteca from "../assets/production/comp_biblioteca.jpeg";
import { VideoLscModal } from "./ui/VideoLscModal";
import MakingVideo from "../assets/videos/Making.mp4";
import MakingOffVideo from "../assets/videos/making_off.mp4";

export const Making = () => (
  <MakingContenedor id="Making" data-reveal>
    <VideoLscModal videoSrc={MakingVideo} />
    <span className="kicker">Cómo se hizo Umbrío</span>
    <h2>Making off</h2>

    <VideoContainer>
      {/* #t=6: el primer fotograma es negro; así la vista previa muestra una escena. */}
      <video src={`${MakingOffVideo}#t=6`} muted loop controls playsInline preload="metadata" width={1280} height={720} aria-label="Video del making off de Umbrío" />
    </VideoContainer>

    <ArchiveLink href="/preproduccion/">Explorar la preproducción</ArchiveLink>
  </MakingContenedor>
);

const MakingContenedor = styled.section`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100svh;
  padding: clamp(4.5rem, 9vh, 6.5rem) 1.25rem clamp(2.5rem, 6vh, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--cream);
  background: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, .5) 24%, rgba(0, 0, 0, .6) 72%, #000 100%), url(${biblioteca}) center / cover no-repeat;

  h2 { margin: .4rem 0 clamp(.6rem, 2vh, 1.2rem); }
`;

const VideoContainer = styled.div`
  /* Alto del video = pantalla menos título, botón y márgenes (~21rem), para que la sección quepa entera. */
  width: min(100%, 980px, 100vw - 2 * var(--lsc-reserve), calc(max(100svh - 21rem, 11rem) * 16 / 9));
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 2px solid var(--aqua);
  border-radius: 8px;
  background: #000;

  video { display: block; width: 100%; height: 100%; object-fit: cover; }
`;

const ArchiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  margin-top: clamp(1.2rem, 3vh, 2.2rem);
  padding: .8rem 1.5rem;
  border: 2px solid var(--violet);
  border-radius: 4px;
  color: var(--cream);
  background: rgba(1, 23, 64, .85);
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  text-decoration: none;
  transition: background .2s ease, transform .2s ease;

  &:hover { background: var(--violet); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
`;

import styled from 'styled-components';

import fondo from '../assets/img/fondo.webp';
import portada from '../assets/img/portadaTrailler.webp';
// Video de relleno (solo la portada, 30 s) para simular el reproductor del tráiler.
// TODO: reemplazar por el tráiler oficial del cortometraje cuando se publique.
import trailerSimulado from '../assets/videos/trailer-simulado.mp4';
import trailerLsc from '../assets/videos/Trailer.mp4';
import { VideoLscModal } from './ui/VideoLscModal';

export const Cortometraje = () => (
  <FilmSection id="Corto" data-reveal>
    <VideoLscModal videoSrc={trailerLsc} />
    <FilmInner>
      <span className="kicker">La historia que abrió el umbral</span>
      <h2>Cortometraje</h2>
      <p>En Tunja, dos jóvenes se acercan a relatos que la ciudad todavía guarda. Umbrío transforma sus lugares y leyendas en una experiencia animada de misterio, memoria y descubrimiento.</p>

      <Player>
        <video src={trailerSimulado} poster={portada} controls playsInline preload="metadata" width={1280} height={720}>
          Tu navegador no puede reproducir este video.
        </video>
      </Player>
      <Note>Simulación del reproductor: aquí se publicará el tráiler oficial.</Note>
    </FilmInner>
  </FilmSection>
);

const FilmSection = styled.section`
  position: relative;
  box-sizing: border-box;
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: clamp(4.5rem, 9vh, 7rem) 1.25rem 3rem;
  color: var(--cream);
  background: linear-gradient(0deg, #09070d, rgba(9, 7, 13, .87), #09070d), url(${fondo}) center / cover;
`;

const FilmInner = styled.div`
  position: relative;
  width: min(1060px, 100%);
  margin: auto;
  text-align: center;
  h2 { margin: .4rem 0 1rem; }
  > p { max-width: 720px; margin: 0 auto 1.8rem; color: var(--cream); font-size: clamp(1rem, 1.8vw, 1.2rem); line-height: 1.6; }
`;

const Player = styled.div`
  /* Alto del video = alto de pantalla menos título, texto y nota (~30rem), para que la sección quepa entera. */
  width: min(100%, calc(max(100svh - 30rem, 14rem) * 16 / 9));
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid var(--violet);
  border-radius: 6px;
  background: #000;
  box-shadow: 0 30px 90px rgba(0, 0, 0, .5);

  video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; background: #000; }
`;

const Note = styled.p`
  margin: 1rem 0 0;
  color: var(--mauve);
  font-size: .9rem;
`;

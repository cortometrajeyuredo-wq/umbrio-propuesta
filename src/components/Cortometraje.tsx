import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import fondo from '../assets/img/fondo.webp';
import portada from '../assets/img/portadaTrailler.webp';
// TODO: reemplazar por el tráiler oficial del cortometraje cuando se publique.
import videoProvisional from '../assets/videos/making_off.mp4';
import trailerLsc from '../assets/videos/Trailer.mp4';
import { VideoLscModal } from './ui/VideoLscModal';

type Modo = 'seccion' | 'ampliado' | 'mini';

export const Cortometraje = () => {
  const [modo, setModo] = useState<Modo>('seccion');
  const videoRef = useRef<HTMLVideoElement>(null);
  const ampliarRef = useRef<HTMLButtonElement>(null);
  const reducirRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modo !== 'ampliado') return;
    reducirRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModo('seccion');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modo]);

  const volver = () => {
    setModo('seccion');
    requestAnimationFrame(() => ampliarRef.current?.focus());
  };

  const cerrarMini = () => {
    videoRef.current?.pause();
    volver();
  };

  return (
    <FilmSection id="Corto" data-reveal>
      <VideoLscModal videoSrc={trailerLsc} />
      <FilmInner>
        <span className="kicker">La historia que abrió el umbral</span>
        <h2>Cortometraje</h2>
        <p>En Tunja, dos jóvenes se acercan a relatos que la ciudad todavía guarda. Umbrío transforma sus lugares y leyendas en una experiencia animada de misterio, memoria y descubrimiento.</p>

        <Stage>
          {modo === 'ampliado' && <Backdrop aria-hidden="true" onClick={() => setModo('seccion')} />}
          <Player
            $modo={modo}
            role={modo === 'ampliado' ? 'dialog' : undefined}
            aria-modal={modo === 'ampliado' ? true : undefined}
            aria-label={modo === 'ampliado' ? 'Video del cortometraje ampliado' : undefined}
          >
            <video ref={videoRef} src={videoProvisional} poster={portada} controls playsInline preload="metadata" width={1280} height={720}>
              Tu navegador no puede reproducir este video.
            </video>
            <PlayerBar>
              {modo === 'seccion' && (
                <>
                  <button ref={ampliarRef} type="button" onClick={() => setModo('ampliado')}>Ampliar</button>
                  <button type="button" onClick={() => setModo('mini')}>Minimizar</button>
                </>
              )}
              {modo === 'ampliado' && (
                <>
                  <button ref={reducirRef} type="button" onClick={() => setModo('mini')}>Minimizar</button>
                  <button type="button" onClick={volver} aria-label="Cerrar video ampliado">Cerrar ✕</button>
                </>
              )}
              {modo === 'mini' && (
                <>
                  <button type="button" onClick={() => setModo('ampliado')}>Ampliar</button>
                  <button type="button" onClick={cerrarMini} aria-label="Cerrar reproductor flotante">✕</button>
                </>
              )}
            </PlayerBar>
          </Player>
          {modo !== 'seccion' && (
            <Reserved>
              <img src={portada} alt="" width={1280} height={720} />
              <span>El video sigue reproduciéndose {modo === 'mini' ? 'en la esquina inferior' : 'ampliado'}.</span>
            </Reserved>
          )}
        </Stage>
        <Note>Video provisional del making off. Aquí se publicará el tráiler oficial.</Note>
      </FilmInner>
    </FilmSection>
  );
};

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

const Stage = styled.div`
  position: relative;
  width: min(100%, calc(56svh * 16 / 9));
  margin: 0 auto;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4000;
  background: rgba(5, 3, 12, .9);
`;

const Player = styled.div<{ $modo: Modo }>`
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 2px solid var(--violet);
  border-radius: 6px;
  background: #000;
  box-shadow: 0 30px 90px rgba(0, 0, 0, .5);

  video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; background: #000; }

  ${({ $modo }) => $modo === 'ampliado' && css`
    position: fixed;
    z-index: 4001;
    top: 50%;
    left: 50%;
    width: min(94vw, calc(84svh * 16 / 9));
    transform: translate(-50%, -50%);
  `}

  ${({ $modo }) => $modo === 'mini' && css`
    position: fixed;
    z-index: 1250;
    left: clamp(12px, 3vw, 36px);
    bottom: clamp(12px, 3vw, 36px);
    width: min(340px, calc(100vw - 120px));
    border-color: var(--aqua);
  `}
`;

const PlayerBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
  padding: .45rem;
  background: var(--navy);

  button {
    min-height: 44px;
    min-width: 44px;
    padding: .4rem .9rem;
    border: 1px solid var(--lavender);
    border-radius: 4px;
    color: var(--cream);
    background: transparent;
    font-size: .95rem;
    transition: background .2s ease;
  }
  button:hover, button:active { background: var(--indigo); }
  button:focus-visible { outline: 3px solid var(--cyan); outline-offset: 2px; }
`;

const Reserved = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 2px dashed var(--lavender);
  border-radius: 6px;

  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .25; }
  span { position: relative; padding: 0 1rem; color: var(--cream); font-size: 1.05rem; }
`;

const Note = styled.p`
  margin: 1rem 0 0;
  color: var(--mauve);
  font-size: .9rem;
`;

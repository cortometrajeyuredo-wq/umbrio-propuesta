import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import fondo from '../assets/img/fondo.webp';
import portada from '../assets/img/portadaTrailler.webp';
import trailerLsc from '../assets/videos/Trailer.mp4';
import { VideoLscModal } from './ui/VideoLscModal';

type Modo = 'seccion' | 'ampliado' | 'mini';

/*
 * Simulación del reproductor del tráiler (pedido de la profesora): mientras no exista
 * el tráiler oficial, la portada hace de pantalla y la barra avanza como un video real.
 * TODO: cuando llegue el tráiler, sustituir Pantalla por el elemento de video y usar su currentTime.
 */
const DURACION = 90;

const formato = (segundos: number) => `${Math.floor(segundos / 60)}:${String(Math.floor(segundos % 60)).padStart(2, '0')}`;

export const Cortometraje = () => {
  const [modo, setModo] = useState<Modo>('seccion');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const ampliarRef = useRef<HTMLButtonElement>(null);
  const reducirRef = useRef<HTMLButtonElement>(null);

  // El avance sigue aunque el reproductor esté ampliado o minimizado: el estado vive aquí.
  useEffect(() => {
    if (!reproduciendo) return;
    const id = window.setInterval(() => {
      setTiempo((actual) => {
        if (actual + 0.25 >= DURACION) {
          setReproduciendo(false);
          return 0;
        }
        return actual + 0.25;
      });
    }, 250);
    return () => window.clearInterval(id);
  }, [reproduciendo]);

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
    setReproduciendo(false);
    volver();
  };

  const alternar = () => setReproduciendo((valor) => !valor);

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
            role={modo === 'ampliado' ? 'dialog' : 'region'}
            aria-modal={modo === 'ampliado' ? true : undefined}
            aria-label={modo === 'ampliado' ? 'Tráiler del cortometraje ampliado' : 'Tráiler del cortometraje'}
          >
            <Pantalla $reproduciendo={reproduciendo} onClick={alternar}>
              <img src={portada} alt="Portada del tráiler de Umbrío: Noah y Simón ante la entrada de los osarios" width={1280} height={720} />
              {!reproduciendo && (
                <PlayGrande type="button" onClick={(event) => { event.stopPropagation(); alternar(); }} aria-label={tiempo > 0 ? 'Continuar tráiler' : 'Reproducir tráiler'}>
                  <span aria-hidden="true">▶</span>
                </PlayGrande>
              )}
              <Etiqueta>Tráiler · próximamente</Etiqueta>
            </Pantalla>

            <Controles>
              <button type="button" onClick={alternar} aria-label={reproduciendo ? 'Pausar tráiler' : 'Reproducir tráiler'}>
                <span aria-hidden="true">{reproduciendo ? '❚❚' : '▶'}</span>
              </button>
              <Barra
                type="range"
                min={0}
                max={DURACION}
                step={1}
                value={tiempo}
                onChange={(event) => setTiempo(Number(event.target.value))}
                aria-label="Posición del tráiler"
                aria-valuetext={`${formato(tiempo)} de ${formato(DURACION)}`}
                style={{ ['--avance' as string]: `${(tiempo / DURACION) * 100}%` }}
              />
              <Tiempo data-tiempo aria-hidden="true">{formato(tiempo)} / {formato(DURACION)}</Tiempo>
              {modo === 'seccion' && (
                <>
                  <button ref={ampliarRef} type="button" onClick={() => setModo('ampliado')}>Ampliar</button>
                  <button type="button" onClick={() => setModo('mini')}>Minimizar</button>
                </>
              )}
              {modo === 'ampliado' && (
                <>
                  <button ref={reducirRef} type="button" onClick={() => setModo('mini')}>Minimizar</button>
                  <button type="button" onClick={volver} aria-label="Cerrar tráiler ampliado">Cerrar ✕</button>
                </>
              )}
              {modo === 'mini' && (
                <>
                  <button type="button" onClick={() => setModo('ampliado')}>Ampliar</button>
                  <button type="button" onClick={cerrarMini} aria-label="Cerrar reproductor flotante">✕</button>
                </>
              )}
            </Controles>
          </Player>
          {modo !== 'seccion' && (
            <Reserved>
              <img src={portada} alt="" width={1280} height={720} />
              <span>El tráiler sigue {modo === 'mini' ? 'en la esquina inferior' : 'ampliado'}.</span>
            </Reserved>
          )}
        </Stage>
        <Note>Simulación del reproductor: aquí se publicará el tráiler oficial.</Note>
      </FilmInner>
    </FilmSection>
  );
};

const acercamiento = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.12) translate(-2%, -1%); }
`;

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

  ${({ $modo }) => $modo === 'ampliado' && css`
    position: fixed;
    z-index: 4001;
    top: 50%;
    left: 50%;
    width: min(94vw, calc(80svh * 16 / 9));
    transform: translate(-50%, -50%);
  `}

  ${({ $modo }) => $modo === 'mini' && css`
    position: fixed;
    z-index: 1250;
    left: clamp(12px, 3vw, 36px);
    bottom: clamp(12px, 3vw, 36px);
    width: min(360px, calc(100vw - 120px));
    border-color: var(--aqua);

    /* Pequeño: sin contador de tiempo y botones compactos para que quepa el cierre. */
    [data-tiempo] { display: none; }
    button { padding-inline: .6rem; }
  `}
`;

const Pantalla = styled.div<{ $reproduciendo: boolean }>`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${acercamiento} ${DURACION}s linear forwards;
    animation-play-state: ${({ $reproduciendo }) => ($reproduciendo ? 'running' : 'paused')};
    filter: ${({ $reproduciendo }) => ($reproduciendo ? 'none' : 'brightness(.75)')};
    transition: filter .3s ease;
  }

  @media (prefers-reduced-motion: reduce) { img { animation: none; } }
`;

const PlayGrande = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: clamp(56px, 9vw, 88px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 2px solid var(--cream);
  border-radius: 50%;
  color: var(--cream);
  background: rgba(148, 49, 192, .85);
  font-size: clamp(1.3rem, 2.4vw, 2rem);
  transition: background .2s ease, transform .2s ease;

  span { margin-left: .2em; }
  &:hover { background: var(--violet); }
  &:active { transform: translate(-50%, -50%) scale(.94); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
`;

const Etiqueta = styled.span`
  position: absolute;
  top: .7rem;
  left: .7rem;
  padding: .25rem .6rem;
  border-radius: 3px;
  color: var(--navy);
  background: var(--cyan);
  font-size: .8rem;
  letter-spacing: .04em;
  text-transform: uppercase;
  pointer-events: none;
`;

const Controles = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .45rem;
  background: var(--navy);

  button {
    flex: none;
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

const Barra = styled.input`
  flex: 1;
  min-width: 60px;
  height: 44px;
  margin: 0;
  background: transparent;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track { height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--cyan) var(--avance), var(--indigo) var(--avance)); }
  &::-moz-range-track { height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--cyan) var(--avance), var(--indigo) var(--avance)); }
  &::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; margin-top: -5px; border: 0; border-radius: 50%; background: var(--cream); }
  &::-moz-range-thumb { width: 16px; height: 16px; border: 0; border-radius: 50%; background: var(--cream); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 2px; }
`;

const Tiempo = styled.span`
  flex: none;
  color: var(--mauve);
  font-size: .9rem;
  font-variant-numeric: tabular-nums;

  @media (max-width: 520px) { display: none; }
`;

const Reserved = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
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

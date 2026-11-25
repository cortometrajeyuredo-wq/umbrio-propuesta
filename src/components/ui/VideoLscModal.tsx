import styled from "styled-components";
import { useRef, useState } from "react";

interface VideoLscModalProps {
  videoSrc: string;
  /** Corte vertical para celular. Si no existe, se recorta el horizontal al intérprete. */
  videoSrcMobile?: string;
  /** Distancia desde el borde superior de la sección en escritorio (deja libre el menú). */
  $top?: string;
  /** En el hero el contenido está abajo: ahí el modal puede seguir flotando en móvil. */
  $flotaEnMovil?: boolean;
}

/*
 * Interpretación en Lengua de Señas Colombiana (LSC).
 * Los videos son 16:9 con la intérprete al centro y franjas de color a los lados;
 * el marco vertical con object-fit: cover muestra solo a la intérprete.
 */
export const VideoLscModal = ({ videoSrc, videoSrcMobile, $top = "24px", $flotaEnMovil = false }: VideoLscModalProps) => {
  const [abierto, setAbierto] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reabrirRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  const cerrarVideo = () => {
    videoRef.current?.pause();
    setReproduciendo(false);
    setAbierto(false);
    requestAnimationFrame(() => reabrirRef.current?.focus());
  };

  const abrirVideo = () => {
    setAbierto(true);
    requestAnimationFrame(() => cerrarRef.current?.focus());
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play();
    else video.pause();
  };

  if (!abierto) {
    return (
      <BotonReabrir ref={reabrirRef} type="button" $top={$top} $flota={$flotaEnMovil} onClick={abrirVideo} aria-label="Mostrar interpretación en lengua de señas">
        LSC
      </BotonReabrir>
    );
  }

  return (
    <Marco $top={$top} $flota={$flotaEnMovil} aria-label="Interpretación en lengua de señas colombiana">
      <Video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
      >
        {videoSrcMobile && <source media="(max-width: 639px)" src={videoSrcMobile} type="video/mp4" />}
        <source src={videoSrc} type="video/mp4" />
      </Video>

      <Cerrar ref={cerrarRef} type="button" onClick={cerrarVideo} aria-label="Cerrar interpretación en lengua de señas">
        <span aria-hidden="true">✕</span>
      </Cerrar>
      <ControlBoton
        type="button"
        onClick={togglePlay}
        aria-label={reproduciendo ? "Pausar interpretación en lengua de señas" : "Reproducir interpretación en lengua de señas"}
      >
        <span aria-hidden="true">{reproduciendo ? "❚❚" : "▶"}</span>
      </ControlBoton>
    </Marco>
  );
};

const esquina = ($top: string, $flota: boolean) => $flota ? `
  position: absolute;
  top: ${$top};
  right: clamp(12px, 2.5vw, 36px);
  z-index: 600;

  @media (max-width: 639px) {
    top: 84px;
    right: 12px;
  }

  /* Celular horizontal: poco alto; el titular queda abajo a la derecha, así que el modal pasa a la izquierda. */
  @media (min-width: 640px) and (max-height: 600px) and (orientation: landscape) {
    top: 104px;
    left: clamp(12px, 2.5vw, 36px);
    right: auto;
  }
` : `
  position: absolute;
  top: ${$top};
  right: clamp(12px, 2.5vw, 36px);
  z-index: 600;

  /* Hasta tablet en vertical no flota: ocupa su propio bloque al inicio de la sección y no tapa títulos ni controles. */
  @media (max-width: 1023px) {
    position: relative;
    top: auto;
    right: auto;
    order: -1;
    grid-column: 1 / -1;
    justify-self: center;
    align-self: center;
    margin: 0 auto 1rem;
    flex: none;
  }
`;

const Marco = styled.aside<{ $top: string; $flota: boolean }>`
  ${({ $top, $flota }) => esquina($top, $flota)}
  width: clamp(170px, min(17vw, 27vh), 290px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 2px solid var(--lavender);
  border-radius: 10px;
  background: var(--navy);
  box-shadow: 0 14px 34px rgba(0, 0, 0, .55);

  @media (min-width: 640px) and (max-width: 1023px) {
    width: clamp(150px, 22vw, 210px);
  }
  @media (max-width: 639px) {
    width: min(132px, 34vw);
    aspect-ratio: 9 / 16;
  }
`;

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const botonBase = `
  position: absolute;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  transition: background .2s ease, color .2s ease;
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 2px; }
`;

const Cerrar = styled.button`
  ${botonBase}
  top: 6px;
  right: 6px;
  border: 2px solid var(--cream);
  color: var(--cream);
  background: rgba(1, 23, 64, .72);
  &:hover, &:active { color: var(--navy); background: var(--cream); }
`;

const ControlBoton = styled.button`
  ${botonBase}
  left: 6px;
  bottom: 6px;
  border: 2px solid var(--violet);
  color: var(--cream);
  background: rgba(148, 49, 192, .85);
  font-size: .8rem;
  &:hover, &:active { background: var(--violet); }
`;

const BotonReabrir = styled.button<{ $top: string; $flota: boolean }>`
  ${({ $top, $flota }) => esquina($top, $flota)}
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 2px solid var(--cream);
  border-radius: 50%;
  color: var(--cream);
  background: var(--violet);
  font-size: .95rem;
  letter-spacing: .04em;
  box-shadow: 0 8px 20px rgba(0, 0, 0, .4);
  transition: background .2s ease, transform .2s ease;

  &:hover { background: var(--lavender); transform: scale(1.05); }
  &:active { transform: scale(.96); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
`;

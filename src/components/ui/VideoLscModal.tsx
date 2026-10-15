import styled from "styled-components";
import { useState, useRef } from "react";
import { device } from "../../pantallas/breakpoints";

interface VideoLscModalProps {
  videoSrc: string;
}

export const VideoLscModal = ({ videoSrc }: VideoLscModalProps) => {
  const [abierto, setAbierto] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const cerrarVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setReproduciendo(false);
    setAbierto(false);
  };

  const abrirVideo = () => {
    setAbierto(true);
  };

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  /*
   * Cuando se cierra:
   * desaparece el video pero queda el botón
   * EXACTAMENTE EN LA MISMA ZONA.
   */
  if (!abierto) {
    return (
      <BotonReabrir
        type="button"
        onClick={abrirVideo}
        aria-label="Mostrar interpretación en lengua de señas"
      >
        ▶
      </BotonReabrir>
    );
  }

  return (
    <Overlay>
      <ModalContenedor>
        <Cerrar
          type="button"
          onClick={cerrarVideo}
          aria-label="Cerrar video"
        >
          ✕
        </Cerrar>

        <Video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
        />

        <Controles>
          <ControlBoton
            type="button"
            onClick={togglePlay}
            aria-label={reproduciendo ? "Pausar interpretación en lengua de señas" : "Reproducir interpretación en lengua de señas"}
            aria-pressed={reproduciendo}
          >
            {reproduciendo ? "⏸" : "▶"}
          </ControlBoton>
        </Controles>
      </ModalContenedor>
    </Overlay>
  );
};

/* =========================
   OVERLAY
========================= */

const Overlay = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 600;
  width: clamp(150px, 22vw, 240px);

  pointer-events: none;

  @media (max-width: 639px) {
    top: 84px;
    right: 12px;
    width: min(170px, 44vw);
  }
`;
/* =========================
   CONTENEDOR
========================= */

const ModalContenedor = styled.div`
  position: relative;

  pointer-events: auto;

  /*
   * ORIGINAL:
   * width: 95%;
   *
   * Aumentarlo 9% daría 103.55%.
   * Para evitar que se salga de la pantalla,
   * usamos el ancho disponible como límite.
   */
  width: 100%;

  border-radius: 12px;

  overflow: hidden;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);

  background: black;

  margin: 0;

  @media ${device.tablet} {
    /*
     * ORIGINAL:
     * 220px
     *
     * 220 × 1.09 = 239.8px
     *
     * REDONDEADO:
     * 240px
     */
    width: 240px;
  }
`;

/* =========================
   VIDEO
========================= */

const Video = styled.video`
  width: 100%;
  height: auto;

  display: block;
`;

/* =========================
   CERRAR
========================= */

const Cerrar = styled.button`
  position: absolute;

  top: 8px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;

  color: #f6e9c7;

  border-radius: 50%;

  width: 32px;
  height: 32px;

  font-weight: bold;
  font-size: 1rem;

  border: 2px solid #f4a009;

  z-index: 2;

  cursor: pointer;

  &:hover {
    background: #f4a009;
  }

  @media ${device.tablet} {
    width: 36px;
    height: 36px;

    font-size: 1.2rem;
  }
`;

/* =========================
   CONTROLES
========================= */

const Controles = styled.div`
  position: absolute;

  bottom: 12px;
  left: 12px;
`;

/* =========================
   PLAY / PAUSE
========================= */

const ControlBoton = styled.button`
  background: none;

  color: #f6e9c7;

  border: 2px solid #f4a009;

  padding: 6px 10px;

  border-radius: 6px;

  font-size: 14px;

  cursor: pointer;

  &:hover {
    background: #f4a009;
  }

  @media ${device.tablet} {
    padding: 8px 12px;

    font-size: 16px;
  }
`;

/* =========================
   BOTÓN PARA REABRIR
========================= */

const BotonReabrir = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 600;

  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #11111104;

  color: #f6e9c7;

  border: 2px solid #fafaf800;

  border-radius: 50%;

  font-size: 18px;

  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #f4a009;
    color: #060606;

    transform: scale(1.05);
  }

  @media (max-width: 639px) {
    top: 84px;
    right: 12px;
  }
`;

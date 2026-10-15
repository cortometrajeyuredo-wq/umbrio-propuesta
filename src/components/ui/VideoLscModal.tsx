import styled from "styled-components";
import { useState, useRef } from "react";
import { device } from "../../pantallas/breakpoints";

interface VideoLscModalProps {
  videoSrc: string;
  onClose: () => void;
}

export const VideoLscModal = ({
  videoSrc,
  onClose,
}: VideoLscModalProps) => {
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
        aria-label="Volver a abrir el video"
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
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 500;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  pointer-events: none;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);

  @media ${device.tablet} {
    background: transparent;
    backdrop-filter: none;
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
  width: min(103.55%, calc(100% - 40px));

  border-radius: 12px;

  overflow: hidden;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);

  background: black;

  margin: 20px;

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
  position: fixed;

  top: 20px;
  left: 20px;

  z-index: 500;

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

  @media ${device.tablet} {
    top: 20px;
    left: 20px;

    width: 50px;
    height: 50px;
  }
`;

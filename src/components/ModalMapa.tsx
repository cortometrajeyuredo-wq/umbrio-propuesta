import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { XIcon } from "lucide-react";

import mapaTunja from "../assets/img/mapaTunja.webp";
import { lugares } from "../data/mapaData";
import pin from "../assets/img/pin.webp";
import { device } from "../pantallas/breakpoints";

interface ModalMapaProps {
  open: boolean;
  onClose: () => void;
}

export const ModalMapa = ({ open, onClose }: ModalMapaProps) => {
  const [activo, setActivo] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onClose();
  };

  return (
    <Overlay onClick={onClose} onKeyDown={handleKeyDown}>
      <Modal role="dialog" aria-modal="true" aria-labelledby="mapa-title" tabIndex={-1} onClick={(event) => event.stopPropagation()}>
        <VisuallyHidden id="mapa-title">Mapa interactivo de locaciones de Tunja</VisuallyHidden>
        <Cerrar ref={closeButtonRef} type="button" aria-label="Cerrar mapa" onClick={onClose}><XIcon size={26} /></Cerrar>
        <MapaWrapper onClick={() => setActivo(null)}>
          <Mapa src={mapaTunja} alt="Mapa de locaciones de Tunja" />
          {lugares.map((lugar) => {
            const isActive = activo === lugar.id;
            return <Pin key={lugar.id} type="button" aria-label={`Ver ${lugar.nombre}`} aria-pressed={isActive} onClick={(event) => {
              event.stopPropagation();
              setActivo(lugar.id);
            }} style={{ top: lugar.top, left: lugar.left }}>
              <Tooltip $visible={isActive}>
                <img src={lugar.imagen} alt="" />
                <h4>{lugar.nombre}</h4>
              </Tooltip>
            </Pin>;
          })}
        </MapaWrapper>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
  background: #011740; z-index: 900;
`;

const Modal = styled.div`
  width: 95vw; max-height: 90vh; padding: 10px; display: flex; align-items: center; justify-content: center;
  &:focus { outline: none; }
  @media ${device.tablet} { height: 88vh; padding: 15px; }
  @media ${device.laptop} { width: 90vw; height: 90vh; padding: 20px; }
  @media ${device.desktop} { width: 80vw; height: 85vh; }
`;

const MapaWrapper = styled.div`
  position: relative; width: 100%; aspect-ratio: 666 / 375; max-height: 90vh;
`;

const Mapa = styled.img`
  width: 100%; height: 100%; object-fit: contain;
`;

const Pin = styled.button`
  position: absolute; width: 24px; height: 24px; padding: 0; border: 0; background-color: transparent;
  background-image: url(${pin}); background-size: contain; background-repeat: no-repeat;
  transform: translate(-50%, -100%); z-index: 20; transition: transform .3s ease;
  &:hover, &:focus-visible { transform: translate(-50%, -110%) scale(1.1); outline: none; }
  &:focus-visible { filter: drop-shadow(0 0 5px #f4a009); }
  @media ${device.tablet} { width: 26px; height: 26px; }
  @media ${device.laptop} { width: 28px; height: 28px; }
  @media ${device.desktop} { width: 30px; height: 30px; }
`;

const Tooltip = styled.div<{ $visible: boolean }>`
  position: absolute; bottom: 120%; left: 50%; width: 100px; padding: 5px;
  transform: translateX(-50%) scale(${({ $visible }) => $visible ? 1 : 0});
  opacity: ${({ $visible }) => $visible ? 1 : 0}; pointer-events: none;
  background: #011740; color: #f6e9c7; border-radius: 6px; text-align: center; transition: all .3s ease;
  img { width: 100%; height: 60px; object-fit: cover; border-radius: 4px; }
  h4 { margin: 0; font-size: .6rem; }
  @media ${device.tablet} { width: 120px; img { height: 70px; } h4 { font-size: .7rem; } }
  @media ${device.laptop} { width: 140px; img { height: 80px; } h4 { font-size: .8rem; } }
`;

const Cerrar = styled.button`
  position: absolute; top: 10px; right: 20px; z-index: 500; width: 45px; height: 45px;
  display: flex; align-items: center; justify-content: center; border: none; border-radius: 50%;
  color: #f6e9c7; background-color: #8c9eb1; transition: all .2s ease;
  &:hover, &:focus-visible { background-color: #f4a009; color: #f6e9c7; transform: scale(1.1); }
`;

const VisuallyHidden = styled.h2`
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
`;

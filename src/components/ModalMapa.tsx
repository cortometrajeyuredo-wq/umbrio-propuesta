import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { XIcon } from "lucide-react";
import mapaTunja from "../assets/img/mapaTunja.webp";
import gem from "../assets/img/pin.webp";
import { lugares } from "../data/mapaData";

interface ModalMapaProps {
  open: boolean;
  onClose: () => void;
}

export const ModalMapa = ({ open, onClose }: ModalMapaProps) => {
  const [activo, setActivo] = useState(lugares[0].id);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  if (!open) return null;
  const lugar = lugares.find((item) => item.id === activo) ?? lugares[0];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { onClose(); return; }
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return createPortal(
    <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="mapa-title" onKeyDown={onKeyDown}>
        <Header>
          <div><span>Explora la ciudad</span><h2 id="mapa-title">Mapa de Tunja</h2></div>
          <Close ref={closeRef} type="button" aria-label="Cerrar mapa" onClick={onClose}><XIcon aria-hidden="true" /></Close>
        </Header>
        <MapStage>
          <MapImage src={mapaTunja} alt="Mapa ilustrado de Tunja" />
          {lugares.map((item) => <Gem key={item.id} type="button"
            aria-label={`Ver ${item.nombre} en el mapa`}
            aria-pressed={item.id === activo}
            onClick={() => setActivo(item.id)}
            style={{ top: item.top, left: item.left }} />)}
        </MapStage>
        <PlaceList aria-label="Locaciones del mapa">
          {lugares.map((item) => <button key={item.id} type="button" aria-pressed={item.id === activo}
            onClick={() => setActivo(item.id)}>{item.nombre}</button>)}
        </PlaceList>
        <PlaceDetail>
          <img src={lugar.imagen} alt={`Vista de ${lugar.nombre}`} />
          <div><span>Locación seleccionada</span><h3>{lugar.nombre}</h3></div>
        </PlaceDetail>
      </Dialog>
    </Overlay>,
    document.body,
  );
};

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 5000; display: grid; place-items: center;
  overflow-y: auto; padding: 1rem; background: #070710e8;
`;
const Dialog = styled.div`
  box-sizing: border-box; width: min(1100px, 100%); max-height: calc(100dvh - 2rem);
  overflow-y: auto; padding: clamp(1rem, 2.5vw, 2rem);
  border: 1px solid #9c7c54; border-radius: 10px; color: #f6e9d2;
  background: #18101c; box-shadow: 0 25px 70px #000b;
`;
const Header = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;
  span { color: var(--aqua-text); font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; }
  h2 { margin: .3rem 0 0; text-align: left; font-size: clamp(2rem, 4vw, 3.5rem); }
`;
const Close = styled.button`
  display: grid; place-items: center; flex: none; width: 44px; height: 44px;
  border: 2px solid var(--cream); border-radius: 50%; color: var(--cream); background: var(--violet);
  &:focus-visible { outline: 2px solid #7bd8d1; outline-offset: 3px; }
`;
const MapStage = styled.div`
  position: relative; width: min(100%, 81.5dvh); margin: 0 auto;
`;
const MapImage = styled.img`
  display: block; width: 100%; height: auto; background: #261b15;
`;
const Gem = styled.button`
  position: absolute; width: 44px; height: 44px; padding: 0; border: 0;
  transform: translate(-50%, -50%); cursor: pointer;
  background: url(${gem}) center / 32px auto no-repeat;
  filter: drop-shadow(0 2px 4px #07101c);
  transition: filter .2s ease, scale .2s ease;
  &:hover, &[aria-pressed="true"] { filter: drop-shadow(0 0 9px #60f5ff); scale: 1.15; }
  &:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; border-radius: 50%; }
`;
const PlaceList = styled.div`
  display: flex; flex-wrap: wrap; gap: .5rem; margin: 1rem 0;
  button { min-height: 42px; padding: .5rem .75rem; border: 1px solid var(--lavender); border-radius: 4px; color: var(--cream); background: var(--indigo); font-size: .95rem; }
  button[aria-pressed="true"], button:hover { color: var(--navy); background: var(--cyan); }
  button:focus-visible { outline: 2px solid #7bd8d1; outline-offset: 2px; }
`;
const PlaceDetail = styled.div`
  display: flex; align-items: center; gap: 1rem; padding: .75rem;
  border: 1px solid #655043; background: #221720;
  img { display: block; width: 130px; height: 90px; object-fit: cover; }
  span { color: var(--aqua-text); font-size: .85rem; letter-spacing: .05em; text-transform: uppercase; }
  h3 { margin: .3rem 0 0; color: var(--gold); font-size: clamp(1.1rem, 2vw, 1.5rem); }
  @media (max-width: 480px) { img { width: 86px; height: 72px; } }
`;

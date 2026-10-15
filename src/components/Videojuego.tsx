import { useEffect, useRef, useState } from "react";
import { XIcon } from "lucide-react";
import styled from "styled-components";

import fondo from "../assets/img/fondo5.webp";
import espectro from "../assets/img/espectro.webp";
import gameDemo from "../assets/game/game-demo.mp4";
import phoneFrame from "../assets/game/phone-frame.webp";

export const Videojuego = () => {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return <VideoJuegoWrapper id="Juego" data-reveal>
    <CharacterBg><img src={espectro} alt="Espectro de Umbrío" /></CharacterBg>
    <Content>
      <Eyebrow>Explora la leyenda</Eyebrow>
      <h2>El juego de Umbrío</h2>
      <p>Recorre una Tunja entre la memoria y el misterio. Encuentra sus leyendas, sigue las pistas y descubre lo que la noche todavía guarda.</p>
      <DemoButton type="button" onClick={() => setOpen(true)}>Ver demo del juego</DemoButton>
    </Content>
    {open && <Overlay role="presentation" onMouseDown={() => setOpen(false)}>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="game-demo-title" onMouseDown={(event) => event.stopPropagation()}>
        <Close ref={closeButtonRef} type="button" aria-label="Cerrar demo del juego" onClick={() => setOpen(false)}><XIcon size={24} /></Close>
        <PhonePreview>
          <video autoPlay loop muted playsInline controls aria-label="Demo del juego Umbrío"><source src={gameDemo} type="video/mp4" /></video>
          <img src={phoneFrame} alt="" />
        </PhonePreview>
        <DialogCopy><h3 id="game-demo-title">¡Juega ahora!</h3><p>Esta es una muestra del juego. El acceso completo se añadirá cuando esté publicado.</p></DialogCopy>
      </Dialog>
    </Overlay>}
  </VideoJuegoWrapper>;
};

const VideoJuegoWrapper = styled.section`
  position: relative; min-height: 100vh; overflow: hidden; display: grid; place-items: center; padding: 8rem 1.5rem;
  color: #f6e9c7; background: url(${fondo}) center / cover no-repeat;
  &::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.88), rgba(0,0,0,.38), rgba(0,0,0,.75)); }
`;
const CharacterBg = styled.div`
  position: absolute; inset: 0; z-index: 1; display: flex; justify-content: center; overflow: hidden; opacity: .62;
  img { width: min(80vw, 800px); height: auto; object-fit: contain; object-position: center top; }
`;
const Content = styled.div`
  position: relative; z-index: 2; width: min(620px, 100%); text-align: center;
  h2 { font-size: clamp(2.4rem, 7vw, 5.5rem); color: var(--accent); }
  p { margin: 1.4rem auto 2rem; max-width: 560px; font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.6; text-shadow: 0 2px 15px #000; }
`;
const Eyebrow = styled.p`
  margin: 0 0 .65rem; color: #10d9de; font-family: var(--heading); letter-spacing: .12em; text-transform: uppercase;
`;
const DemoButton = styled.button`
  border: 1px solid #10d9de; border-radius: 999px; padding: .9rem 1.5rem; color: #071213; background: #10d9de;
  font-family: var(--heading); font-size: 1.05rem; transition: transform .2s ease, background .2s ease;
  &:hover, &:focus-visible { transform: translateY(-3px); background: #f6e9c7; }
`;
const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 1600; display: grid; place-items: center; padding: 1.25rem; background: rgba(2, 8, 10, .88); backdrop-filter: blur(8px);
`;
const Dialog = styled.div`
  position: relative; width: min(800px, 100%); display: grid; grid-template-columns: minmax(190px, 1fr) minmax(190px, .85fr); align-items: center; gap: clamp(1rem, 4vw, 3rem); padding: clamp(1.5rem, 5vw, 3rem); border: 1px solid rgba(16,217,222,.55); border-radius: 20px; background: #071213; box-shadow: 0 25px 80px #000;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;
const Close = styled.button`
  position: absolute; top: .8rem; right: .8rem; z-index: 2; display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border: 1px solid #10d9de; border-radius: 50%; color: #f6e9c7; background: #071213;
`;
const PhonePreview = styled.div`
  position: relative; width: min(100%, 300px); justify-self: center; aspect-ratio: 9 / 16;
  video { position: absolute; inset: 4.5% 7%; width: 86%; height: 91%; object-fit: cover; border-radius: 24px; }
  img { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; pointer-events: none; }
`;
const DialogCopy = styled.div`
  text-align: center; h3 { color: var(--accent); font-size: clamp(1.7rem, 4vw, 2.7rem); } p { line-height: 1.55; }
`;

import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import parchment from "../assets/img/pergamino1.webp";
import { slides } from "../data/locationsData";

export const CarruselLocaciones = () => {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slide = slides[index];
  const era = index % 2 === 0 ? "Antes" : "Ahora";
  const move = (direction: -1 | 1) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return <Layout aria-label="Locaciones de Umbrío" aria-roledescription="carrusel" tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
    <Header>
      <span>Descubre Tunja</span>
      <h2>Locaciones</h2>
      <p>Recorre los lugares que inspiran a Umbrío, de su pasado a su presente.</p>
    </Header>
    <Feature onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
        touchStart.current = null;
      }}>
      <ImagePanel>
        <Arrow type="button" onClick={() => move(-1)} aria-label="Locación anterior"><ChevronLeft aria-hidden="true" /></Arrow>
        <Visual key={index}>
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.imagenMobil} />
            <Imagen src={slide.imagenDesktop} alt={`${slide.titulo}, ${era.toLowerCase()}`} />
          </picture>
          <Era>{era}</Era>
        </Visual>
        <Arrow type="button" onClick={() => move(1)} aria-label="Locación siguiente"><ChevronRight aria-hidden="true" /></Arrow>
      </ImagePanel>
      <Story key={index} aria-live="polite">
        <StoryText>
          <Counter>{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {era}</Counter>
          <h3>{slide.titulo}</h3>
          <p>{slide.descripcion}</p>
        </StoryText>
      </Story>
    </Feature>
    <Hint>Usa las flechas o desliza para continuar</Hint>
  </Layout>;
};

const imageReveal = keyframes`
  from { opacity: .35; transform: translateX(20px) scale(.97); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;
const pageOpen = keyframes`
  from { opacity: .6; transform: perspective(900px) rotateY(-12deg) scaleX(.92); }
  to { opacity: 1; transform: perspective(900px) rotateY(0) scaleX(1); }
`;
const Layout = styled.div`
  width: min(1280px, 100% - 3rem); margin: auto;
  padding: clamp(5rem, 8vw, 8rem) 0 5rem; color: #f6e9d2;
  &:focus-visible { outline: 2px solid #7fdbd2; outline-offset: 8px; }
`;
const Header = styled.header`
  max-width: 760px; margin: 0 auto clamp(2rem, 4vw, 4rem); text-align: center;
  span { color: #7fdbd2; font-size: .75rem; letter-spacing: .18em; text-transform: uppercase; }
  h2 { margin: .5rem 0 1rem; font-size: clamp(2.7rem, 6vw, 5rem); }
  p { margin: 0; font-size: clamp(1rem, 1.5vw, 1.18rem); line-height: 1.55; }
  @media (max-width: 639px) { padding-top: 110px; }
`;
const Feature = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center; gap: clamp(1rem, 3vw, 4rem);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;
const ImagePanel = styled.div`display: flex; align-items: center; gap: .4rem; min-width: 0;`;
const Arrow = styled.button`
  display: grid; place-items: center; flex: none; width: 42px; height: 48px;
  padding: 0; border: 0; color: #f4a009; background: transparent; cursor: pointer;
  svg { width: 34px; height: 34px; }
  &:hover { color: #f6e9d2; }
  &:focus-visible { outline: 2px solid #7fdbd2; outline-offset: 2px; }
  @media (max-width: 600px) { width: 32px; svg { width: 28px; height: 28px; } }
`;
const Visual = styled.div`
  position: relative; min-width: 0; flex: 1; animation: ${imageReveal} .45s ease-out both;
  picture { display: block; }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
const Imagen = styled.img`
  display: block; width: 100%; height: min(55vh, 560px); object-fit: contain;
  @media (max-width: 900px) { height: min(50vh, 440px); }
`;
const Era = styled.span`
  position: absolute; left: .6rem; bottom: .6rem; padding: .35rem .7rem;
  color: #201016; background: #f4a009; font: .75rem var(--heading); text-transform: uppercase;
`;
const Story = styled.div`
  display: grid; place-items: center; min-width: 0; min-height: 410px;
  padding: clamp(2rem, 4vw, 4rem); box-sizing: border-box;
  background: url(${parchment}) center / 100% 100% no-repeat;
  animation: ${pageOpen} .55s cubic-bezier(.22, 1, .36, 1) both;
  @media (max-width: 900px) { min-height: 350px; }
  @media (max-width: 600px) { min-height: 430px; padding: 2.5rem 2rem; }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
const StoryText = styled.div`
  width: 100%; max-width: 44ch; text-align: center; color: #30212a;
  h3 { margin: .5rem 0 1rem; color: #211a34; font-size: clamp(1.5rem, 2.5vw, 2.2rem); line-height: 1.15; }
  p { margin: 0; font: clamp(.9rem, 1.25vw, 1.1rem)/1.55 Georgia, serif; }
`;
const Counter = styled.span`
  color: #654047; font-size: .7rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
`;
const Hint = styled.p`
  margin: 1rem 0 0; color: #b8a890; font-size: .7rem; letter-spacing: .1em; text-align: center; text-transform: uppercase;
`;

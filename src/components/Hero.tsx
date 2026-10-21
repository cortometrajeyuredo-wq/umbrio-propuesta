import styled from 'styled-components';
import boceto from '../assets/img/banner-boceto.jpeg';
import { Menu } from './Menu';

export const Hero = () => (
  <HeroSection id="home">
    <Menu />
    <Sketch src={boceto} alt="Dos jóvenes frente a los seres de las leyendas de Umbrío" />
    <Shade aria-hidden="true" />
    <HeroContent>
      <Eyebrow>Un universo nacido en Tunja</Eyebrow>
      <h1>Donde la memoria de la ciudad se encuentra con sus leyendas.</h1>
      <HeroLinks>
        <a href="#Corto">Descubre el cortometraje <span aria-hidden="true">↗</span></a>
        <a href="#Juego">Explora el juego <span aria-hidden="true">↓</span></a>
      </HeroLinks>
    </HeroContent>
  </HeroSection>
);

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  color: #f6e9d2;
  background: #08060d;
`;
const Sketch = styled.img`
  display: block;
  width: 100%;
  height: auto;
  filter: grayscale(1) brightness(.76) contrast(1.08);
`;
const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, transparent 0%, rgba(8, 6, 13, .06) 43%, rgba(8, 6, 13, .78) 73%, #08060d 100%),
    linear-gradient(0deg, #08060d 0%, transparent 25%, rgba(8, 6, 13, .2) 100%);
  @media (max-width: 850px) {
    background: linear-gradient(0deg, #08060d 8%, transparent 48%);
  }
`;
const HeroContent = styled.div`
  position: absolute;
  top: 0;
  right: clamp(1.5rem, 5vw, 6rem);
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: min(38vw, 510px);
  padding: 6rem 0 3rem;
  box-sizing: border-box;
  h1 { margin: .85rem 0 2rem; font-size: clamp(2.3rem, 4.1vw, 4.5rem); line-height: 1.08; color: #f6e9d2; text-shadow: 0 12px 36px #08060d; }
  @media (max-width: 850px) {
    position: relative;
    right: auto;
    width: 100%;
    padding: 1.5rem 1.25rem 4rem;
  }
`;
const Eyebrow = styled.span`
  display: inline-block;
  padding-bottom: .75rem;
  border-bottom: 1px solid #d2a66f;
  color: #f7d9a2;
  font-size: .73rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
`;
const HeroLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
  a { display: inline-flex; align-items: center; justify-content: space-between; gap: 1.5rem; min-height: 48px; padding: .8rem 1rem; border: 1px solid #d2a66f; color: #f6e9d2; background: rgba(8, 7, 12, .5); font-size: .82rem; letter-spacing: .06em; text-decoration: none; text-transform: uppercase; transition: background .2s, color .2s; }
  a:first-child, a:hover, a:focus-visible { color: #120c10; background: #e7ac52; }
`;

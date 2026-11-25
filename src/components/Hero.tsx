import styled from 'styled-components';
import sombreron from '../assets/img/sombreron_pose_espalda.webp';
import banner from '../assets/img/banner.webp';
import { Menu } from './Menu';
import { VideoLscModal } from './ui/VideoLscModal';
// TODO: reemplazar por los renders de bienvenida en LSC cuando el equipo de animación los entregue.
import inicioLsc from '../assets/videos/Inicio.mp4';
import inicioLscVertical from '../assets/videos/Inicio1.mp4';

// Sin botones de llamada: el menú ya lleva al corto y al juego.
export const Hero = () => (
  <HeroSection id="home">
    <Menu />
    <Sketch src={sombreron} alt="El Sombrerón visto de espaldas" width={760} height={850} fetchPriority="high" />
    <Shade aria-hidden="true" />
    <VideoLscModal videoSrc={inicioLsc} videoSrcMobile={inicioLscVertical} $top="128px" $flotaEnMovil />
    <HeroContent>
      <span className="kicker">Un universo nacido en Tunja</span>
      <h1>Donde la memoria de la ciudad se encuentra con sus leyendas.</h1>
    </HeroContent>
  </HeroSection>
);

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  color: var(--cream);
  min-height: 100svh;
  background: #08060d url(${banner}) center / cover no-repeat;
`;
const Sketch = styled.img`
  display: block;
  position: absolute;
  left: 4%;
  bottom: 0;
  width: min(55%, 760px);
  height: min(88svh, 850px);
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 20px 45px #000);
  @media (max-width: 850px) {
    position: relative;
    left: auto;
    width: min(88%, 480px);
    height: min(60vh, 550px);
    margin: 84px auto 0;
  }
`;
const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(8, 6, 13, .14) 0%, rgba(8, 6, 13, .08) 43%, rgba(8, 6, 13, .75) 73%, rgba(8, 6, 13, .88) 100%),
    linear-gradient(0deg, #08060d 0%, transparent 30%);
  @media (max-width: 850px) {
    background: linear-gradient(0deg, #08060d 5%, rgba(8, 6, 13, .35) 55%, rgba(8, 6, 13, .12) 100%);
  }
`;
const HeroContent = styled.div`
  position: absolute;
  right: clamp(1.5rem, 5vw, 6rem);
  bottom: clamp(2.5rem, 9vh, 6rem);
  z-index: 2;
  width: min(36vw, 500px);
  box-sizing: border-box;
  .kicker { padding-bottom: .6rem; border-bottom: 1px solid var(--aqua); }
  h1 { margin: .85rem 0 0; font-size: clamp(2.2rem, min(3.8vw, 6.5vh), 4.3rem); line-height: 1.08; color: var(--cream); text-shadow: 0 12px 36px #08060d; }
  @media (max-width: 850px) {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    padding: 1.5rem 1.25rem 4rem;
  }
`;

import styled from 'styled-components';
import skull from '../assets/img/craneo-subir.png';
import skullGlow from '../assets/img/craneo-subir-activo.png';

export const BackToTop = () => {
  return <TopLink href="#home" aria-label="Volver al inicio">
    <img src={skull} alt="" />
    <img src={skullGlow} alt="" aria-hidden="true" />
  </TopLink>;
};

const TopLink = styled.a`
  position: fixed;
  right: clamp(12px, 3vw, 36px);
  bottom: clamp(12px, 3vw, 36px);
  z-index: 1300;
  display: block;
  width: 80px;
  height: 85px;
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transition: opacity .2s ease; }
  img:last-child { opacity: 0; }
  &:hover img:last-child, &:focus-visible img:last-child { opacity: 1; }
  &:focus-visible { outline: 2px solid var(--cyan); outline-offset: 4px; }
  @media (max-width: 600px) { width: 68px; height: 72px; }
  @media (prefers-reduced-motion: reduce) { img { transition: none; } }
`;

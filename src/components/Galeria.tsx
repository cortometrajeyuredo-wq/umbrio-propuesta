import styled from 'styled-components';
import prologo from '../assets/production/comp_prologo.png';
import noah from '../assets/production/comp_noah.png';
import simon from '../assets/production/comp_simon.png';
import espanto from '../assets/production/comp_espanto.png';
import biblioteca from '../assets/production/comp_biblioteca.jpeg';

const piezas = [
  { imagen: prologo, nombre: 'El libro y las pistas', detalle: 'Exploración visual del prólogo', clase: 'wide' },
  { imagen: noah, nombre: 'Noah', detalle: 'Prueba de personaje', clase: '' },
  { imagen: simon, nombre: 'Simón', detalle: 'Prueba de personaje', clase: '' },
  { imagen: espanto, nombre: 'El Espanto', detalle: 'Prueba de personaje', clase: '' },
  { imagen: biblioteca, nombre: 'La biblioteca', detalle: 'Escenario en desarrollo', clase: 'wide' },
] as const;

export const Galeria = () => (
  <Section id="Galeria" data-reveal>
    <Intro>
      <span>Detrás de Umbrío</span>
      <h2>Galería de creación</h2>
      <p>Personajes, escenarios y símbolos toman forma entre la animación y el videojuego. Estas piezas muestran el proceso creativo del proyecto y pueden cambiar en la versión final.</p>
    </Intro>
    <Grid>
      {piezas.map(({ imagen, nombre, detalle, clase }) => (
        <Piece className={clase} key={nombre}>
          <img src={imagen} alt={`${nombre}, ${detalle.toLowerCase()} de Umbrío`} loading="lazy" />
          <figcaption><strong>{nombre}</strong><span>{detalle}</span></figcaption>
        </Piece>
      ))}
    </Grid>
    <Footnote>Selección de renders del material de producción de Umbrío.</Footnote>
  </Section>
);

const Section = styled.section`
  padding: clamp(5rem, 9vw, 8rem) 1.25rem;
  color: #f6e9d2;
  background: radial-gradient(circle at 80% 0%, rgba(53, 76, 76, .22), transparent 40%), #0a0b0d;
`;
const Intro = styled.header`
  max-width: 780px;
  margin: 0 auto 3rem;
  text-align: center;
  > span { color: #76d9d4; font-size: .75rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
  h2 { margin: .6rem 0 1rem; }
  p { margin: 0; color: #cfcbc3; font: clamp(1rem, 2vw, 1.18rem)/1.65 Georgia, serif; }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  max-width: 1180px;
  margin: auto;
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;
const Piece = styled.figure`
  position: relative;
  min-height: 320px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(231, 172, 82, .2);
  background: #08080a;
  &.wide { grid-column: span 2; }
  img { width: 100%; height: 100%; max-height: 520px; min-height: 320px; display: block; object-fit: contain; transition: transform .5s ease; }
  &:hover img { transform: scale(1.04); }
  figcaption { position: absolute; inset: auto 0 0; display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding: 2.5rem 1rem 1rem; background: linear-gradient(transparent, rgba(0, 0, 0, .86)); }
  strong { font-family: var(--heading); color: #f4b35b; }
  span { color: #e0d3c0; font-size: .72rem; text-align: right; }
  @media (max-width: 520px) { &.wide { grid-column: auto; } }
`;
const Footnote = styled.p`
  max-width: 1180px;
  margin: 1.3rem auto 0;
  color: #a8a39a;
  font-size: .72rem;
`;

import styled from 'styled-components';

import fondo from '../assets/img/fondo.webp';
import portada from '../assets/img/portadaTrailler.webp';

export const Cortometraje = () => (
  <FilmSection id="Corto" data-reveal>
    <FilmInner>
      <Kicker>La historia que abrió el umbral</Kicker>
      <h2>Cortometraje</h2>
      <p>En Tunja, dos jóvenes se acercan a relatos que la ciudad todavía guarda. Umbrío transforma sus lugares y leyendas en una experiencia animada de misterio, memoria y descubrimiento.</p>
      <FilmVisual>
        <img src={portada} alt="Portada del cortometraje Umbrío" loading="lazy" />
      </FilmVisual>
    </FilmInner>
  </FilmSection>
);

const FilmSection = styled.section`
  position: relative;
  padding: clamp(5rem, 10vw, 9rem) 1.25rem;
  color: #f6e9d2;
  background: linear-gradient(0deg, #09070d, rgba(9, 7, 13, .87), #09070d), url(${fondo}) center / cover;
`;

const FilmInner = styled.div`
  position: relative;
  max-width: 1060px;
  margin: auto;
  text-align: center;
  h2 { margin: .4rem 0 1.3rem; }
  > p { max-width: 720px; margin: 0 auto 2.3rem; color: #e6d9c8; font: clamp(1rem, 2vw, 1.25rem)/1.7 Georgia, serif; }
`;

const Kicker = styled.span`
  color: #76d9d4;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
`;

const FilmVisual = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(231, 172, 82, .48);
  background: #09070d;
  box-shadow: 0 30px 90px rgba(0, 0, 0, .5);

  img { display: block; width: 100%; height: auto; }
`;

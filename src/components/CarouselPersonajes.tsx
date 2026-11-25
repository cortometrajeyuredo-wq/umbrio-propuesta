import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { personajes } from "../data/personajesData";

// Borde del círculo activo: rota entre los colores de la paleta, no siempre dorado.
const tonos = ["var(--gold)", "var(--cyan)", "var(--violet)"];

export const CarouselPersonajes = () => {
  const [activo, setActivo] = useState(0);
  const personaje = personajes[activo];
  const tono = tonos[activo % tonos.length];

  return (
    <CarouselLayout>
      <ButtonContainer role="group" aria-label="Elegir personaje">
        {personajes.map((p, i) => (
          <Button
            key={p.nombre}
            type="button"
            aria-label={`Ver personaje ${p.nombre}`}
            aria-pressed={i === activo}
            $activo={i === activo}
            $tono={tonos[i % tonos.length]}
            onClick={() => setActivo(i)}
            $img={p.miniatura}
          />
        ))}
      </ButtonContainer>
      <ContentContainer key={activo}>
        <Description $tono={tono}>
          <div>
            <h3>{personaje.nombre}</h3>
            <p>{personaje.descripcion}</p>
          </div>
        </Description>
        <ArtStage>
          <Image src={personaje.personajeGrande} alt={`${personaje.tipoArte === "3D" ? "Render 3D" : "Ilustración 2D"} de ${personaje.nombre}`} width={720} height={720} />
        </ArtStage>
      </ContentContainer>
    </CarouselLayout>
  );
};

const copyReveal = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const artReveal = keyframes`
  from { opacity: 0; transform: translateX(28px) scale(.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
`;

const CarouselLayout = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(10px, 1.4vw, 18px);
  justify-content: center;
  align-items: center;
  max-width: calc(100vw - 2 * var(--lsc-reserve));
  margin: clamp(14px, 2.5vh, 26px) auto;
`;

const Button = styled.button<{ $activo: boolean; $img: string; $tono: string }>`
  position: relative;
  width: 64px;
  height: 64px;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ $activo, $tono }) => ($activo ? `4px solid ${$tono}` : "2px solid var(--lavender)")};
  background: var(--indigo) url(${({ $img }) => $img}) center / cover no-repeat;
  transition: transform .25s ease, border-color .25s ease;

  @media (min-width: 1024px) {
    width: clamp(72px, min(7vw, 11vh), 108px);
    height: clamp(72px, min(7vw, 11vh), 108px);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${({ $activo }) => ($activo ? "transparent" : "rgba(0, 0, 0, .3)")};
    transition: background-color .25s ease;
  }

  &:hover { transform: translateY(-3px); }
  &:hover::before { background-color: transparent; }
  &:active { transform: scale(.95); }
  &:focus-visible { outline: 3px solid var(--cyan); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr);
  align-items: center;
  gap: clamp(20px, 3vw, 48px);
  width: 100%;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Description = styled.div<{ $tono: string }>`
  grid-column: 2;
  grid-row: 1;
  animation: ${copyReveal} .45s ease-out both;

  div { max-width: 460px; }
  h3 { color: ${({ $tono }) => $tono}; font-size: clamp(1.8rem, 3vw, 2.6rem); line-height: 1.1; }
  p { margin: .7rem 0 0; font-size: clamp(1.05rem, 1.6vw, 1.3rem); line-height: 1.5; }

  @media (max-width: 760px) {
    grid-column: 1;
    grid-row: 2;
    text-align: center;
  }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const ArtStage = styled.div`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: clamp(240px, calc(100svh - 350px), 680px);

  @media (max-width: 760px) {
    height: clamp(300px, 52svh, 480px);
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${artReveal} .55s cubic-bezier(.22, 1, .36, 1) both;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { personajes } from "../data/personajesData";
import { device } from "../pantallas/breakpoints";

export const CarouselPersonajes = () => {
  const [activo, setActivo] = useState(0);

  const personaje = personajes[activo];

  return (
    <CarouselLayout>
      <ButtonContainer>
        {personajes.map((p, i) => (
          <Button
            key={p.nombre}
            type="button"
            aria-label={`Ver personaje ${p.nombre}`}
            aria-pressed={i === activo}
            $activo={i === activo}
            onClick={() => setActivo(i)}
            $img={p.miniatura}
          ></Button>
        ))}
      </ButtonContainer>
      <ContentContainer key={activo}>
        <Description>
          <div>
            <h4>{personaje.nombre}</h4>
            <p>{personaje.descripcion}</p>
          </div>
        </Description>
        <ArtStage>
          <Image src={personaje.personajeGrande} alt={`Ilustración de ${personaje.nombre}`} />
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

// :::::::::::::::: ================== :::::::::::::::
const CarouselLayout = styled.div`
  width: min(100%, 1100px);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
  position: relative;
  z-index: 200;
`;

const Button = styled.button<{ $activo: boolean; $img: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  border: ${({ $activo }) =>
    $activo ? "3px solid #f4a009" : "2px solid #9431c0"};

  cursor: pointer;
  transition: all 0.3s ease;

  background-image: url(${({ $img }) => $img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media ${device.laptop} {
    width: 80px;
    height: 80px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${({ $activo }) =>
      $activo ? "transparent" : "#00000040"};
    z-index: 10;
    transition: all 0.3s ease;
  }

  &:hover::before {
    background-color: transparent;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 430px);
  align-items: center;
  gap: clamp(20px, 5vw, 72px);
  width: 100%;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 200;
  animation: ${copyReveal} .45s ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  div {
    max-width: 440px;

    h4 {
      color: var(--accent);
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      line-height: 1.1;
    }
    p {
      margin: 10px 0 0 0;
      font-size: clamp(1rem, 1.8vw, 1.35rem);
      font-weight: 500;
      line-height: 1.5;
    }
  }

  @media (max-width: 760px) {
    text-align: center;
    min-height: 300px;
  }
`;

const ArtStage = styled.div`
  width: 100%;
  height: clamp(500px, 68vh, 680px);

  @media (max-width: 760px) {
    height: clamp(320px, 60vh, 520px);
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 50;
  animation: ${artReveal} .55s cubic-bezier(.22, 1, .36, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

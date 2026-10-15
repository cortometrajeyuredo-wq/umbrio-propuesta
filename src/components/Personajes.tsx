import styled from "styled-components";
import { CarouselPersonajes } from "./CarouselPersonajes";
//import { useMenu } from "../context/MenuContext";
import { VideoLscModal } from "./ui/VideoLscModal";
//import { BotonLsc } from "./ui/BotonLsc";
import PersonajesVideo from "../assets/videos/Personajes.mp4";
import fondo from "../assets/img/fondo2.webp";

export const Personajes = () => {
  //const { menuAbierto } = useMenu();
  return (
    <PersonajesWrapper id="Personajes" data-reveal>
      <Container>
        <Titulo>PERSONAJES</Titulo>
        <CarouselPersonajes />

        <VideoLscModal videoSrc={PersonajesVideo} />
      </Container>
    </PersonajesWrapper>
  );
};

const PersonajesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  background-image: url(${fondo});
  background-size: cover;
  background-position: top;
  /* Fondo con filtro de escala de grises */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgb(0, 0, 0),
      transparent,
      transparent
    );
  }
  /* capa degradada para las uniones de los fondops negra-transparente-negra */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgb(0, 0, 0), transparent, #000000 90%);
    z-index: 100;
  }

  /* todo el contenido por encima */
  > * {
    position: relative;
  }

  @media (max-width: 768px) {
    padding: 50px 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Titulo = styled.h2`
  position: relative;
  text-align: center;
  z-index: 200;
`;

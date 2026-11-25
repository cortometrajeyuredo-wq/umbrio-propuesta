import styled from "styled-components";
import { CarouselPersonajes } from "./CarouselPersonajes";
import { VideoLscModal } from "./ui/VideoLscModal";
import PersonajesVideo from "../assets/videos/Personajes.mp4";
import fondo from "../assets/img/fondo2.webp";

export const Personajes = () => (
  <PersonajesWrapper id="Personajes" data-reveal>
    <VideoLscModal videoSrc={PersonajesVideo} />
    <Container>
      <h2>Personajes</h2>
      <CarouselPersonajes />
    </Container>
  </PersonajesWrapper>
);

const PersonajesWrapper = styled.section`
  position: relative;
  box-sizing: border-box;
  min-height: 100svh;
  display: flex;
  @media (max-width: 1023px) { flex-direction: column; }
  align-items: center;
  justify-content: center;
  padding: clamp(3.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 3rem) clamp(2rem, 5vh, 3.5rem);
  overflow: hidden;
  isolation: isolate;
  color: var(--cream);
  background: #000 url(${fondo}) top / cover no-repeat;

  /* Unión con las secciones vecinas: negro arriba y abajo. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(to bottom, #000 0%, transparent 28%, transparent 72%, #000 100%);
  }

  @media (max-width: 760px) {
    padding-top: 150px;
  }
`;

const Container = styled.div`
  width: min(100%, 1250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 { margin: 0; }
`;

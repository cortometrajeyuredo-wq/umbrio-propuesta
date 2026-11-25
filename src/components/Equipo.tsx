import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

import { teamMembers } from "../data/equipoData";
import { VideoLscModal } from "./ui/VideoLscModal";
import equipoLsc from "../assets/videos/Equipo.mp4";

const visibleCount = 4;

export const Equipo = () => {
  const [startIndex, setStartIndex] = useState(0);
  const members = Array.from({ length: visibleCount }, (_, offset) =>
    teamMembers[(startIndex + offset) % teamMembers.length],
  );

  const move = (direction: number) => {
    setStartIndex((index) => (index + direction + teamMembers.length) % teamMembers.length);
  };

  return (
    <Section id="Equipo" data-reveal>
      <VideoLscModal videoSrc={equipoLsc} />
      <Inner>
        <Intro>
          <span className="kicker">Las personas detrás de Umbrío</span>
          <h2>Equipo</h2>
          <p>Artistas, animadores y desarrolladores que dan vida a este universo.</p>
        </Intro>

        <Carousel role="region" aria-roledescription="carrusel" aria-label="Integrantes del equipo">
          <Track>
            {members.map((member, position) => (
              <Card key={member.id} $tone={(startIndex + position) % 3}>
                <Portrait>
                  <img src={member.imagen} alt="" loading="lazy" width={220} height={260} />
                </Portrait>
                <CardText>
                  <h3>{member.nombre}</h3>
                  <p>{member.rol}</p>
                  {member.link && (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" aria-label={`Ver portafolio de ${member.nombre}`}>
                      Ver portafolio
                    </a>
                  )}
                </CardText>
              </Card>
            ))}
          </Track>

          <Controls>
            <Arrow type="button" onClick={() => move(-1)} aria-label="Ver integrantes anteriores">
              <ChevronLeft aria-hidden="true" size={24} />
            </Arrow>
            <Count aria-live="polite">
              <strong>{String(startIndex + 1).padStart(2, "0")}</strong>
              <span aria-hidden="true"> / </span>
              {String(teamMembers.length).padStart(2, "0")}
            </Count>
            <Arrow type="button" onClick={() => move(1)} aria-label="Ver siguientes integrantes">
              <ChevronRight aria-hidden="true" size={24} />
            </Arrow>
          </Controls>
        </Carousel>

      </Inner>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  box-sizing: border-box;
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: clamp(4.5rem, 7vh, 6rem) 1.25rem clamp(2rem, 4vh, 3rem);
  color: var(--cream);
  background: radial-gradient(circle at 50% 8%, rgba(148, 49, 192, .22), transparent 45%), linear-gradient(180deg, #09070d, #120f2a 58%, #09070d);
`;
const Inner = styled.div`
  width: min(1320px, 100%);
  margin: auto;
`;

const Intro = styled.header`
  max-width: 700px;
  margin: 0 auto clamp(1.2rem, 2.5vh, 2.5rem);
  text-align: center;

  h2 { margin: .45rem 0 .8rem; font-size: clamp(3rem, min(8vw, 11vh), 6rem); line-height: 1; letter-spacing: .04em; }
  p { margin: 0; color: var(--cream); font-size: clamp(1.05rem, 2vw, 1.3rem); line-height: 1.55; }
`;

const Carousel = styled.div`
  width: 100%;
  margin: auto;
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(.75rem, 1.6vw, 1.25rem);

  @media (max-width: 1120px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    > :nth-child(n+4) { display: none; }
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > :nth-child(n+3) { display: none; }
  }

  @media (max-width: 540px) {
    grid-template-columns: minmax(0, 1fr);
    max-width: 390px;
    margin: auto;
    > :nth-child(n+2) { display: none; }
  }
`;

const Card = styled.article<{ $tone: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  min-height: clamp(360px, 46svh, 500px);
  padding: 1.75rem 1.25rem;
  border: 2px solid ${({ $tone }) => ["var(--lavender)", "var(--aqua)", "var(--violet)"][$tone]};
  border-radius: 5px;
  background: ${({ $tone }) => ["linear-gradient(160deg, #302d5a, #120f26)", "linear-gradient(160deg, #0b2c55, #011740)", "linear-gradient(160deg, #3c1e52, #170c24)"][$tone]};
  box-shadow: inset 0 0 0 4px #211b1a, 0 20px 35px rgba(0, 0, 0, .25);
  transition: transform .25s ease, border-color .25s ease;

  &:hover, &:focus-within { transform: translateY(-4px); border-color: var(--gold); }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const Portrait = styled.div`
  overflow: hidden;
  width: min(210px, 82%);
  aspect-ratio: 17 / 20;
  border: 3px solid var(--cream);
  border-radius: 50%;
  background: rgba(0, 0, 0, .24);

  img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 1rem .25rem 0;
  text-align: center;

  h3 { color: var(--cream); font-size: clamp(1.2rem, 2vw, 1.5rem); line-height: 1.25; text-transform: none; }
  p { margin: .55rem 0 1rem; color: var(--mauve); font-size: 1rem; line-height: 1.4; }
  a { display: inline-flex; align-items: center; min-height: 44px; margin-top: auto; color: var(--aqua-text); font-size: .95rem; letter-spacing: .04em; text-decoration: none; text-transform: uppercase; }
  a:hover, a:focus-visible { color: var(--gold); text-decoration: underline; }
  a:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: clamp(1.2rem, 3vh, 2rem);
`;

const Arrow = styled.button`
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 2px solid var(--aqua);
  border-radius: 50%;
  color: var(--cyan);
  background: transparent;

  &:hover, &:focus-visible { color: var(--navy); background: var(--cyan); }
  &:active { transform: scale(.94); }
  &:focus-visible { outline: 2px solid var(--cream); outline-offset: 3px; }
`;

const Count = styled.span`
  min-width: 5rem;
  color: var(--steel);
  font-size: 1rem;
  letter-spacing: .06em;
  text-align: center;
  strong { color: var(--cream); font-size: 1.2rem; }
`;

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
          <Eyebrow>Las personas detrás de Umbrío</Eyebrow>
          <h2>Equipo</h2>
          <p>Artistas, animadores y desarrolladores que dan vida a este universo.</p>
        </Intro>

        <Carousel role="region" aria-roledescription="carrusel" aria-label="Integrantes del equipo">
          <Track>
            {members.map((member, position) => (
              <Card key={member.id} $tone={(startIndex + position) % 3}>
                <Portrait>
                  <img src={member.imagen} alt="" loading="lazy" />
                </Portrait>
                <CardText>
                  <h3>{member.nombre}</h3>
                  <p>{member.rol}</p>
                  {member.link && (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" aria-label={`Ver portafolio de ${member.nombre}`}>
                      Ver portafolio <span aria-hidden="true">↗</span>
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
  padding: clamp(5rem, 9vw, 8rem) 1.25rem;
  color: #f6e9d2;
  background: radial-gradient(circle at 50% 8%, rgba(119, 51, 130, .28), transparent 45%), linear-gradient(180deg, #09070d, #1c0a25 58%, #09070d);
`;
const Inner = styled.div`
  max-width: 1280px;
  margin: auto;
`;

const Intro = styled.header`
  max-width: 700px;
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
  text-align: center;

  h2 { margin: .45rem 0 1rem; color: #f4a009; font-size: clamp(3.4rem, 9vw, 7rem); line-height: 1; letter-spacing: .04em; }
  p { margin: 0; color: #d5c7ca; font: clamp(1rem, 2vw, 1.2rem)/1.6 Georgia, serif; }
`;

const Eyebrow = styled.span`
  color: #78d9d6;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
`;

const Carousel = styled.div`
  max-width: 1240px;
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
  min-height: 420px;
  padding: 1.5rem 1rem;
  border: 1px solid ${({ $tone }) => ["#746259", "#426e6b", "#775579"][$tone]};
  border-radius: 5px;
  background: ${({ $tone }) => ["linear-gradient(160deg, #43382f, #19151a)", "linear-gradient(160deg, #363a38, #14191b)", "linear-gradient(160deg, #413642, #19141e)"][$tone]};
  box-shadow: inset 0 0 0 4px #211b1a, 0 20px 35px rgba(0, 0, 0, .25);
  transition: transform .25s ease, border-color .25s ease;

  &:hover, &:focus-within { transform: translateY(-4px); border-color: #f4a009; }
  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const Portrait = styled.div`
  overflow: hidden;
  width: min(170px, 80%);
  aspect-ratio: 17 / 20;
  border: 3px solid #c4a464;
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

  h3 { color: #f7e7c7; font-size: clamp(1.1rem, 2vw, 1.35rem); line-height: 1.25; text-transform: none; }
  p { margin: .55rem 0 1rem; color: #c4b9b6; font-size: .8rem; line-height: 1.4; }
  a { margin-top: auto; color: #76d9d4; font-size: .75rem; font-weight: 700; letter-spacing: .07em; text-decoration: none; text-transform: uppercase; }
  a:hover, a:focus-visible { color: #f4a009; text-decoration: underline; }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Arrow = styled.button`
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(244, 160, 9, .65);
  border-radius: 50%;
  color: #f4a009;
  background: transparent;

  &:hover, &:focus-visible { color: #120b17; background: #f4a009; }
  &:focus-visible { outline: 2px solid #76d9d4; outline-offset: 3px; }
`;

const Count = styled.span`
  min-width: 5rem;
  color: #aa9aa2;
  font-size: .85rem;
  letter-spacing: .13em;
  text-align: center;
  strong { color: #f6e9d2; font-size: 1.15rem; }
`;

import { useState } from "react";
import styled from "styled-components";

const team = [
  ["Ivonne Espíndola", "Project Lead · Instructora de Animación"], ["Leonardo Huertas", "Instructor de Animación"], ["Eddy Camacho", "Coordinador académico"], ["Marquiño", "Full Stack"], ["Faizule Perez", "Web & Multimedia Developer"], ["Jose Alejandro", "Web & Multimedia Developer"], ["JhonGe", "Developer Full-Stack & Data-Driven"], ["Dayanna Saavedra", "Web & Multimedia Developer"], ["Ana María Janer", "Animadora 3D"], ["Andrés Cardona", "Integrante del equipo"], ["Adriana Acosta", "Integrante del equipo"], ["Angie Alejandra", "Artista conceptual"], ["Carlos Gustavo", "Game Dev & Sound Design"], ["Ángela Rocio", "Animadora 3D"], ["CrisFer", "Desarrollador de experiencias XR"], ["Dania Stefania", "Animadora 3D"], ["CarMan", "Desarrollador de experiencias XR"], ["Edi Sánchez", "Animador 3D"], ["Edwin Triviño", "Animador 3D"], ["Laura Daniela", "Ilustradora"], ["Felipe Franco", "Animación 3D"], ["Juliana Sánchez", "Integrante del equipo"], ["Estefanía Melo", "Animadora 3D"], ["Luis Cruz", "Animador 3D & auxiliar de auditoría"], ["LuiFer", "Desarrollo publicitario"], ["Karol Yuliana", "Desarrollo publicitario & agroindustria alimentaria"], ["Mathias Daniel", "Contador público & animador digital"], ["Matiw Quintero", "3D Artist"], ["Majo", "Web & Multimedia Developer"], ["Sally Fonseca", "Integrante del equipo"], ["Angel Nicolás", "Animador 3D"], ["Royber Pacheco", "Integrante del equipo"], ["Sharyck Sofía", "Web & Multimedia Developer"], ["Silvia Marcela", "Ing. multimedia & animadora 3D"], ["Sandra Elizabeth", "Ing. sistemas & animadora 3D"], ["Yaizel Melenje", "Creadora de mundos 3D · Ilustradora"], ["Yeidy Paola", "Diseñadora gráfica & visual"], ["Valentina Ochoa", "Ilustradora"], ["Cristian Perez", "Web & Multimedia Developer"], ["Yeisson Agudelo", "Web & Multimedia Developer"], ["Leonardo Vergel", "Animador 3D"], ["Melissa Yepes", "Psicóloga & animadora digital"], ["Nicolas Santiago", "Animación 3D"], ["Nicolas Felipe", "Animación 3D"], ["Yudi Fernanda", "Ing. agroindustrial & desarrollador publicitario"], ["Ana Cristina", "Técnica en secretariado & ADS"], ["Yudis Sanchez", "Web & Multimedia Developer"],
] as const;

export const Equipo = () => {
  const [showAll, setShowAll] = useState(false);
  const members = showAll ? team : team.slice(0, 12);

  return <Section id="Equipo" data-reveal>
    <header><span>Quienes hicieron posible la leyenda</span><h2>Equipo creativo</h2><p>Un proyecto construido por artistas, desarrolladores, animadores y narradores.</p></header>
    <Grid>{members.map(([name, role]) => <Member key={name}><strong>{name}</strong><span>{role}</span></Member>)}</Grid>
    <MoreButton type="button" aria-expanded={showAll} onClick={() => setShowAll((value) => !value)}>{showAll ? "Ver menos" : `Ver equipo completo (${team.length})`}</MoreButton>
  </Section>;
};

const Section = styled.section`
  padding: clamp(4rem, 9vw, 7rem) 1.25rem; color: #f6e9c7; background: radial-gradient(circle at 50% 0, rgba(16,217,222,.14), transparent 35%), #080c10;
  header { max-width: 670px; margin: 0 auto 2.5rem; text-align: center; }
  header > span { color: #10d9de; font-family: var(--heading); font-size: .78rem; letter-spacing: .13em; text-transform: uppercase; }
  h2 { margin-top: .7rem; color: var(--accent); font-size: clamp(2.4rem, 6vw, 4.4rem); }
  p { margin: 1rem 0 0; line-height: 1.55; }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1px; max-width: 1120px; margin: 0 auto; border: 1px solid rgba(16,217,222,.22); background: rgba(16,217,222,.22);
`;
const Member = styled.article`
  min-height: 115px; padding: 1.1rem; display: grid; align-content: center; gap: .45rem; background: #0b1315;
  strong { color: #f6e9c7; font-family: var(--heading); font-size: 1.05rem; } span { color: rgba(246,233,199,.68); font-size: .82rem; line-height: 1.4; }
`;
const MoreButton = styled.button`
  display: block; margin: 2rem auto 0; padding: .8rem 1.25rem; border: 1px solid #10d9de; border-radius: 999px; color: #10d9de; background: transparent; font-family: var(--heading); transition: background .2s ease, color .2s ease;
  &:hover, &:focus-visible { color: #071213; background: #10d9de; }
`;

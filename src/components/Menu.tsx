import { useState } from "react";
import styled from "styled-components";

import brujula from "../assets/img/brujula.webp";
import umbrioLogo from "../assets/brand/umbrio-logo.png";
import { useActiveSection } from "../hooks/useActiveSection";

const menuItems = [["Home", "#home"], ["Umbrío", "#Corto"], ["Juego", "#Juego"], ["Locaciones", "#Locaciones"], ["Personajes", "#Personajes"], ["Making", "#Making"]] as const;
const sectionIds = menuItems.map(([, href]) => href.slice(1));

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  return <MobileMenuContainer>
    <MobileBrand href="#home" aria-label="Ir al inicio de Umbrío"><img src={umbrioLogo} alt="Umbrío" /></MobileBrand>
    <MobileMenuWrapper $open={open}><ul>{menuItems.map(([label, href]) => <li key={href}><a href={href} aria-current={activeSection === href.slice(1) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</a></li>)}</ul></MobileMenuWrapper>
    <MenuButtonWrapper type="button" aria-label="Abrir menú" onClick={() => setOpen((isOpen) => !isOpen)}><img src={brujula} alt="" /></MenuButtonWrapper>
  </MobileMenuContainer>;
};

const DesktopMenu = () => {
  const activeSection = useActiveSection(sectionIds);
  const renderLink = ([label, href]: (typeof menuItems)[number]) => <li key={href}><a href={href} aria-current={activeSection === href.slice(1) ? "page" : undefined}>{label}</a></li>;

  return <DesktopMenuWrapper>
  <DesktopLinks>{menuItems.slice(0, 3).map(renderLink)}</DesktopLinks>
  <DesktopBrand href="#home" aria-label="Ir al inicio de Umbrío"><img src={umbrioLogo} alt="Umbrío" /></DesktopBrand>
  <DesktopLinks $align="end">{menuItems.slice(3).map(renderLink)}</DesktopLinks>
</DesktopMenuWrapper>;
};

export const Menu = () => <><DesktopMenu /><MobileMenu /></>;

const MobileMenuContainer = styled.div`
  display: none;
  @media (max-width: 639px) { display: block; }
`;

const MobileBrand = styled.a`
  position: fixed; top: 10px; left: 14px; z-index: 1100; width: 72px;
  img { display: block; width: 100%; height: auto; }
`;

const MobileMenuWrapper = styled.nav<{ $open: boolean }>`
  position: fixed; inset: 0; width: 100%; height: 100vh; padding: 104px 32px 32px;
  background-color: var(--soft-bg); backdrop-filter: blur(12px); z-index: 1000;
  transform: translateX(${(props) => props.$open ? "0" : "100%"}); opacity: ${(props) => props.$open ? 1 : 0}; pointer-events: ${(props) => props.$open ? "auto" : "none"};
  transition: transform .5s cubic-bezier(.77, 0, .175, 1), opacity .3s ease;
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 22px; }
  a { color: #f6e9c7; font-family: var(--heading); font-size: 1.55rem; text-decoration: none; }
`;

const MenuButtonWrapper = styled.button`
  position: fixed; top: 14px; right: 14px; z-index: 1100; width: 50px; height: 50px; padding: 0; overflow: hidden; border: 0; background: transparent; cursor: pointer;
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
  &:hover img { transform: rotate(20deg) scale(1.1); } &:active img { transform: scale(.9); }
`;

const DesktopMenuWrapper = styled.nav`
  position: absolute; top: 16px; left: 50%; z-index: 1200; width: min(1120px, calc(100% - 32px)); min-height: 92px; padding: 8px 30px;
  transform: translateX(-50%); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  a { position: relative; color: #f6e9c7; font-family: var(--heading); font-size: clamp(.86rem, 1.4vw, 1.1rem); font-weight: 400; letter-spacing: 1px; text-decoration: none; transition: color .3s ease; }
  a:hover, a[aria-current="page"] { color: var(--accent); } a::after { content: ""; position: absolute; left: 0; bottom: -5px; width: 0; height: 2px; background: var(--accent); transition: width .3s ease; } a:hover::after, a[aria-current="page"]::after { width: 100%; }
  @media (max-width: 639px) { display: none; }
`;

const DesktopLinks = styled.ul<{ $align?: "end" }>`
  display: flex; align-items: center; justify-content: ${(props) => props.$align === "end" ? "flex-end" : "flex-start"}; gap: clamp(14px, 2.3vw, 30px); list-style: none; margin: 0; padding: 0;
`;

const DesktopBrand = styled.a`
  display: block; width: 106px; line-height: 0; transition: transform 180ms ease;
  img { display: block; width: 100%; height: auto; }
  &:hover { transform: rotate(-2deg) scale(1.05); }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 8px; }
`;

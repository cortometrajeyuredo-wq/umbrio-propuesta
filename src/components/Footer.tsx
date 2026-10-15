import styled from "styled-components";
import umbrioLogo from "../assets/brand/umbrio-logo.png";
import senaLogo from "../assets/brand/logo-sena.webp";
import colombiaMagicaLogo from "../assets/brand/logo-colombia-magica.webp";

export const Footer = () => {
  return (
    <FooterSection data-reveal>
      <FooterGlow aria-hidden="true" />
      <FooterInner>
        <BrandIntro>
          <img src={umbrioLogo} alt="Umbrío" />
          <p>El misterio ancestral de Tunja.</p>
        </BrandIntro>

        <Partners aria-label="Aliados del proyecto">
          <Partner>
            <span>Una producción de</span>
            <img src={colombiaMagicaLogo} alt="Colombia Mágica" />
          </Partner>
          <Divider aria-hidden="true" />
          <Partner>
            <span>Con el apoyo de</span>
            <img src={senaLogo} alt="SENA" />
          </Partner>
        </Partners>
      </FooterInner>
      <Copyright>© {new Date().getFullYear()} Umbrío. Todos los derechos reservados.</Copyright>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  position: relative;
  overflow: hidden;
  padding: 2.5rem 1.25rem 1.1rem;
  color: #f6e9c7;
  background: #09030d;
  border-top: 1px solid rgba(248, 163, 8, 0.45);
`;

const FooterGlow = styled.div`
  position: absolute;
  width: 34rem;
  height: 12rem;
  top: -9rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(ellipse, rgba(0, 221, 220, 0.18), transparent 68%);
`;

const FooterInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 720px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const BrandIntro = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 88px;
    height: 88px;
    object-fit: contain;
  }

  p {
    max-width: 180px;
    margin: 0;
    color: rgba(246, 233, 199, 0.85);
    font-family: var(--heading);
    font-size: 0.9rem;
    line-height: 1.45;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Partners = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.4rem);

  @media (max-width: 520px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const Partner = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.55rem;

  span {
    color: var(--accent);
    font-family: var(--heading);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  img {
    display: block;
    max-width: 145px;
    height: 44px;
    object-fit: contain;
  }

  &:last-child img {
    max-width: 96px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 58px;
  background: linear-gradient(transparent, rgba(246, 233, 199, 0.65), transparent);

  @media (max-width: 520px) {
    width: 82px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(246, 233, 199, 0.65), transparent);
  }
`;

const Copyright = styled.p`
  position: relative;
  z-index: 1;
  margin: 2rem 0 0;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(246, 233, 199, 0.15);
  color: rgba(246, 233, 199, 0.56);
  font-size: 0.72rem;
  text-align: center;
`;

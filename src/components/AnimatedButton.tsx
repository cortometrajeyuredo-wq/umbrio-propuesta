import styled from "styled-components";
import { useEffect, useState } from "react";

export const AnimatedButton = ({ label1, label2, label3, $absolute=false }: { label1: string; label2: string; label3?: string; $absolute?: boolean }) => {

    const [particles, setParticles] = useState<
        {
            size: number;
            startX: number;
            startY: number;
            moveX: number;
            moveY: number;
            duration: number;
            delay: number;
        }[]
    >([]);

    useEffect(() => {
        const data = Array.from({ length: 25 }).map(() => ({
            size: Math.random() * 4 + 2,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            moveX: (Math.random() - 0.5) * 100,
            moveY: (Math.random() - 0.5) * 100,
            duration: Math.random() * 10 + 6,
            delay: Math.random() * 5,
        }));

        const frame = requestAnimationFrame(() => setParticles(data));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
         <DownloadWrapperButton $absolute={$absolute}>
            <div>
                {label1} <br />
                <span>{label2}</span>
            </div>
            {label3 && <div>{label3}</div>}

            <div className="particles">
                <div className="particles">
                    {particles.map((p, i) => (
                        <Particle
                            key={i}
                            style={
                                {
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                    left: `${p.startX}%`,
                                    top: `${p.startY * -1}px`,
                                    "--moveX": `${p.moveX}px`,
                                    "--moveY": `${p.moveY}px`,
                                    animationDuration: `${p.duration}s`,
                                    animationDelay: `${p.delay}s`,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>
            </div>
            <div className="scan" />
        </DownloadWrapperButton>
    )
}

const DownloadWrapperButton = styled.button<{ $absolute?: boolean }>`
    position: ${({ $absolute }) => ($absolute ? "absolute" : "relative")};
    bottom: ${({ $absolute }) => ($absolute ? "40px" : "auto")};
    left: ${({ $absolute }) => ($absolute ? "50%" : "auto")};
    transform: ${({ $absolute }) =>
        $absolute ? "translateX(-50%)" : "none"};
    
    width: 260px;
    z-index: 500;
    padding: 22px;
    border-radius: 32px;
    border: none;
    cursor: pointer;
    overflow: hidden;
  
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 6px;

  /* =========================
TEXTO
  ========================== */
  > div {
    position: relative;
    z-index: 4;
    color: white;
    line-height: 1.2;
  }

  > div:first-child {
    font-size: 1.2rem;
  }

  > div:last-child {
    font-size: 0.9rem;
    opacity: 0.85;
  }

  span {
    display: block;
    margin-top: 4px;
    font-weight: bold;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* =========================
    FONDO ENERGÍA
  ========================== */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 32px;

    background: linear-gradient(
      120deg,
      #3a0044,
      #720d82,
      #c10dec,
      #ff2ed1,
      #720d82,
      #3a0044
    );

    background-size: 400% 400%;
    animation: energyFlow 8s ease infinite;

    z-index: 0;
  }

  @keyframes energyFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* =========================
    BORDE ENERGÉTICO
  ========================== */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 32px;
    padding: 2px;

    background: linear-gradient(
      120deg,
      transparent,
      var(--accent),
      #ffd700,
      var(--accent),
      transparent
    );

    background-size: 200% 200%;
    animation: borderEnergy 3s linear infinite;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    z-index: 2;
  }

  @keyframes borderEnergy {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }

  /* =========================
SCAN LIGHT (clave gaming)
  ========================== */
  .scan {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: skewX(-20deg);
    animation: scanMove 4s linear infinite;
    z-index: 3;
  }

  @keyframes scanMove {
    0% {
      left: -100%;
    }
    100% {
      left: 150%;
    }
  }

  /* =========================
    GLOW EXTERNO
  ========================== */
  box-shadow:
    0 0 10px rgba(248, 163, 8, 0.4),
    0 0 25px rgba(193, 13, 236, 0.3);

  /* =========================
     🖱 INTERACCIÓN
  ========================== */
  &:hover {
    transform: translateX(-50%) scale(1.07);
    box-shadow:
      0 0 20px rgba(248, 163, 8, 0.7),
      0 0 40px rgba(193, 13, 236, 0.6);
  }

  &:hover::before {
    filter: brightness(1.3);
  }

  &:hover::after {
    filter: blur(3px);
  }

  &:active {
    transform: translateX(-50%) scale(0.97);
  }

  transition: all 0.25s ease;
`;

const Particle = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;

  background: radial-gradient(circle, #ff9ff9, #ff2eef);
  border-radius: 50%;

  opacity: 0.6;
  filter: blur(0.6px);

  animation: floatRandom linear infinite;

  @keyframes floatRandom {
    0% {
      transform: translate(0, 0) scale(0.8);
      opacity: 0;
    }

    20% {
      opacity: 0.8;
    }

    100% {
      transform: translate(var(--moveX), var(--moveY)) scale(1.2);
      opacity: 0;
    }
  }
`;

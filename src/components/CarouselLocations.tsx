import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { slides } from "../data/locationsData";
import { device } from "../pantallas/breakpoints";

type Slide = {
    titulo: string;
    descripcion: string;
    imagenDesktop: string;
    imagenMobil: string;
};

type GrupoSlide = {
    titulo: string;
    antes: Slide;
    ahora: Slide;
};

const grupoSlides: GrupoSlide[] = [];

for (let i = 0; i < slides.length; i += 2) {

    grupoSlides.push({
        titulo: slides[i].titulo,
        antes: slides[i],
        ahora: slides[i + 1],
    });
}

export const CarruselLocaciones = () => {
    const [placeIndex, setPlaceIndex] = useState(0);
    const [showNow, setShowNow] = useState(false);

    const siguienteSlide = () => {
        if (!showNow) {
            setShowNow(true);
        } else {
            setShowNow(false);
            setPlaceIndex((prev) => (prev + 1) % grupoSlides.length);
        }
    };

    const anteriorSlide = () => {
        if (showNow) {
            setShowNow(false);
        } else {
            setPlaceIndex((prev) => (prev - 1 + grupoSlides.length) % grupoSlides.length);
            setShowNow(true);
        }
    };

    const currentPlace = grupoSlides[placeIndex];
    const currentSlide = showNow ? currentPlace.ahora : currentPlace.antes;

    return (

        <CarruselContenedor>
            <Slide>
                <Titulo>LOCACIONES</Titulo>
                <picture>
                    <source
                        media="(max-width: 768px)"
                        srcSet={currentSlide.imagenMobil}
                    />

                    <Imagen
                        src={currentSlide.imagenDesktop}
                        alt={currentPlace.titulo}
                    />
                </picture>
                <Overlay />

                <Controles>
                    <Flecha onClick={anteriorSlide}>❮</Flecha>
                    <Flecha onClick={siguienteSlide}>❯</Flecha>
                </Controles>

                <Contenido key={`${placeIndex}-${showNow}`}>
                    <h2>{currentPlace.titulo}</h2>
                    <p>{currentSlide.descripcion}</p>
                </Contenido>
                <Triangulos>
                    {grupoSlides.map((slide, index) => (
                        <Triangulo
                            key={index}
                            $activo={index === placeIndex}
                            $up={index % 2 !== 0}
                            $imagen={slide.antes.imagenDesktop}
                            onClick={() => {
                                setPlaceIndex(index);
                                setShowNow(false);
                            }}
                        />
                    ))}
                </Triangulos>
            </Slide>
        </CarruselContenedor>
    )
}

const CarruselContenedor = styled.section`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Titulo = styled.h1`
  position: relative;
  text-align: center;
  color: #f4a009;
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: "Amarante";
  z-index: 3;

  @media ${device.laptop} {
  position: absolute;
   font-size: 3rem;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);

}
`;

const Imagen = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
z-index: 2;
  
   @media ${device.tablet}{
   transform: none;
   }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Contenido = styled.div`
  position: absolute;
  top: 57%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 2;
  font-family: "Amarante";
  max-width: 55%;

   background: linear-gradient(
    to right,
    rgba(0,0,0,0.78),
    rgba(0,0,0,0)
  );

  h2 {
    color: #f4a009 ;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.9);
    animation: ${fadeUp} 0.6s ease forwards;
  }

  p {
    color: #f6e9c7;
    font-size: 0.95rem;
    line-height: 1.4;
     text-shadow: 2px 2px 10px rgba(0,0,0,0.9);
    opacity: 0;
    animation: ${fadeUp} 0.6s ease forwards;
    animation-delay: 0.3s;
  }
    
   @media ${device.tablet} {
    max-width: 45%;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  @media ${device.laptop} {
    max-width: 35%;

    h2 {
      font-size: 2.5rem;
}
    p {
       font-size: 1.8rem;
  }
}
`;

const Controles = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 15px;

  @media ${device.tablet} {
    bottom: 30px;
    gap: 20px;
  }
`;

const Flecha = styled.button`
  background: transparent;
  color: #f6e97c;
  border: 2px solid #f4a009;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
     background: #f4a009;
  }

  @media ${device.tablet} {
    width: 32px;
    height: 32px;
    font-size: 1.5rem;
  }

  @media ${device.laptop} {
    width: 40px;
    height: 40px;
   
  }   
`;

const Triangulos = styled.div`
  position: absolute;
  bottom: 25px;
  left: 58%;

  z-index: 3;
  display: none;

  @media ${device.laptop} {
    display: flex;
    gap: 0;
    align-items: center;
   
}
  }
`;

const Triangulo = styled.div<{
    $activo: boolean;
    $up: boolean;
    $imagen: string;
}>`
  width: 90px;
  height: 90px;
  margin-left: -18px;
  position: relative;
  overflow: hidden;

  background-image: url(${({ $imagen }) => $imagen});
  background-size: cover;
  background-position: center;

  clip-path: ${({ $up }) =>
        $up
            ? "polygon(50% 0%, 0 100%, 100% 100%)"
            : "polygon(50% 100%, 0 0, 100% 0)"};

  border: ${({ $activo }) =>
        $activo ? "3px solid #6b1fa1" : "2px solid #f4a009"};

  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.08);
  }
`;

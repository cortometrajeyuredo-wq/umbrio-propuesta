import { useState } from "react";
import styled from "styled-components";
import {CarruselLocaciones} from "../components/CarouselLocations"
import brujula from "../assets/img/brujula.webp";
import { ModalMapa } from "../components/ModalMapa";
import LocacionesVideo from "../assets/videos/Locaciones.mp4";
import { VideoLscModal } from "./ui/VideoLscModal";
//import { BotonLsc } from "./ui/BotonLsc";
//import { useMenu } from "../context/MenuContext"
import { device } from "../pantallas/breakpoints";

export const Locaciones = () => {
    const [openMapa, setOpenMapa] = useState(false);
   // const { menuAbierto } = useMenu();
   
    return (
        <CarruselContenedor id="Locaciones">
            <CarruselLocaciones />
        <VideoLscModal videoSrc={LocacionesVideo} />

           <BotonBrujula
        onClick={() => setOpenMapa(true)}
        aria-label="Abrir mapa"
      >
        <img src={brujula} alt="Brujula" />
      </BotonBrujula>

      <ModalMapa
        open={openMapa}
        onClose={() => setOpenMapa(false)}
      />
        </CarruselContenedor>
    );
};

const CarruselContenedor = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BotonBrujula = styled.button`
  position: absolute;
  bottom: 20px;   
  left: 20px;

  border: none;
  background: none;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  img {
    width: 50px;
    height: auto;

    transition: transform 0.4s ease;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }

  &:active {
    transform: scale(1.1);
  }

  @media ${device.tablet} {
    bottom: 30px;
    left: 30px;

    img {
      width: 60px;
    }
  }

  @media ${device.laptop} {
    bottom: 35px;
    left: 35px;

    img {
      width: 70px;
    }

    &:hover {
      transform: rotate(25deg) scale(1.1);
    }
  }

  @media ${device.desktop} {
    bottom: 40px;
    left: 40px;

    img {
      width: 80px;
    }
  }
`;

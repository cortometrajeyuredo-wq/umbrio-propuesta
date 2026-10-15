import styled from "styled-components";
import fondo_making from "../assets/img/fondo_making.webp"
import { VideoLscModal } from "./ui/VideoLscModal";
import MakingVideo from "../assets/videos/Making.mp4";
import MakingOffVideo from "../assets/videos/making_off.mp4";
import { device } from "../pantallas/breakpoints";
//import { BotonLsc } from "./ui/BotonLsc";//
//import { useMenu } from "../context/MenuContext";//


export const Making = () => {

  //const { menuAbierto } = useMenu();//
  return (
    <MakingContenedor id="Making" data-reveal>

      <Titulo>MAKING OFF</Titulo>

      <VideoContainer>
        <StyledVideo
          src={MakingOffVideo}
          autoPlay
          muted
          loop
          controls
        />
      </VideoContainer>

      <VideoLscModal videoSrc={MakingVideo} />
    </MakingContenedor>
  );
};
// Contenedor principal 
const MakingContenedor = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;

     padding: 40px 16px;

     background-image: url(${fondo_making});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;

   @media ${device.tablet} {
    padding: 60px 30px;
  }

  @media ${device.laptop} {
    padding: 80px 60px;
  }
`;

const Titulo = styled.h1`
   text-align: center;
    color: #f4a009;
    font-family: "Amarante";
    font-size: 1.8rem;
   
    margin-top: 20px;
    margin-bottom: 20px;

     @media ${device.tablet} {
      font-size: 2rem;
  }

    @media ${device.laptop} {
      font-size: 3rem;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 900px;

  height: 300px;

  margin-top: 20px;

  border-radius: 20px;

  overflow: hidden;

  background: rgba(0,0,0,0.5);

  z-index: 1;

  @media ${device.tablet} {
    height: 450px;
  }

  @media ${device.laptop} {
    height: 550px;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

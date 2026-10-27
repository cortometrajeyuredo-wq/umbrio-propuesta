import styled from "styled-components";
import biblioteca from "../assets/production/comp_biblioteca.jpeg";
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
      <ArchiveLink href="/preproduccion/">Explorar la preproducción <span aria-hidden="true">↗</span></ArchiveLink>
    </MakingContenedor>
  );
};
// Contenedor principal 
const MakingContenedor = styled.section`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;

     padding: 40px 16px;

     background-image: linear-gradient(
       to bottom,
       #000 0%,
       rgba(0, 0, 0, 0.48) 24%,
       rgba(0, 0, 0, 0.56) 72%,
       #000 100%
     ), url(${biblioteca});
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

const ArchiveLink = styled.a`
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: .7rem;
  margin-top: 2.5rem;
  padding: .85rem 1.4rem;
  border: 1px solid #f4a009;
  border-radius: 4px;
  color: #f6e9d2;
  background: linear-gradient(135deg, #3d352e, #211b23);
  box-shadow: inset 0 0 0 3px #241c1a, 5px 6px 0 #09070d;
  font-family: var(--heading);
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-decoration: none;
  transition: background .2s ease, transform .2s ease;

  &:hover { background: #5b3106; transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid #f4a009; outline-offset: 4px; }
`;

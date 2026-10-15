import styled from "styled-components";
import fondo from "../assets/img/fondo.webp"
import play from "../assets/img/playbutton.webp"
import trailer from "../assets/img/fondoCorto.webp"
import { AnimatedButton } from "./AnimatedButton";


export const Cortometraje = () => {
  return (
    <CortoWrapper id="Corto" data-reveal>
      {/* Se coloca la capa de contenido para que quede por encima del fondo degradado  y el filtro gris */}
      <Container>

        <h2>Cortometraje</h2>
        <TrailerWrapper>
          <Play src={play} alt="Niebla" />

        </TrailerWrapper>
        <StoryText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam modi rerum error ea deserunt numquam, qui nulla commodi quaerat, ipsum exercitationem. Deserunt mollitia ipsum quas consequuntur sit asperiores, nostrum maxime.


        </StoryText>
        <AnimatedButton label1="Ver cortometraje" label2="Completo" $absolute={false} />
      </Container>
    </CortoWrapper>
  )
}


const CortoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  background-color:red;
  /* Fondo con filtro de escala de grises */
    &::before {
    content: "";
    position: absolute;
    inset: 0;

   background-image: url(${fondo});
    background-size: cover;
    background-position: top;

    filter: grayscale(100%); 

    z-index: 0;
  }
  /* capa degradada para las uniones de los fondops negra-transparente-negra */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgb(0, 0, 0), transparent, rgb(0, 0, 0) );
      z-index: 10;
    }

  /* todo el contenido por encima */
  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 50px 10px;
  }
`;

const Container = styled.div`
position: relative;
width: 100%;
height: 100%;
z-index: 100;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const TrailerWrapper = styled.div`
  margin-top: 40px;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 10 / 6;
  background: url(${trailer}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  
`;

const Play = styled.img`
  width: 250px;
 aspect-ratio: 1 / 1;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const StoryText = styled.p`
  margin-top: 30px;
  width: 90%;
  max-width: 800px;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;





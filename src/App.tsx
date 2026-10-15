import { Hero } from "./components/Hero";
import { Cortometraje } from "./components/Cortometraje";
import {Personajes}from "./components/Personajes";
import { Videojuego } from "./components/Videojuego";
import { Making} from "./components/Making";
import { Locaciones } from "./components/Locations"
import { Footer } from "./components/Footer";
import { useSectionReveal } from "./hooks/useSectionReveal";
import { CustomCursor } from "./components/CustomCursor";


const App = () => {
  useSectionReveal();

  return (
    <>
      <CustomCursor />
      <Hero />
      <Cortometraje />
      <Videojuego />
      <Personajes/>
      <Making/>
     
      <Locaciones />
      <Footer />
    </>
  );
};

export default App;

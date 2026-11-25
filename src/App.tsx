import { Hero } from "./components/Hero";
import { Cortometraje } from "./components/Cortometraje";
import { Personajes } from "./components/Personajes";
import { Videojuego } from "./components/Videojuego";
import { Making } from "./components/Making";
import { Locaciones } from "./components/Locations";
import { Footer } from "./components/Footer";
import { Artbook } from "./components/Artbook";
import { Equipo } from "./components/Equipo";
import { useSectionReveal } from "./hooks/useSectionReveal";
import { useHashScroll } from "./hooks/useHashScroll";
import { CustomCursor } from "./components/CustomCursor";
import { BackToTop } from "./components/BackToTop";

// El orden de las secciones sigue el orden del menú.
const App = () => {
  useSectionReveal();
  useHashScroll();

  return (
    <>
      <CustomCursor />
      <BackToTop />
      <Hero />
      <Cortometraje />
      <Videojuego />
      <Locaciones />
      <Personajes />
      <Making />
      <Artbook />
      <Equipo />
      <Footer />
    </>
  );
};

export default App;

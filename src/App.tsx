import { Hero } from "./components/Hero";
import { Cortometraje } from "./components/Cortometraje";
import {Personajes}from "./components/Personajes";
import { Videojuego } from "./components/Videojuego";
import { Making} from "./components/Making";
import { Locaciones } from "./components/Locations"


const App = () => {
  return (
    <>
      <Hero />
      <Cortometraje />
      <Videojuego />
      <Personajes/>
      <Making/>
     
      <Locaciones />
    </>
  );
};

export default App;
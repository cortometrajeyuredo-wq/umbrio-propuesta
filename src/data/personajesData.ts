import perro3d from "../assets/personajes/perro_1.webp";
import perro2d from "../assets/personajes/perro_2d.png";
import noah3d from "../assets/production/comp_noah.png";
import noah2d from "../assets/personajes/Noah.webp";
import mano2d from "../assets/personajes/manopeluda_colorscript.jpg";
import manoMini from "../assets/personajes/mano2.png";
import manosPared2d from "../assets/personajes/manospared_colorscript.jpg";
import espanto3d from "../assets/production/comp_espanto.png";
import espanto2d from "../assets/personajes/Espanto.webp";
import sombreron3d from "../assets/personajes/sombreron-render-transparent.png";
import sombreron2d from "../assets/personajes/sombreron.webp";
import simon3d from "../assets/production/comp_simon.png";
import simon2d from "../assets/personajes/simon.webp";

export interface Personaje {
  nombre: string;
  descripcion: string;
  personajeGrande: string;
  miniatura: string;
  tipoArte: "2D" | "3D";
}

export const personajes: Personaje[] = [
  {
    nombre: "NOAH",
    descripcion: "Noah sigue las pistas de una Tunja donde los lugares conocidos parecen esconder otra historia. Su curiosidad lo acerca a las leyendas que Umbrío vuelve visibles.",
    personajeGrande: noah3d,
    miniatura: noah2d,
    tipoArte: "3D",
  },
  {
    nombre: "SIMÓN",
    descripcion: "Simón acompaña la exploración del universo de Umbrío. Junto a Noah, descubre fragmentos del pasado y se enfrenta a las apariciones que habitan los relatos de Tunja.",
    personajeGrande: simon3d,
    miniatura: simon2d,
    tipoArte: "3D",
  },
  {
    nombre: "EL SOMBRERÓN",
    descripcion: "El Sombrerón es una de las figuras que emergen de las leyendas locales. Su silueta y su sombrero anuncian que la noche de Tunja guarda más de lo que muestra.",
    personajeGrande: sombreron3d,
    miniatura: sombreron2d,
    tipoArte: "3D",
  },
  {
    nombre: "MANO PELUDA",
    descripcion: "La Mano Peluda pertenece al lado inquietante de este universo. Aparece entre pistas y sombras como un recordatorio de que no todo misterio quiere ser descubierto.",
    personajeGrande: mano2d,
    miniatura: manoMini,
    tipoArte: "2D",
  },
  {
    nombre: "MANOS DE LA PARED",
    descripcion: "Las manos que emergen de los muros forman parte de las presencias que acompañan la exploración de Umbrío.",
    personajeGrande: manosPared2d,
    miniatura: manosPared2d,
    tipoArte: "2D",
  },
  {
    nombre: "PERRO DE SAN FRANCISCO",
    descripcion: "El Perro de San Francisco conecta una historia transmitida de generación en generación con un lugar reconocible de la ciudad. En Umbrío, la memoria del sitio toma forma.",
    personajeGrande: perro3d,
    miniatura: perro2d,
    tipoArte: "3D",
  },
  {
    nombre: "ESPANTO DEL PANÓPTICO",
    descripcion: "El Espanto del Panóptico evoca las capas de historia de San Agustín: convento, hospital y cárcel. Una presencia nacida de los relatos que aún rodean sus muros.",
    personajeGrande: espanto3d,
    miniatura: espanto2d,
    tipoArte: "3D",
  },
];

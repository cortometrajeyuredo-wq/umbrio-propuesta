import perro from "../assets/personajes/perro_1.webp";
import perroMini from "../assets/personajes/perro_2d.png";
import noah from "../assets/production/comp_noah.png";
import noahMini from "../assets/personajes/Noah.webp";
import mano from "../assets/personajes/mano_2d.png";
import manoMini from "../assets/personajes/mano2.png";
import espanto from "../assets/production/comp_espanto.png";
import espantoMini from "../assets/personajes/Espanto.webp"
import sombreron from "../assets/personajes/sombreron2.png";
import sombreronMini from "../assets/personajes/sombreron.webp"
import simon from "../assets/production/comp_simon.png";
import simonMini from "../assets/personajes/simon.webp";


export const personajes = [
  {
    nombre: "NOAH",
    descripcion: "Noah sigue las pistas de una Tunja donde los lugares conocidos parecen esconder otra historia. Su curiosidad lo acerca a las leyendas que Umbrío vuelve visibles.",
    personajeGrande: noah,
    miniatura: noahMini,
  },
  {
    nombre: "SIMON",
    descripcion: "Simón acompaña la exploración del universo de Umbrío. Junto a Noah, descubre fragmentos del pasado y se enfrenta a las apariciones que habitan los relatos de Tunja.",
    personajeGrande:simon,
    miniatura:simonMini ,
  },
  {
    nombre: "EL SOMBRERÓN",
    descripcion: "El Sombrerón es una de las figuras que emergen de las leyendas locales. Su silueta y su sombrero anuncian que la noche de Tunja guarda más de lo que muestra.",
    personajeGrande: sombreron,
    miniatura: sombreronMini,
  },
  {
    nombre: "MANO PELUDA",
    descripcion: "La Mano Peluda pertenece al lado inquietante de este universo. Aparece entre pistas y sombras como un recordatorio de que no todo misterio quiere ser descubierto.",
    personajeGrande: mano,
    miniatura:manoMini ,
  },
  {
   nombre: "PERRO DE SAN FRANCISCO",
    descripcion: "El Perro de San Francisco conecta una historia transmitida de generación en generación con un lugar reconocible de la ciudad. En Umbrío, la memoria del sitio toma forma.",
    personajeGrande:perro,
    miniatura: perroMini,
  },
  {
    nombre: "ESPANTO DEL PANÓPTICO",
    descripcion: "El Espanto del Panóptico evoca las capas de historia de San Agustín: convento, hospital y cárcel. Una presencia nacida de los relatos que aún rodean sus muros.",
    personajeGrande: espanto,
    miniatura:espantoMini,
  }
];

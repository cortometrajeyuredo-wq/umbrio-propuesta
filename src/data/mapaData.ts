import catedral from "../assets/img-tunja/CatedralAhora.webp";
import cojines from "../assets/img-tunja/CojinesdelZaqueAhora.webp";
import agustin from "../assets/img-tunja/SanAgustìnAhora.webp";
import biblioteca from "../assets/img-tunja/Biblioteca.webp";

export interface Lugar {
  id: number;
  nombre: string;
  imagen: string;
  top: string;
  left: string;
}

export const lugares: Lugar[] = [
  {
    id: 1,
    nombre: "Catedral de Tunja",
    imagen: catedral,
    top: "15%",
    left: "42%",
  },
  {
    id: 2,
    nombre: "Cojines del Zaque",
    imagen: cojines,
    top: "57%",
    left: "68%",
  },
  {
    id:3,
    nombre: "San Agustin",
    imagen:agustin,
    top: "35%",
    left: "40%",
  },
  {
    id: 4,
    nombre: "Biblioteca",
    imagen: biblioteca,
    top: "32%",
    left: "43%",
  },
];

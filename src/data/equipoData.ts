import Ivonne from "../assets/team/IvonneEspíndola.webp";
import Leonardo from "../assets/team/Leonardo.webp";
import Eddy from "../assets/team/Hombre.webp";
import Marco from "../assets/team/marquiño.webp";
import Fay from "../assets/team/Faizule.webp";
import Jose from "../assets/team/jose-alejandro.webp";
import Jhon from "../assets/team/jhonge16.webp";
import Dayis from "../assets/team/Dayis.webp";
import Ana from "../assets/team/Ana.webp";
import Andres from "../assets/team/Andrés.webp";
import Adriana from "../assets/team/Adriana.webp";
import Angie from "../assets/team/Angie.webp";
import Carlos from "../assets/team/Carlos.webp";
import Angela from "../assets/team/Angela.webp";
import Cristian from "../assets/team/CristianCharris.webp";
import Dania from "../assets/team/DaniaMoncada.webp";
import CarMan from "../assets/team/CarlosMancera.webp";
import Edi from "../assets/team/EdiSánchez.webp";
import Edwin from "../assets/team/EdwinTriviño.webp";
import Laura from "../assets/team/DanielaMediorreal.webp";
import Felipe from "../assets/team/FelipeFranco.webp";
import Juliana from "../assets/team/JulianaSánchez.webp";
import Estefania from "../assets/team/EstefaníaMelo.webp";
import LuisCruz from "../assets/team/LuisCruz.webp";
import LuisFernando from "../assets/team/LuisFernando.webp";
import Karol from "../assets/team/KarolCharry.webp";
import Mathias from "../assets/team/MathiasPedraza.webp";
import Matiw from "../assets/team/MatiusQuintero.webp";
import Majo from "../assets/team/MaríaJosé.webp";
import Sally from "../assets/team/SallyFonseca.webp";
import AngelNicolas from "../assets/team/NicolásRocha.webp";
import Royber from "../assets/team/RoyberPacheco.webp";
import Sharyck from "../assets/team/Sharyck.webp";
import Silvia from "../assets/team/SilviaMora.webp";
import Sandra from "../assets/team/SandraElizabeth.webp";
import Yaizel from "../assets/team/YaizelMelenje.webp";
import Yeidy from "../assets/team/YeidyMontoya.webp";
import Valentina from "../assets/team/ValentinaOchoa.webp";
import CristianPerez from "../assets/team/CristianPerez.webp";
import Yession from "../assets/team/YeissonAgudelo.webp";
import LeonardoVergel from "../assets/team/leonardo-vergel.webp";
import Melissa from "../assets/team/Mujer.webp";
import NicolasSantiago from "../assets/team/nicolas.webp";
import NicolasFelipe from "../assets/team/Hombre.webp";
import Yudi from "../assets/team/YudiFernanda.webp";
import AnaCristina from "../assets/team/CristinaJave.webp";
import YudisSanchez from "../assets/team/YudisMartinez.webp";

export interface TeamMember {
  id: number;
  nombre: string;
  rol: string;
  imagen: string;
  link?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nombre: "Ivonne Espíndola",
    rol: "Project Lead / Instructor de Animación",
    imagen: Ivonne,
  },
  {
    id: 2,
    nombre: "Leonardo Huertas",
    rol: "Instructor de Animación",
    imagen: Leonardo,
  },
  {
    id: 3,
    nombre: "Eddy Camacho",
    rol: "Coordinator Académico",
    imagen: Eddy,
  },
  {
    id: 4,
    nombre: "Marquiño",
    rol: "Full Stack",
    imagen: Marco,
    link: "https://marcofernandez.netlify.app/"
  },
  {
    id: 5,
    nombre: "Faizule Perez",
    rol: "Web & Multimedia Developer",
    imagen: Fay,
  },
  {
    id: 6,
    nombre: "Jose Alejandro",
    rol: "Web & Multimedia Developer",
    imagen: Jose,
  },
  {
    id: 7,
    nombre: "JhonGe",
    rol: "Developer Full-Stack & Data-Driven",
    imagen: Jhon,
    link: "https://www.jhonge.com.co/"
  },
  {
    id: 8,
    nombre: "Dayanna Saavedra",
    rol: "Web & Multimedia Developer",
    imagen: Dayis,
  },
  {
    id: 9,
    nombre: "Ana María Janer",
    rol: "Animadora 3D",
    imagen: Ana,
    link: "https://cara.app/artipiagui"
  },
  {
    id: 10,
    nombre: "Andrés Cardona",
    rol: "Integrante del equipo",
    imagen: Andres,
  },
  {
    id: 11,
    nombre: "Adriana Acosta",
    rol: "Integrante del equipo",
    imagen: Adriana,
  },
  {
    id: 12,
    nombre: "Angie Alejandra",
    rol: "Artista Conceptual",
    imagen: Angie,
    link: "https://www.instagram.com/alighostly?igsh=MXJxMHFoMHV5cGdyaA=="
  },
  {
    id: 13,
    nombre: "Carlos Gustavo",
    rol: "Game Dev & Sound Design",
    imagen: Carlos,
    link: "https://linktr.ee/solarstudiosfilms"
  },
  {
    id: 14,
    nombre: "Ángela Rocio",
    rol: "Animadora 3D",
    imagen: Angela,
    link: "https://acortar.link/e7ymy0"
  },
  {
    id: 15,
    nombre: "CrisFer",
    rol: "Desarrollador de Experiencias XR",
    imagen: Cristian,
  },
  {
    id: 16,
    nombre: "Dania Stefania",
    rol: "Animadora 3D",
    imagen: Dania,
  },
  {
    id: 17,
    nombre: "CarMan",
    rol: "Desarrollador de Experiencias XR",
    imagen: CarMan,
  },
  {
    id: 18,
    nombre: "Edi Sánchez",
    rol: "Animador 3D",
    imagen: Edi,
  },
  {
    id: 19,
    nombre: "Edwin Triviño",
    rol: "Animador 3D",
    imagen: Edwin,
  },
  {
    id: 20,
    nombre: "Laura Daniela",
    rol: "Ilustradora",
    imagen: Laura,
    link: "https://saturnoed.my.canva.site/"
  },
  {
    id: 21,
    nombre: "Felipe Franco",
    rol: "Animación 3D",
    imagen: Felipe,
  },
  {
    id: 22,
    nombre: "Juliana Sánchez",
    rol: "Integrante del equipo",
    imagen: Juliana,
  },
  {
    id: 23,
    nombre: "Estefanía Melo",
    rol: "Animadora 3D",
    imagen: Estefania,
  },
  {
    id: 24,
    nombre: "Luis Cruz",
    rol: "Animador 3D & Aux. de Auditoría",
    imagen: LuisCruz,
    link: "https://www.artstation.com/nomosiss92"
  },
  {
    id: 25,
    nombre: "LuiFer",
    rol: "Desarrollo Publicitario",
    imagen: LuisFernando,
    link: "https://www.behance.net/luisfecharris1"
  },
  {
    id: 26,
    nombre: "karol Yuliana",
    rol: "Desarrollo Publicitario & Agroindustria Alimentaria",
    imagen: Karol,
  },
  {
    id: 27,
    nombre: "Mathias Daniel",
    rol: "Contador Público & Animador Digital",
    imagen: Mathias,
    link: "https://www.artstation.com/mattmax0206"
  },
  {
    id: 28,
    nombre: "Matiw Quintero",
    rol: "3D Artist",
    imagen: Matiw,
    link: "https://www.instagram.com/makingarttechnology/?utm_source=ig_web_button_share_sheet"
  },
  {
    id: 29,
    nombre: "Majo",
    rol: "Web & Multimedia Developer",
    imagen: Majo,
  },
  {
    id: 30,
    nombre: "Sally Fonseca",
    rol: "Integrante del equipo",
    imagen: Sally,
  },
  {
    id: 31,
    nombre: "Angel Nicolás",
    rol: "Animador 3D",
    imagen: AngelNicolas,
    link: "https://youtu.be/qxQfYWcr2cI"
  },
  {
    id: 32,
    nombre: "Royber Pacheco",
    rol: "Integrante del equipo",
    imagen: Royber,
  },
  {
    id: 33,
    nombre: "Sharyck Sofía",
    rol: "Web & Multimedia Developer",
    imagen: Sharyck,
  },
  {
    id: 34,
    nombre: "Silvia Marcela",
    rol: "Ing. Multimedia & Animadora 3D",
    imagen: Silvia,
    link: "https://silviamoraportafolio.netlify.app/"
  },
  {
    id: 35,
    nombre: "Sandra Elizabeth",
    rol: "Ing Sistemas & Animadora 3D",
    imagen: Sandra,
  },
  {
    id: 36,
    nombre: "Yaizel Melenje",
    rol: "Creadora de mundos 3D/Ilustradora",
    imagen: Yaizel,
    link: "https://cara.app/artipiagui"
  },
  {
    id: 37,
    nombre: "Yeidy Paola",
    rol: "Diseñadora Gráfica & Visual",
    imagen: Yeidy,
    link: "https://www.behance.net/yeidymontoya/projects?fbclid=PAZXh0bgNhZW0CMTEAAaf9SWxuHr3MPJGLNIli_KMxbEXrxMVX4LOfWYM2Pt9rJzUWzNreAB44mp6-jA_aem_5OHtI_tB7f6TmbdlsX1MAQ"
  },
  {
    id: 38,
    nombre: "Valentina Ochoa",
    rol: "Ilustradora",
    imagen: Valentina,
    link: "https://www.instagram.com/von_eko/"
  },
  {
    id: 39,
    nombre: "Cristian Perez",
    rol: "Web & Multimedia Developer",
    imagen: CristianPerez,
  },
  {
    id: 40,
    nombre: "Yeisson Agudelo",
    rol: "Web & Multimedia Developer",
    imagen: Yession,
  },
  {
    id: 41,
    nombre: "Leonardo Vergel",
    rol: "Animador 3D",
    imagen: LeonardoVergel,
    link: "https://www.linkedin.com/in/leonardo-vergel-alvarez-bb6855124/"
  },
  {
    id: 42,
    nombre: "Melissa Yepes",
    rol: "Psicóloga & Animadora Digital",
    imagen: Melissa,
  },
  {
    id: 43,
    nombre: "Nicolas Santiago",
    rol: "Animación 3D",
    imagen: NicolasSantiago,
  },
  {
    id: 44,
    nombre: "Nicolas Felipe",
    rol: "Animación 3D",
    imagen: NicolasFelipe,
  },
  {
    id: 45,
    nombre: "Yudi Fernanda",
    rol: "Ing. Agroindustrial & Desarrollador Publicitario",
    imagen: Yudi,
    link: "http://www.linkedin.com/in/fernanda-triana-mora-7832a0256"
  },
  {
    id: 46,
    nombre: "Ana Cristina",
    rol: "Técnica en Secretariado & ADS",
    imagen: AnaCristina,
    link: "https://www.linkedin.com/in/ana-cristina-jave-barrera-18783a347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    id: 47,
    nombre: "Yudis Sanchez",
    rol: "Web & Multimedia Developer",
    imagen: YudisSanchez,
    link: "https://www.linkedin.com/in/yudys-martinez-101352242/"
  }
];
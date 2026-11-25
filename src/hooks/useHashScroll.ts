import { useEffect } from "react";

/*
 * Al llegar desde otra página con un ancla (/#Making, /#Artbook) el navegador
 * intenta saltar antes de que React pinte las secciones y termina en Inicio.
 * Repetimos el salto cuando la sección existe y otra vez al cargar imágenes.
 */
export const useHashScroll = () => {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const jump = () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.setAttribute("data-revealed", "");
      target.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const frame = requestAnimationFrame(jump);
    window.addEventListener("load", jump, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", jump);
    };
  }, []);
};

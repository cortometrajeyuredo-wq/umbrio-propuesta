import { useEffect } from "react";

export const useSectionReveal = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
};

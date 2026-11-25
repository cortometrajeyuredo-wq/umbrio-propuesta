import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import archive from '../data/preproduction.json';
import umbrioLogo from '../assets/brand/umbrio-logo-gold.png';
// TODO: reemplazar por el fondo con bocetos en delineado que prepara el equipo de diseño.
import texture from '../assets/img/fondotextura.webp';

type ArchiveItem = {
  id: string;
  section: string;
  title: string;
  alt: string;
};

type Enlarged = { src: string; alt: string; title: string };

const items = archive as ArchiveItem[];

// Los bocetos usan la versión solo línea (scripts/export_sketch_lines.py): sin el papel blanco del escaneo.
const imageUrl = (item: ArchiveItem, thumb: boolean) =>
  item.section === 'bocetos'
    ? `/preproduccion/${item.id}${thumb ? '-thumb' : ''}-linea.webp`
    : `/preproduccion/${item.id}${thumb ? '-thumb' : ''}.jpg`;

// Exportado con scripts/export_storyboard.py.
const STORYBOARD_PAGE_COUNT = 109;
const storyboardPages = Array.from({ length: STORYBOARD_PAGE_COUNT }, (_, index) => index + 1);
const storyboardUrl = (page: number) => `/preproduccion/storyboard/sb-${String(page).padStart(3, '0')}.webp`;

const chapters = [
  { id: 'bocetos', number: '01', title: 'Primeras formas', label: 'Bocetos', description: 'Personajes y lugares nacen del trazo antes de encontrar su forma definitiva.' },
  { id: 'concepto', number: '02', title: 'El universo toma forma', label: 'Concept art', description: 'Diseños de personajes y escenarios que definen el mundo visual de Umbrío.' },
  { id: 'iluminacion', number: '03', title: 'La luz cuenta la historia', label: 'Iluminación', description: 'Estudios de atmósfera para las locaciones que recorren la historia.' },
  { id: 'color', number: '04', title: 'La paleta del mundo', label: 'Color', description: 'La paleta de Umbrío y los colores que definen a cada personaje.' },
  { id: 'texturas', number: '05', title: 'Los detalles del mundo', label: 'Texturizado', description: 'Objetos y superficies preparados para habitar los escenarios.' },
] as const;

/* Carrete horizontal con flechas, scroll-snap, teclado y deslizamiento táctil nativo. */
const Reel = ({ label, children }: { label: string; children: ReactNode }) => {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    const element = track.current;
    if (!element) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="archive-reel" role="region" aria-roledescription="carrusel" aria-label={label}>
      <button type="button" className="archive-reel-arrow" onClick={() => scroll(-1)} aria-label={`${label}: anteriores`}>‹</button>
      <div
        className="archive-reel-track"
        ref={track}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') { event.preventDefault(); scroll(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); scroll(-1); }
        }}
      >
        {children}
      </div>
      <button type="button" className="archive-reel-arrow" onClick={() => scroll(1)} aria-label={`${label}: siguientes`}>›</button>
    </div>
  );
};

const Lightbox = ({ image, onClose }: { image: Enlarged; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="archive-lightbox" role="dialog" aria-modal="true" aria-label={image.title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <figure>
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.title}</figcaption>
      </figure>
      <button ref={closeRef} type="button" className="archive-lightbox-close" onClick={onClose} aria-label="Cerrar imagen ampliada">✕</button>
    </div>
  );
};

export const Preproduction = () => {
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);
  const [showStoryboard, setShowStoryboard] = useState(false);
  const closeLightbox = useCallback(() => setEnlarged(null), []);

  return (
    <main className="archive-page" style={{ ['--archive-texture' as string]: `url(${texture})` }}>
      <header className="archive-header">
        <a className="archive-brand" href="/#home" aria-label="Volver al inicio de Umbrío"><img src={umbrioLogo} alt="Umbrío" width={90} height={90} /><span>Archivo visual</span></a>
        <a className="archive-back" href="/#Making">Volver a Making off</a>
      </header>

      <section className="archive-hero" aria-labelledby="archive-title">
        <div className="archive-hero-art" aria-hidden="true" />
        <div className="archive-hero-copy">
          <p className="archive-kicker">El camino hasta la pantalla</p>
          <h1 id="archive-title">Antes de<br /><em>Umbrío.</em></h1>
          <p>Una mirada al proceso creativo: del primer trazo al universo visual que dio vida a nuestras leyendas.</p>
          <a href="#storyboard" className="archive-start">Comenzar el recorrido</a>
        </div>
      </section>

      <nav className="archive-chapters" aria-label="Etapas de preproducción">
        <a href="#storyboard">Storyboard</a>
        {chapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id}>{chapter.label}</a>)}
        <a href="#artbook">Artbook</a>
        <a href="/#Making" className="archive-chapters-back">Volver a Making off</a>
      </nav>

      <section className="archive-section archive-storyboard" id="storyboard" aria-labelledby="storyboard-title">
        <div className="archive-section-heading">
          <span className="archive-index">Prólogo · el relato</span>
          <h2 id="storyboard-title">Primero, la historia.</h2>
          <p>El storyboard trazó la secuencia del cortometraje, plano por plano, antes de convertirse en imágenes en movimiento.</p>
        </div>
        {showStoryboard ? (
          <>
            <Reel label="Storyboard">
              {storyboardPages.map((page) => (
                <figure className="archive-slide archive-slide-wide" key={page}>
                  <button type="button" onClick={() => setEnlarged({ src: storyboardUrl(page), alt: `Storyboard de Umbrío, página ${page}`, title: `Storyboard · página ${page} de ${STORYBOARD_PAGE_COUNT}` })} aria-label={`Ampliar storyboard, página ${page}`}>
                    <img src={storyboardUrl(page)} alt={`Storyboard de Umbrío, página ${page}`} loading="lazy" decoding="async" width={1100} height={778} />
                  </button>
                  <figcaption><span>{String(page).padStart(3, '0')}</span>de {STORYBOARD_PAGE_COUNT}</figcaption>
                </figure>
              ))}
            </Reel>
            <p className="archive-pdf"><a href="/preproduccion/storyboard-umbrio.pdf" target="_blank" rel="noopener noreferrer">Descargar el storyboard completo (PDF, 64 MB)</a></p>
          </>
        ) : (
          <div className="archive-spoiler">
            <span className="archive-spoiler-icon" aria-hidden="true">!</span>
            <div>
              <strong>Aviso de spoilers</strong>
              <p>El storyboard revela escenas y acontecimientos del cortometraje.</p>
              <button type="button" className="archive-spoiler-button" onClick={() => setShowStoryboard(true)}>Ver el storyboard</button>
            </div>
          </div>
        )}
      </section>

      {chapters.map((chapter) => (
        <section className={`archive-section archive-section-${chapter.id}`} id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-title`}>
          <div className="archive-section-heading">
            <span className="archive-index">{chapter.number} · {chapter.label}</span>
            <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
            <p>{chapter.description}</p>
          </div>
          <Reel label={chapter.label}>
            {items.filter((item) => item.section === chapter.id).map((item, index) => (
              <figure className="archive-slide" key={item.id}>
                <button type="button" onClick={() => setEnlarged({ src: imageUrl(item, false), alt: item.alt, title: item.title })} aria-label={`Ampliar: ${item.title}`}>
                  <img src={imageUrl(item, true)} alt={item.alt} loading="lazy" decoding="async" width={600} height={600} />
                </button>
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</figcaption>
              </figure>
            ))}
          </Reel>
        </section>
      ))}

      <section className="archive-outro" id="artbook" aria-labelledby="artbook-link-title">
        <span className="archive-index">Epílogo · el universo reunido</span>
        <h2 id="artbook-link-title">Todo en un libro.</h2>
        <p>El artbook reúne el arte y el proceso visual de Umbrío.</p>
        <a href="/#Artbook">Abrir el artbook</a>
      </section>

      <footer className="archive-footer"><span>Umbrío · archivo visual</span><a href="/#Making">Volver a Making off</a></footer>

      {enlarged && <Lightbox image={enlarged} onClose={closeLightbox} />}
    </main>
  );
};

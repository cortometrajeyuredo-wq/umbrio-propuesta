import archive from '../data/preproduction.json';
import umbrioLogo from '../assets/brand/umbrio-logo-gold.png';

type ArchiveItem = {
  id: string;
  section: string;
  title: string;
  alt: string;
};

const items = archive as ArchiveItem[];

const chapters = [
  { id: 'bocetos', number: '01', title: 'Primeras formas', label: 'Bocetos', description: 'Personajes y lugares nacen del trazo antes de encontrar su forma definitiva.' },
  { id: 'concepto', number: '02', title: 'El universo toma forma', label: 'Concept art', description: 'Diseños de personajes y escenarios que definen el mundo visual de Umbrío.' },
  { id: 'iluminacion', number: '03', title: 'La luz cuenta la historia', label: 'Iluminación', description: 'Estudios de atmósfera para las locaciones que recorren la historia.' },
  { id: 'color', number: '04', title: 'Una identidad de color', label: 'Color', description: 'Paletas y secuencias que dan carácter a los personajes y al relato.' },
  { id: 'texturas', number: '05', title: 'Los detalles del mundo', label: 'Texturizado', description: 'Objetos y superficies preparados para habitar los escenarios.' },
] as const;

export const Preproduction = () => (
  <main className="archive-page">
    <header className="archive-header">
      <a className="archive-brand" href="/#home" aria-label="Volver al inicio de Umbrío"><img src={umbrioLogo} alt="Umbrío" /><span>ARCHIVO VISUAL</span></a>
      <a className="archive-back" href="/#Making">← Volver a Making off</a>
    </header>

    <section className="archive-hero" aria-labelledby="archive-title">
      <div className="archive-hero-art" aria-hidden="true" />
      <div className="archive-hero-copy">
        <p className="archive-kicker">EL CAMINO HASTA LA PANTALLA</p>
        <h1 id="archive-title">Antes de<br /><em>Umbrío.</em></h1>
        <p>Una mirada al proceso creativo: del primer trazo al universo visual que dio vida a nuestras leyendas.</p>
        <a href="#storyboard" className="archive-start">Comenzar el recorrido <span aria-hidden="true">↓</span></a>
      </div>
      <div className="archive-hero-caption">ARCHIVO DE PREPRODUCCIÓN <span>·</span> TUNJA, COLOMBIA</div>
    </section>

    <nav className="archive-chapters" aria-label="Etapas de preproducción">
      <a href="#storyboard">Storyboard</a>
      {chapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id}>{chapter.label}</a>)}
      <a href="#artbook">Artbook</a>
    </nav>

    <section className="archive-intro" id="storyboard" aria-labelledby="storyboard-title">
      <div className="archive-section-heading">
        <span className="archive-index">PRÓLOGO / EL RELATO</span>
        <h2 id="storyboard-title">Primero, la historia.</h2>
      </div>
      <div className="archive-storyboard-content">
        <p>El storyboard trazó la secuencia del cortometraje antes de convertirse en imágenes en movimiento. Puedes consultar el documento completo.</p>
        <div className="archive-spoiler">
          <span className="archive-spoiler-icon" aria-hidden="true">!</span>
          <div>
            <strong>Aviso de spoilers</strong>
            <p>El storyboard revela escenas y acontecimientos del cortometraje.</p>
            <a href="/preproduccion/storyboard-umbrio.pdf" target="_blank" rel="noopener noreferrer">Abrir storyboard completo (PDF, 64 MB) ↗</a>
          </div>
        </div>
      </div>
    </section>

    {chapters.map((chapter) => (
      <section className="archive-section" id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-title`}>
        <div className="archive-section-heading">
          <span className="archive-index">{chapter.number} / {chapter.label.toUpperCase()}</span>
          <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </div>
        <div className="archive-grid">
          {items.filter((item) => item.section === chapter.id).map((item, index) => (
            <figure className={`archive-card archive-card-${index % 4}`} key={item.id}>
              <a href={`/preproduccion/${item.id}.jpg`} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${item.title}`}>
                <img src={`/preproduccion/${item.id}-thumb.jpg`} alt={item.alt} loading="lazy" decoding="async" />
                <span className="archive-open" aria-hidden="true">↗</span>
              </a>
              <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    ))}

    <section className="archive-outro" id="artbook" aria-labelledby="artbook-link-title">
      <span className="archive-index">EPÍLOGO / EL UNIVERSO REUNIDO</span>
      <h2 id="artbook-link-title">Todo en un libro.</h2>
      <p>El artbook reúne en 56 páginas el arte y el proceso visual de Umbrío.</p>
      <a href="/#Artbook">Explorar el artbook <span aria-hidden="true">↗</span></a>
    </section>

    <footer className="archive-footer"><span>UMBRÍO · ARCHIVO VISUAL</span><a href="/#Making">Volver a Making off ↑</a></footer>
  </main>
);

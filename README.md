# Umbrío · web actualizada

Esta carpeta es una copia de la web React ubicada originalmente en `umbrio-propuesta`. Incluye textos públicos revisados, la ilustración del banner principal y la portada del cortometraje. La galería de creación permanece en el código, pero está oculta en el sitio. La carpeta original no se modificó porque está fuera del espacio de escritura de esta sesión.

## Ejecutar

Requiere Node.js y las dependencias del proyecto:

```sh
npm install
npm run dev
```

Para generar la versión de publicación: `npm run build`.

## Archivo de preproducción

La sección Making off enlaza a `/preproduccion/`, una página independiente con 27 piezas seleccionadas de `../2. Arte` en carretes por capítulo (barra de capítulos fija y ampliación en la misma página), el storyboard en láminas con aviso de spoilers y un enlace al artbook. En Color se retiró la ilustración del color script de Noah porque repetía la sección Personajes; se mantienen la paleta y los sets de color de cada personaje.

Los archivos optimizados se generan en `public/preproduccion/` con PowerShell y el codificador de imágenes de Windows:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts\export_preproduction.ps1
```

La selección y sus textos están en `src/data/preproduction.json`. Al cambiarla, ejecuta de nuevo el exportador antes de compilar.

Otros exportadores (Python con pymupdf y pillow):

- `python scripts/export_storyboard.py public/preproduccion/storyboard-umbrio.pdf public/preproduccion/storyboard`: láminas WebP del storyboard. Copia el `STORYBOARD_PAGE_COUNT` que imprime en `Preproduction.tsx`.
- `python scripts/export_sketch_lines.py public/preproduccion`: versión solo línea (`-linea.webp`) de los bocetos, sin el papel del escaneo.
- `python scripts/export_artbook.py "../2. Arte/4. Libro de producción/ArtBook_V7_Ajustado_04.pdf" public/artbook`: páginas del artbook (57). Copia el `ARTBOOK_PAGE_COUNT` que imprime en `artbookPages.ts`.

## Integrar en la web original

Conserva una copia de seguridad de `umbrio-propuesta`. Después, traslada `src/`, `tests/`, `public/`, `preproduccion/`, `index.html` y los archivos de configuración y dependencias de esta carpeta a la web original. Instala dependencias y ejecuta pruebas y build allí antes de publicar.

## Fuentes editoriales

- `OneDrive_1_10-19-2026.zip`: brief web y app, estructura narrativa, estilo visual y concepto del videojuego. El brief indica una experiencia inmersiva vinculada al corto, con personajes, mapa, galería y apoyo en LSC.
- `OneDrive_1_10-19-2026 (1).zip`: descripción de la propuesta musical y de la prueba de selección de personajes; los videos y capturas son material de desarrollo.
- `OneDrive_2_10-19-2026.zip`: inventarios, iconos, ilustraciones y fotografías de lugares de Tunja.
- `OneDrive_3_10-19-2026.zip`: renders de personajes, prólogo y biblioteca utilizados en la galería.
- `ArtBook.zip`: archivos editables de Illustrator. No se publican directamente porque requieren exportación y selección editorial.
- `banner principal.jpeg` y `posible banner final y parte del footer.jpeg`: bocetos señalados como imágenes en desarrollo en la web.

La página presenta una selección para público general. Evita divulgar documentos internos, archivos fuente y detalles que revelarían la trama. Los textos breves de personaje y ambientación son redacción editorial basada en los materiales disponibles, no fichas oficiales definitivas.

## Recursos pendientes de integración

- Sustituir la figura provisional del Sombrerón en `Hero.tsx` por la ilustración aprobada para la primera pantalla; el boceto de Noah y Simón se muestra al inicio del cierre.
- Reemplazar `mapaTunja.webp` por el mapa final sin marcadores impresos cuando llegue. Las cuatro gemas interactivas usan las posiciones del mapa anterior y muestran fotografías; falta validar su ubicación definitiva e incorporar los renders 3D aprobados de cada locación.
- Incorporar el render 3D de Mano Peluda y los recursos finales de Manos de la Pared en `personajesData.ts` cuando estén aprobados. Las fichas indican si la imagen grande es 2D o 3D.
- Reemplazar los marcos CSS provisionales del juego, equipo y llamadas a la acción por las ilustraciones definitivas de piedra, runas y gemas. Activar los botones de Google Play y App Store solo cuando existan sus fichas públicas.
- `VideoLscModal` acepta `videoSrcMobile` opcional; conectar ahí los cortes verticales cuando se entreguen. La fuente horizontal actual sigue disponible como respaldo.
- Los textos de portada y las descripciones públicas requieren la revisión editorial de publicidad mencionada en la reunión.
- **Renders LSC finales del Inicio**: `Hero.tsx` usa `Inicio.mp4` / `Inicio1.mp4` como provisionales.
- **Video LSC del Artbook**: no existe; hay que pedírselo a Dayana. Mientras tanto el Artbook muestra "Interpretación LSC del artbook: próximamente".
- **Tráiler oficial**: `Cortometraje.tsx` reproduce `making_off.mp4` rotulado como video provisional. `Trailer.mp4` es la interpretación LSC del tráiler, no el tráiler.
- **Fondo con bocetos en delineado** para preproducción (pedido a publicidad/diseño); hoy se usa `fondotextura.webp`.
- **Cortes verticales de cada video LSC** para móvil (solo existe el del Inicio).
- Los iconos de redes se añadirán cuando existan los perfiles oficiales y sus enlaces aprobados; el favicon ya usa el logo dorado disponible.

# Umbrío — web actualizada

Esta carpeta es una copia de la web React ubicada originalmente en `umbrio-propuesta`. Incluye textos públicos revisados, la ilustración del banner principal y la portada del cortometraje. La galería de creación permanece en el código, pero está oculta en el sitio. La carpeta original no se modificó porque está fuera del espacio de escritura de esta sesión.

## Ejecutar

Requiere Node.js y las dependencias del proyecto:

```sh
npm install
npm run dev
```

Para generar la versión de publicación: `npm run build`.

## Archivo de preproducción

La sección Making off enlaza a `/preproduccion/`, una página independiente con 28 piezas seleccionadas de `../2. Arte`, el storyboard completo con aviso de spoilers y un enlace al artbook ya publicado.

Los archivos optimizados se generan en `public/preproduccion/` con PowerShell y el codificador de imágenes de Windows:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts\export_preproduction.ps1
```

La selección y sus textos están en `src/data/preproduction.json`. Al cambiarla, ejecuta de nuevo el exportador antes de compilar.

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

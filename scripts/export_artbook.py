"""Render the artbook PDF into ordered WebP pages.

Usage: python scripts/export_artbook.py "../2. Arte/4. Libro de producción/ArtBook_V7_Ajustado_04.pdf" public/artbook
Requires: pymupdf and pillow.

After exporting, set ARTBOOK_PAGE_COUNT in src/components/artbookPages.ts to the printed page count.
"""

from pathlib import Path
import sys

import fitz
from PIL import Image


def export(source: Path, destination: Path) -> int:
    destination.mkdir(parents=True, exist_ok=True)
    for stale in destination.glob("page-*.webp"):
        stale.unlink()

    with fitz.open(source) as document:
        total = len(document)
        for index, page in enumerate(document, start=1):
            pixmap = page.get_pixmap(colorspace=fitz.csRGB, alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            output = destination / f"page-{index:02d}.webp"
            image.save(output, "WEBP", quality=85, method=6)
            print(f"{index:02d}/{total} {output.name} ({image.width}x{image.height})", flush=True)
    return total


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python scripts/export_artbook.py SOURCE.pdf DESTINATION")
    pages = export(Path(sys.argv[1]), Path(sys.argv[2]))
    print(f"ARTBOOK_PAGE_COUNT = {pages}")

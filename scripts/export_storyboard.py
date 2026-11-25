"""Render the storyboard PDF into ordered WebP pages for the preproduction reel.

Usage: python scripts/export_storyboard.py public/preproduccion/storyboard-umbrio.pdf public/preproduccion/storyboard
Requires: pymupdf and pillow.

Prints STORYBOARD_PAGE_COUNT; copy it into src/components/Preproduction.tsx.
"""

from pathlib import Path
import sys

import fitz
from PIL import Image

WIDTH = 1100


def export(source: Path, destination: Path) -> int:
    destination.mkdir(parents=True, exist_ok=True)
    for stale in destination.glob("sb-*.webp"):
        stale.unlink()

    with fitz.open(source) as document:
        total = len(document)
        for index, page in enumerate(document, start=1):
            zoom = WIDTH / page.rect.width
            pixmap = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), colorspace=fitz.csRGB, alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            output = destination / f"sb-{index:03d}.webp"
            image.save(output, "WEBP", quality=78, method=6)
            print(f"{index:03d}/{total} {output.name} ({image.width}x{image.height})", flush=True)
    return total


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python scripts/export_storyboard.py SOURCE.pdf DESTINATION")
    pages = export(Path(sys.argv[1]), Path(sys.argv[2]))
    print(f"STORYBOARD_PAGE_COUNT = {pages}")

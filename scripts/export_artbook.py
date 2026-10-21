"""Render the PDF-compatible Illustrator artbook into ordered WebP pages.

Usage: python scripts/export_artbook.py ../ArtBook_V7.ai public/artbook
Requires: pymupdf and pillow.
"""

from pathlib import Path
import sys

import fitz
from PIL import Image


def export(source: Path, destination: Path) -> None:
    with fitz.open(source) as document:
        if len(document) != 56:
            raise ValueError(f"Expected 56 pages, found {len(document)}")

        destination.mkdir(parents=True, exist_ok=True)
        for index, page in enumerate(document, start=1):
            pixmap = page.get_pixmap(colorspace=fitz.csRGB, alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            output = destination / f"page-{index:02d}.webp"
            image.save(output, "WEBP", quality=85, method=6)
            print(f"{index:02d}/56 {output.name} ({image.width}x{image.height})", flush=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python scripts/export_artbook.py SOURCE.ai DESTINATION")
    export(Path(sys.argv[1]), Path(sys.argv[2]))

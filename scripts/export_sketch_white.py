"""Whiten the paper of the scanned sketches, keeping the line and its colour.

Usage: python scripts/export_sketch_white.py public/preproduccion
Requires: pillow.

Writes boceto-*-blanco.jpg (and -thumb-blanco.jpg) next to each scan.
Levels are measured per image, like export_sketch_lines.py: paper is the
bright 80th percentile, ink the dark 1st percentile.
"""

from pathlib import Path
import sys

from PIL import Image


def percentile(histogram: list[int], fraction: float) -> int:
    target = sum(histogram) * fraction
    running = 0
    for level, count in enumerate(histogram):
        running += count
        if running >= target:
            return level
    return 255


def whiten(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    histogram = image.convert("L").histogram()
    paper = percentile(histogram, 0.80) - 6
    ink = percentile(histogram, 0.01)
    span = max(paper - ink, 1)
    lut = [int(255 * min(max((v - ink) / span, 0), 1)) for v in range(256)]
    image.point(lut * 3).save(output, "JPEG", quality=88, optimize=True)
    print(f"{output.name} paper={paper} ink={ink}")


def main() -> None:
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else "public/preproduccion")
    for source in sorted(folder.glob("boceto-*.jpg")):
        if source.stem.endswith("-blanco"):
            continue
        whiten(source, source.with_name(f"{source.stem}-blanco.jpg"))


if __name__ == "__main__":
    main()

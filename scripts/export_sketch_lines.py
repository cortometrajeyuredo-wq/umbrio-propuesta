"""Turn the scanned sketches into line-only WebP files (transparent paper, cream line).

Usage: python scripts/export_sketch_lines.py public/preproduccion
Requires: pillow.

Each scan has its own paper tone, so levels are measured per image:
the paper is the bright 80th percentile, the line is the dark 1st percentile.
"""

from pathlib import Path
import sys

from PIL import Image

LINE = (246, 233, 199)  # --cream


def percentile(histogram: list[int], fraction: float) -> int:
    target = sum(histogram) * fraction
    running = 0
    for level, count in enumerate(histogram):
        running += count
        if running >= target:
            return level
    return 255


def to_line(source: Path, output: Path) -> None:
    grey = Image.open(source).convert("L")
    histogram = grey.histogram()
    paper = percentile(histogram, 0.80) - 12
    ink = percentile(histogram, 0.01)
    span = max(paper - ink, 1)
    alpha = grey.point(lambda v: int(255 * (min(max((paper - v) / span, 0), 1) ** 0.8)))
    line = Image.new("RGBA", grey.size, LINE + (0,))
    line.putalpha(alpha)
    line.save(output, "WEBP", quality=82, method=6)
    print(f"{output.name} paper={paper} ink={ink}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/export_sketch_lines.py PREPRODUCTION_DIR")
    folder = Path(sys.argv[1])
    for scan in sorted(folder.glob("boceto-*.jpg")):
        to_line(scan, scan.with_name(scan.stem + "-linea.webp"))

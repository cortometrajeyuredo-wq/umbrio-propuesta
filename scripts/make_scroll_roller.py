"""Build the rolled-parchment roller used by the Locaciones scroll.

Usage: python scripts/make_scroll_roller.py src/assets/img/pergamino1.webp src/assets/img/rodillo-pergamino.webp
Requires: pillow.

Takes a vertical strip of the parchment texture and shades it as a cylinder
(dark edges, soft highlight) with rounded ends, so it reads as the rolled sheet.
"""

from pathlib import Path
import math
import sys

from PIL import Image, ImageDraw, ImageFilter

WIDTH, HEIGHT = 96, 640


def build(texture_path: Path, output: Path) -> None:
    texture = Image.open(texture_path).convert("RGB")
    # Strip from the solid middle of the sheet, stretched to the roller height.
    strip = texture.crop((360, 80, 440, 520)).resize((WIDTH, HEIGHT), Image.LANCZOS)
    pixels = strip.load()
    for x in range(WIDTH):
        # Cylinder shading: cos falloff to the edges plus a highlight left of centre.
        u = (x + 0.5) / WIDTH * 2 - 1
        light = 0.3 + 0.7 * math.sqrt(max(0.0, 1 - u * u))
        light += 0.18 * math.exp(-((u + 0.25) ** 2) / 0.04)
        for y in range(HEIGHT):
            r, g, b = pixels[x, y]
            pixels[x, y] = tuple(min(255, int(c * light)) for c in (r, g, b))

    strip = strip.filter(ImageFilter.SMOOTH)

    mask = Image.new("L", (WIDTH, HEIGHT), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, WIDTH - 1, HEIGHT - 1), radius=WIDTH // 3, fill=255)
    roller = strip.convert("RGBA")
    roller.putalpha(mask)
    roller.save(output, "WEBP", quality=88, method=6)
    print(f"{output} {roller.size}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python scripts/make_scroll_roller.py TEXTURE OUTPUT")
    build(Path(sys.argv[1]), Path(sys.argv[2]))

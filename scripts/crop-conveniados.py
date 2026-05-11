"""
crop-conveniados.py
Detects each logo in assets/conveniados.png and saves them as separate files
in public/conveniados/.
"""

from pathlib import Path
from PIL import Image
import numpy as np

SRC = Path(__file__).parent.parent / "assets" / "conveniados.png"
OUT = Path(__file__).parent.parent / "public" / "conveniados"
OUT.mkdir(parents=True, exist_ok=True)

# Logo names in reading order (left-to-right, top-to-bottom)
NAMES = [
    "irineu-imoveis",
    "tv-da-cidade",
    "nativa-fm",
    "rede-do-bem-cancer",
    "instituicao-bethesda",
    "implante-sorriso",
    "nr-postes",
    "ra",
    "estacaville",
    "sicoob",
    "acredicoop",
    "enfasi",
    "ifsc",
    "medeiros",
]

PADDING = 10  # px to add around each detected bounding box


def find_content_bands(mask_1d: np.ndarray, min_gap: int = 15) -> list[tuple[int, int]]:
    """Return (start, end) index pairs for contiguous True runs in mask_1d."""
    bands: list[tuple[int, int]] = []
    in_band = False
    start = 0
    n = len(mask_1d)
    i = 0
    while i < n:
        if mask_1d[i] and not in_band:
            in_band = True
            start = i
        elif not mask_1d[i] and in_band:
            # Check if the gap is large enough to split bands
            gap_end = i
            while gap_end < n and not mask_1d[gap_end]:
                gap_end += 1
            if gap_end - i >= min_gap or gap_end == n:
                bands.append((start, i - 1))
                in_band = False
                i = gap_end
                continue
        i += 1
    if in_band:
        bands.append((start, n - 1))
    return bands


img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
W, H = img.size

# Build background mask: white-ish or transparent pixels
is_bg = (
    ((arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240))
    | (arr[:, :, 3] < 30)
)
has_content = ~is_bg  # True where there is logo content

# --- Find horizontal bands (rows of logos) ---
row_has_content = has_content.any(axis=1)
row_bands = find_content_bands(row_has_content, min_gap=15)

print(f"Detected {len(row_bands)} row band(s):")
for i, (r0, r1) in enumerate(row_bands):
    print(f"  row band {i}: y={r0}–{r1}")

# --- Within each row band, find vertical column bands ---
crops: list[tuple[int, int, int, int]] = []  # (x0, y0, x1, y1)

for r0, r1 in row_bands:
    row_slice = has_content[r0 : r1 + 1, :]
    col_has_content = row_slice.any(axis=0)
    col_bands = find_content_bands(col_has_content, min_gap=20)
    for c0, c1 in col_bands:
        # Tight bounding box within this cell
        cell = has_content[r0 : r1 + 1, c0 : c1 + 1]
        rows_with = np.where(cell.any(axis=1))[0]
        cols_with = np.where(cell.any(axis=0))[0]
        y0 = r0 + rows_with.min()
        y1 = r0 + rows_with.max()
        x0 = c0 + cols_with.min()
        x1 = c0 + cols_with.max()
        crops.append((x0, y0, x1, y1))

print(f"\nDetected {len(crops)} logo(s) total:")
for i, (x0, y0, x1, y1) in enumerate(crops):
    print(f"  logo {i}: ({x0},{y0}) to ({x1},{y1})")

# --- Save each crop ---
img_rgb = img.convert("RGB")  # white background

for i, (x0, y0, x1, y1) in enumerate(crops):
    # Add padding, clamped to image bounds
    bx0 = max(0, x0 - PADDING)
    by0 = max(0, y0 - PADDING)
    bx1 = min(W, x1 + PADDING)
    by1 = min(H, y1 + PADDING)

    name = NAMES[i] if i < len(NAMES) else f"logo-{i + 1}"
    out_path = OUT / f"{name}.png"

    crop = img.crop((bx0, by0, bx1, by1))
    # Paste onto white background
    bg = Image.new("RGB", crop.size, (255, 255, 255))
    bg.paste(crop, mask=crop.split()[3])
    bg.save(out_path)
    print(f"  Saved: {out_path.name}  ({bx1-bx0}×{by1-by0} px)")

print(f"\nDone — {len(crops)} file(s) saved to {OUT}")

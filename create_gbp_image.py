"""
Generate a professional Google Business Profile image for Förder-Kompass.
720x720px, navy blue + gold brand colors, compass icon, clean typography.
"""

import math
import os
from PIL import Image, ImageDraw, ImageFont

# === Configuration ===
WIDTH, HEIGHT = 720, 720
NAVY = (30, 58, 95)        # #1e3a5f
NAVY_LIGHT = (40, 75, 120)
NAVY_DARK = (18, 35, 60)
GOLD = (212, 168, 67)      # #d4a843
GOLD_LIGHT = (230, 195, 105)
GOLD_DIM = (170, 135, 55)
WHITE = (255, 255, 255)
WHITE_SOFT = (240, 244, 248)
NEAR_WHITE = (220, 228, 238)

OUTPUT_DIR = r"C:\Users\kovac\OneDrive\Desktop\Claude_Code_Work\zim-foerderung\public"
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "gbp-business-photo.png")

os.makedirs(OUTPUT_DIR, exist_ok=True)


def try_load_font(size, bold=False):
    """Try to load a clean system font, fall back gracefully."""
    font_candidates = []
    if bold:
        font_candidates = [
            "C:/Windows/Fonts/calibrib.ttf",    # Calibri Bold
            "C:/Windows/Fonts/arialbd.ttf",     # Arial Bold
            "C:/Windows/Fonts/segoeui.ttf",     # Segoe UI (regular as fallback)
            "C:/Windows/Fonts/verdanab.ttf",    # Verdana Bold
        ]
    else:
        font_candidates = [
            "C:/Windows/Fonts/calibri.ttf",     # Calibri
            "C:/Windows/Fonts/arial.ttf",       # Arial
            "C:/Windows/Fonts/segoeui.ttf",     # Segoe UI
            "C:/Windows/Fonts/verdana.ttf",     # Verdana
        ]
    for path in font_candidates:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def draw_vertical_gradient(draw, x0, y0, x1, y1, color_top, color_bottom):
    """Draw a vertical linear gradient."""
    for y in range(y0, y1):
        ratio = (y - y0) / max(1, (y1 - y0 - 1))
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * ratio)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * ratio)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * ratio)
        draw.line([(x0, y), (x1, y)], fill=(r, g, b))


def draw_compass_rose(draw, cx, cy, outer_r, inner_r, color_main, color_accent):
    """Draw a stylized compass rose with 4 cardinal and 4 ordinal points."""
    # Outer ring
    draw.ellipse(
        [cx - outer_r - 4, cy - outer_r - 4, cx + outer_r + 4, cy + outer_r + 4],
        outline=color_accent, width=3
    )
    draw.ellipse(
        [cx - outer_r, cy - outer_r, cx + outer_r, cy + outer_r],
        outline=color_main, width=2
    )

    # Cardinal points (N, E, S, W) - tall narrow triangles
    cardinal_angles = [0, 90, 180, 270]  # N, E, S, W
    cardinal_length = outer_r * 0.88
    cardinal_half_width = outer_r * 0.13

    for angle_deg in cardinal_angles:
        angle_rad = math.radians(angle_deg - 90)  # -90 so 0 = North (up)
        # Tip of the point
        tip_x = cx + cardinal_length * math.cos(angle_rad)
        tip_y = cy + cardinal_length * math.sin(angle_rad)
        # Left base
        perp_rad = angle_rad + math.pi / 2
        lx = cx + cardinal_half_width * math.cos(perp_rad)
        ly = cy + cardinal_half_width * math.sin(perp_rad)
        # Right base
        rx = cx - cardinal_half_width * math.cos(perp_rad)
        ry = cy - cardinal_half_width * math.sin(perp_rad)

        # Draw two-tone triangle (left half darker, right half lighter)
        draw.polygon([(tip_x, tip_y), (lx, ly), (cx, cy)], fill=color_main)
        draw.polygon([(tip_x, tip_y), (rx, ry), (cx, cy)], fill=color_accent)

    # Ordinal points (NE, SE, SW, NW) - shorter
    ordinal_angles = [45, 135, 225, 315]
    ordinal_length = outer_r * 0.55
    ordinal_half_width = outer_r * 0.08

    for angle_deg in ordinal_angles:
        angle_rad = math.radians(angle_deg - 90)
        tip_x = cx + ordinal_length * math.cos(angle_rad)
        tip_y = cy + ordinal_length * math.sin(angle_rad)
        perp_rad = angle_rad + math.pi / 2
        lx = cx + ordinal_half_width * math.cos(perp_rad)
        ly = cy + ordinal_half_width * math.sin(perp_rad)
        rx = cx - ordinal_half_width * math.cos(perp_rad)
        ry = cy - ordinal_half_width * math.sin(perp_rad)

        draw.polygon([(tip_x, tip_y), (lx, ly), (cx, cy)], fill=color_accent)
        draw.polygon([(tip_x, tip_y), (rx, ry), (cx, cy)], fill=color_main)

    # Inner circle (hub)
    hub_r = outer_r * 0.12
    draw.ellipse(
        [cx - hub_r, cy - hub_r, cx + hub_r, cy + hub_r],
        fill=color_accent, outline=color_main, width=2
    )

    # Tiny center dot
    dot_r = outer_r * 0.04
    draw.ellipse(
        [cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r],
        fill=color_main
    )


def draw_compass_needle(draw, cx, cy, length, color_north, color_south):
    """Draw a tilted compass needle for visual interest."""
    tilt = math.radians(-25)  # Slight tilt
    half_w = 5

    # North half (pointing up-left ish)
    n_tip_x = cx + length * math.cos(tilt - math.pi / 2)
    n_tip_y = cy + length * math.sin(tilt - math.pi / 2)
    perp = tilt
    lx = cx + half_w * math.cos(perp)
    ly = cy + half_w * math.sin(perp)
    rx = cx - half_w * math.cos(perp)
    ry = cy - half_w * math.sin(perp)
    draw.polygon([(n_tip_x, n_tip_y), (lx, ly), (rx, ry)], fill=color_north)

    # South half
    s_tip_x = cx - length * math.cos(tilt - math.pi / 2)
    s_tip_y = cy - length * math.sin(tilt - math.pi / 2)
    draw.polygon([(s_tip_x, s_tip_y), (lx, ly), (rx, ry)], fill=color_south)


def draw_decorative_line(draw, y, x_start, x_end, color, thickness=2):
    """Draw a horizontal line with small diamond endpoints."""
    draw.line([(x_start, y), (x_end, y)], fill=color, width=thickness)
    # Left diamond
    d = 5
    draw.polygon([(x_start, y), (x_start + d, y - d), (x_start + 2 * d, y),
                   (x_start + d, y + d)], fill=color)
    # Right diamond
    draw.polygon([(x_end, y), (x_end - d, y - d), (x_end - 2 * d, y),
                   (x_end - d, y + d)], fill=color)


def main():
    img = Image.new("RGB", (WIDTH, HEIGHT), NAVY)
    draw = ImageDraw.Draw(img)

    # --- Background gradient ---
    draw_vertical_gradient(draw, 0, 0, WIDTH, HEIGHT, NAVY_DARK, NAVY)

    # --- Subtle geometric background pattern (diagonal lines) ---
    for i in range(-HEIGHT, WIDTH + HEIGHT, 40):
        draw.line([(i, 0), (i + HEIGHT, HEIGHT)], fill=(25, 50, 82), width=1)

    # --- Top decorative border ---
    draw.rectangle([0, 0, WIDTH, 6], fill=GOLD)
    # Thin gold line below
    draw.line([(60, 18), (WIDTH - 60, 18)], fill=GOLD_DIM, width=1)

    # --- Bottom decorative border ---
    draw.rectangle([0, HEIGHT - 6, WIDTH, HEIGHT], fill=GOLD)
    draw.line([(60, HEIGHT - 18), (WIDTH - 60, HEIGHT - 18)], fill=GOLD_DIM, width=1)

    # --- Compass Rose ---
    compass_cx = WIDTH // 2
    compass_cy = 250
    compass_radius = 115

    # Soft glow behind compass
    for r in range(compass_radius + 40, compass_radius, -1):
        alpha_ratio = 1 - (r - compass_radius) / 40
        glow_color = (
            int(NAVY_DARK[0] + (GOLD_DIM[0] - NAVY_DARK[0]) * alpha_ratio * 0.15),
            int(NAVY_DARK[1] + (GOLD_DIM[1] - NAVY_DARK[1]) * alpha_ratio * 0.15),
            int(NAVY_DARK[2] + (GOLD_DIM[2] - NAVY_DARK[2]) * alpha_ratio * 0.15),
        )
        draw.ellipse(
            [compass_cx - r, compass_cy - r, compass_cx + r, compass_cy + r],
            outline=glow_color, width=1
        )

    # Draw the compass rose itself
    draw_compass_rose(draw, compass_cx, compass_cy, compass_radius,
                      GOLD, GOLD_LIGHT)

    # Compass needle overlay
    draw_compass_needle(draw, compass_cx, compass_cy, compass_radius * 0.7,
                        (220, 60, 60), WHITE_SOFT)

    # N / S / E / W labels on the compass
    font_cardinal = try_load_font(18, bold=True)
    label_offset = compass_radius + 18
    labels = [("N", 0), ("E", 90), ("S", 180), ("W", 270)]
    for label, angle_deg in labels:
        angle_rad = math.radians(angle_deg - 90)
        lx = compass_cx + label_offset * math.cos(angle_rad)
        ly = compass_cy + label_offset * math.sin(angle_rad)
        bbox = draw.textbbox((0, 0), label, font=font_cardinal)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw / 2, ly - th / 2), label, fill=GOLD_LIGHT,
                  font=font_cardinal)

    # --- Decorative line separator ---
    sep_y = 395
    draw_decorative_line(draw, sep_y, 120, WIDTH - 120, GOLD, thickness=2)

    # === Typography ===
    font_main = try_load_font(62, bold=True)
    font_sub = try_load_font(28, bold=False)
    font_tagline = try_load_font(20, bold=False)

    # --- Main title: "Förder-Kompass" ---
    title = "Förder-Kompass"
    title_bbox = draw.textbbox((0, 0), title, font=font_main)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (WIDTH - title_w) // 2
    title_y = 420

    # Text shadow
    draw.text((title_x + 2, title_y + 2), title, fill=NAVY_DARK, font=font_main)
    # Main text
    draw.text((title_x, title_y), title, fill=WHITE, font=font_main)

    # Gold underline beneath title
    underline_y = title_y + 72
    underline_half = title_w // 2 + 10
    draw.line(
        [(WIDTH // 2 - underline_half, underline_y),
         (WIDTH // 2 + underline_half, underline_y)],
        fill=GOLD, width=3
    )

    # --- Subtitle: "ZIM-Fördermittelberatung" ---
    subtitle = "ZIM-Fördermittelberatung"
    sub_bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_x = (WIDTH - sub_w) // 2
    sub_y = underline_y + 18

    draw.text((sub_x, sub_y), subtitle, fill=GOLD, font=font_sub)

    # --- Tagline ---
    tagline = "Ihr Navigator zu Fördermitteln"
    tag_bbox = draw.textbbox((0, 0), tagline, font=font_tagline)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_x = (WIDTH - tag_w) // 2
    tag_y = sub_y + 50

    draw.text((tag_x, tag_y), tagline, fill=NEAR_WHITE, font=font_tagline)

    # --- Small decorative dots at bottom ---
    dot_y = HEIGHT - 42
    dot_spacing = 12
    num_dots = 5
    start_x = WIDTH // 2 - (num_dots - 1) * dot_spacing // 2
    for i in range(num_dots):
        dx = start_x + i * dot_spacing
        r = 3 if i == num_dots // 2 else 2
        draw.ellipse([dx - r, dot_y - r, dx + r, dot_y + r], fill=GOLD)

    # --- Corner accents (small L-shapes in corners) ---
    corner_len = 35
    corner_w = 2
    margin = 20
    # Top-left
    draw.line([(margin, margin), (margin + corner_len, margin)], fill=GOLD_DIM, width=corner_w)
    draw.line([(margin, margin), (margin, margin + corner_len)], fill=GOLD_DIM, width=corner_w)
    # Top-right
    draw.line([(WIDTH - margin, margin), (WIDTH - margin - corner_len, margin)], fill=GOLD_DIM, width=corner_w)
    draw.line([(WIDTH - margin, margin), (WIDTH - margin, margin + corner_len)], fill=GOLD_DIM, width=corner_w)
    # Bottom-left
    draw.line([(margin, HEIGHT - margin), (margin + corner_len, HEIGHT - margin)], fill=GOLD_DIM, width=corner_w)
    draw.line([(margin, HEIGHT - margin), (margin, HEIGHT - margin - corner_len)], fill=GOLD_DIM, width=corner_w)
    # Bottom-right
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin - corner_len, HEIGHT - margin)], fill=GOLD_DIM, width=corner_w)
    draw.line([(WIDTH - margin, HEIGHT - margin), (WIDTH - margin, HEIGHT - margin - corner_len)], fill=GOLD_DIM, width=corner_w)

    # === Save ===
    img.save(OUTPUT_PATH, "PNG", quality=95)
    print(f"Image saved to: {OUTPUT_PATH}")
    print(f"Size: {img.size[0]}x{img.size[1]} pixels")


if __name__ == "__main__":
    main()

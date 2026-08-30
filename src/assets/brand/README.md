# Brand marks

## What ships

| Mark | Ships as | Where it lives |
|---|---|---|
| GitHub | inline `<svg>`, `fill="#FFFFFF"` | `src/components/Icon.astro` |
| LinkedIn | `<img>`, LinkedIn's own PNG, unmodified | `public/media/brand/InBug-White.png` |
| Handshake | **no mark yet** | — |

Both appear only in `SiteFooter.astro`, whose background is `--chrome-bg`
(`#111111`) and never re-themes. White is an approved variation for both, so it
is pinned rather than inherited.

## Why they are not both handled the same way

**GitHub** supplied an SVG, so it is inlined and the fill is set from a `color`
prop. It is passed `#FFFFFF` explicitly, **not** `currentColor` — `--chrome-fg`
is `#FAF7F2`, a warm off-white, and a tinted logo is a modified logo.

**LinkedIn** publishes the `[in]` bug as **PNG only**. Their guidelines say you
may not redraw or recolour it: *"You may only use the approved color variations
provided for download."* So `InBug-White.png` is their file byte for byte, from
`brand.linkedin.com/downloads`, downloaded 2026-08-30. It is 840x779 rather than
square because it carries the ® glyph.

> **Do not add an inline LinkedIn path to `Icon.astro`.** Redrawing it is
> exactly what the guidelines forbid, and the redrawn versions in circulation
> drop the ®.

LinkedIn permits the bug *"As a hyperlink to your LinkedIn profile"*, which is
what the footer does.

## Files here

| File | Status |
|---|---|
| `github-white-icon.svg` | **live** — path data transcribed into `Icon.astro`, kept here as the original |
| `icons8-linkedin.svg` | **superseded 2026-08-30, do not use** |

`icons8-linkedin.svg` came from Icons8, whose free tier wants a visible link
back to icons8.com, and it is a redrawing that omits the ®. Both problems go
away with LinkedIn's own file. Kept only so the swap is traceable.

## Handshake has no mark

The fourth footer box ships without a logo. Handshake publishes no brand-asset
page I could find, and drawing one from memory is precisely the mistake the
LinkedIn swap caught: the redrawn `[in]` bug in circulation silently omits the
®. The empty `.box-mark` still reserves its 26px, so all four boxes stay
aligned and the labels line up.

To finish it, get the real asset from Handshake and drop it in
`public/media/brand/` alongside LinkedIn's. Do not substitute a lookalike.

Nothing in this folder is published. Anything in `public/` ships whether a page
links it or not, which is why the originals sit here instead.

If a mark is ever replaced, update `Icon.astro` (or `public/media/brand/`) and
this table together.

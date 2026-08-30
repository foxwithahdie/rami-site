# rami-site

Ramzey Burdette's portfolio. Static HTML and CSS, built with Astro.

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # -> dist/

## Two hard rules

**Nothing ships to the browser but HTML, CSS, fonts and media.** No `<script>`
tag appears in any built page and no `.js` file lands in `dist/`. Astro renders
at build time and its runtime is not included. If you ever add a component with
a `client:` directive, that stops being true.

**The browser floor is spring 2017**: Chrome 57, Firefox 52, Safari 10.1,
Edge 16. `src/styles/base.css` opens with the list of what that rules out and
what replaces it. In short: no `clamp()`, no flexbox `gap`, no `:has()`, no
`aspect-ratio`, no `:focus-visible`. Grid is fine, but written as
`grid-column-gap`, not the `gap` shorthand.

Check both before shipping:

    find dist -name '*.js' | wc -l                       # must be 0
    grep -rho '<script' dist --include='*.html' | wc -l  # must be 0
    grep -rhoE ':has\(|clamp\(|[^-]gap:|aspect-ratio:' dist/_astro/*.css

## Layout

    src/
      layouts/Base.astro        <html>, head, nav, footer, theme attribute
      components/               SiteNav, SiteFooter, Hero, Section, Media,
                                MediaRow, Code, ProjectNav
      pages/                    one file per route
      styles/  fonts.css  tokens.css  base.css
      data/    work.js  index-entries.js  cv.json
    public/
      fonts/                    self-hosted, no third-party requests
      media/                    downscaled derivatives only
    scripts/build-cv.py         regenerates src/data/cv.json

## Theme worlds

Every page passes `theme` to the layout, which lands as `<html data-theme="…">`.
`tokens.css` swaps `--paper`, `--ink` and `--accent` off that one hook. The eight
worlds match the theme modes in the Figma file: `home`, `processor`, `rehab`,
`handheld`, `nonprofit`, `machined`, `shop`, `tactile`, `shop-dark`.

Nav and footer never inherit the page theme. They use `--chrome-bg`,
`--chrome-fg` and `--chrome-accent`, which are constant everywhere.

- Contact address and form endpoint are unset. `SiteFooter.astro` shows a
  placeholder note rather than inventing either.
- Empty image slots render a labelled dashed box: Braille (2), Ideas Become
  Impact (2), Barcode Scanner (2), RV32I (1), About (1).

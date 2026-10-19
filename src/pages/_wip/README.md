# Parked pages

`src/pages/_wip/` is not routed. Astro ignores any directory whose name starts
with an underscore, so nothing in here is built or reachable.

Ramzey, 2026-08-30: *"i wanna put those on hold by referencing them in work as
'Coming Soon!' and cutting them out of production, but lets fix them still."*

| Page | Parked | Why |
|---|---|---|
| `e-braille-learning-device.astro` | 2026-08-30 | OAT Lab. Renamed from `braille-e-reader.astro` on 2026-10-19: the project is a learning device, not just a reader |
| `magfit.astro` | **2026-10-19** | *"magfit will be a next semester work."* The CV entry and the Projects listing both stay; only this page is parked |
| `ideas-become-impact.astro` | 2026-08-30 | |
| `barcode-scanner.astro` | 2026-08-30 | |

They are complete and keep getting fixed.

## Parking or shipping a page

Three places have to agree, and missing one ships a dead link:

1. The file: `src/pages/_wip/` or its real route directory.
2. `src/data/routes.js` → the `parked` set.
3. `src/data/index-entries.js` and `src/data/work.js` → the `soon:` flag.

To ship one:

    mv src/pages/_wip/e-braille-learning-device.astro src/pages/experience/

then drop its href from `parked` and remove `soon:true` from both data files.

## Everything that links to a parked page is handled

`WorkCard` (home, work) and `ProjectNav` (prev/next on every project page) both
consult `isLive()` from `src/data/routes.js` and render a non-link
**COMING SOON!** card instead of an anchor.

**`ProjectNav` only learned to do that on 2026-10-19.** Before then it emitted a
plain `<a>` regardless, so parking MagFit would have shipped three dead links
from the Olin Shop, RV32I and braille pages. If you add a nav-style component,
make it ask `isLive()` too.

Check before you push:

    rm -rf dist && npm run build
    grep -rlo 'href="/experience/magfit/"' dist/ | wc -l   # expect 0
    grep -rho 'COMING SOON!' dist/ | wc -l                 # expect > 0

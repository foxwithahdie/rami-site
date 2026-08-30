# Parked pages

`src/pages/_wip/` is not routed. Astro ignores any directory whose name starts
with an underscore, so nothing in here is built or reachable.

Ramzey, 2026-08-30: *"i wanna put those on hold by referencing them in work as
'Coming Soon!' and cutting them out of production, but lets fix them still."*

- `braille-e-reader.astro` (OAT Lab)
- `ideas-become-impact.astro`
- `barcode-scanner.astro`

They are complete and keep getting fixed. To ship one, move it back to its
route and flip `soon` off in `src/data/index-entries.js`:

    mv src/pages/_wip/braille-e-reader.astro src/pages/experience/

Anything linking to a parked page must render as "Coming Soon!" rather than a
dead link. `src/data/routes.js` has an `isLive()` helper for that.

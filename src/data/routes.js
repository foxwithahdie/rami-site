// Every route and the theme world its page actually uses.
// A prev/next card is painted from THIS map, not from its facet: Braille
// E-Reader is a FIRMWARE project but its page world is Tactile, so deriving
// the colour from the facet paints it Rehab orange and is simply wrong.
export const routeTheme = {
  '/':                                        'home',
  '/work/':                                   'home',
  '/about/':                                  'home',
  '/cv/':                                     'home',
  '/projects/rv32i/':                         'processor',
  '/projects/myo-amp/':                       'rehab',
  '/projects/biplup-run/':                    'handheld',
  '/experience/magfit/':                      'rehab',
  '/experience/e-braille-learning-device/':            'tactile',
  '/experience/ideas-become-impact/':         'nonprofit',
  '/experience/olin-shop/':                   'shop',
  '/experience/olin-shop/barcode-scanner/':   'shop-dark',
  '/making/':                                 'machined',
};
export const themeForHref = (href) => routeTheme[href] || 'home';

// Parked in src/pages/_wip/ and NOT built. Anything pointing at one of these
// must render as "Coming Soon!", never as a link, or the build ships dead URLs.
export const parked = new Set([
  // Ramzey, 2026-10-19: "magfit will be a next semester work" and "i will
  // likely still have magfit on projects but a website page". The CV entry
  // stays; only this page is parked.
  '/experience/magfit/',
  '/experience/ideas-become-impact/',
  '/experience/olin-shop/barcode-scanner/',
]);
export const isLive = (href) => !!href && !parked.has(href);

// ─────────────────────────────────────────────────────────────────────────
// THE WORK RING
// ─────────────────────────────────────────────────────────────────────────
// prev/next used to be hardcoded on each page, and the result was not a ring.
// Six pages formed a loop (magfit, rv32i, myo-amp, biplup-run, making,
// olin-shop) while e-braille, ideas-become-impact and barcode-scanner sat
// OUTSIDE it, pointing in and duplicating other pages' cards. Parking MagFit on
// 2026-10-19 then put a dead stop in the loop itself.
//
// One ordered list now, grouped the way the site groups facets, and every page
// derives its own neighbours from it. Order here is the only thing to edit.
export const workRing = [
  { href:'/experience/magfit/',                    facet:'FIRMWARE',      title:'MagFit Prosthetics',       blurb:'A socket that adjusts itself as a limb changes.' },
  { href:'/experience/e-braille-learning-device/', facet:'FIRMWARE',      title:'E-Braille Learning Device', blurb:'Braille you can afford, and that teaches you to read it.' },
  { href:'/projects/myo-amp/',                     facet:'FIRMWARE',      title:'Myo-Amp',                  blurb:"For people who can't grip after a stroke." },
  { href:'/projects/rv32i/',                       facet:'DIGITAL DESIGN',title:'RV32I Processor',          blurb:'A processor, built from the spec by hand.' },
  { href:'/experience/olin-shop/',                 facet:'IN THE SHOP',   title:'Olin Shop',                blurb:"Teaching people to use machines they've never touched." },
  { href:'/making/',                               facet:'IN THE SHOP',   title:'Making',                   blurb:'Four parts I drew and cut.' },
  { href:'/experience/olin-shop/barcode-scanner/', facet:'SOFTWARE',      title:'Shop Barcode System',      blurb:'So shop staff can maintain it after I leave.' },
  { href:'/experience/ideas-become-impact/',       facet:'TEACHING',      title:'Ideas Become Impact',      blurb:"Machine learning for kids who'd never met it." },
  { href:'/projects/biplup-run/',                  facet:'GAMES',         title:'biplup-run',               blurb:'A game on hardware with no operating system.' },
];

// Neighbours of `href`, wrapping at both ends.
//
// Parked pages are SKIPPED, so the ring you can actually click is always
// traversable: from any live page, walking next repeatedly returns you to where
// you started without ever landing on a Coming Soon card. Parked work is still
// visible on /work/ and the home reel, which is where it belongs.
//
// Pass {includeParked:true} to walk every entry instead.
export const neighbours = (href, { includeParked = false } = {}) => {
  const ring = includeParked ? workRing : workRing.filter((w) => isLive(w.href));
  if (ring.length === 0) return { prev: null, next: null };

  let i = ring.findIndex((w) => w.href === href);
  if (i === -1) {
    // Current page is parked, or is not work at all. Anchor to its position in
    // the FULL order so a parked page still shows sensible neighbours.
    const full = workRing.findIndex((w) => w.href === href);
    if (full === -1) return { prev: null, next: null };
    const after = workRing.slice(full + 1).concat(workRing.slice(0, full));
    const nextLive = after.find((w) => ring.includes(w));
    const prevLive = after.reverse().find((w) => ring.includes(w));
    return { prev: prevLive || null, next: nextLive || null };
  }
  if (ring.length === 1) return { prev: null, next: null };
  return {
    prev: ring[(i - 1 + ring.length) % ring.length],
    next: ring[(i + 1) % ring.length],
  };
};

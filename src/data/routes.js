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
  '/experience/braille-e-reader/':            'tactile',
  '/experience/ideas-become-impact/':         'nonprofit',
  '/experience/olin-shop/':                   'shop',
  '/experience/olin-shop/barcode-scanner/':   'shop-dark',
  '/making/':                                 'machined',
};
export const themeForHref = (href) => routeTheme[href] || 'home';

// Parked in src/pages/_wip/ and NOT built. Anything pointing at one of these
// must render as "Coming Soon!", never as a link, or the build ships dead URLs.
export const parked = new Set([
  '/experience/braille-e-reader/',
  '/experience/ideas-become-impact/',
  '/experience/olin-shop/barcode-scanner/',
]);
export const isLive = (href) => !!href && !parked.has(href);

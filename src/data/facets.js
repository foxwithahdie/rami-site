// Every facet wears its own theme world. Taken from the home page chips in
// Figma, each of which sets an explicit variable mode:
//   FIRMWARE -> Rehab, DIGITAL DESIGN -> Processor, IN THE SHOP -> Shop,
//   TEACHING -> Nonprofit, SOFTWARE -> Software, GAMES -> Handheld
export const facetTheme = {
  'FIRMWARE':       'rehab',
  'DIGITAL':        'processor',
  'DIGITAL DESIGN': 'processor',
  'IN THE SHOP':    'shop',
  'SHOP':           'shop',
  'CNC':            'machined',
  'TEACHING':       'nonprofit',
  'SOFTWARE':       'software',
  'GAMES':          'handheld',
  'INDEX':          'home',
  'ABOUT':          'home',
  'CV':             'home',
};
export const themeOf = (facet) => facetTheme[String(facet || '').toUpperCase()] || 'home';

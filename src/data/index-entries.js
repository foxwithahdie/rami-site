// The Work index. `href` present means the entry has its own page; `cv: true`
// means it lives on the CV instead. Copy verbatim from the Figma artboard.
export const groups = [
  { facet:'FIRMWARE', slug:'firmware', items:[
    { year:'2026 — now', title:'MagFit Prosthetics', role:'Firmware Lead  ·  Olin College', blurb:'A socket that adjusts itself as a limb changes.', href:'/experience/magfit/' },
    { year:'2025 — now', title:'Braille E-Reader', soon:true,   role:'Firmware Lead  ·  Olin Assistive Technology Lab', blurb:'Braille without the price tag.', href:'/experience/braille-e-reader/' },
    { year:'2025',       title:'Myo-Amp',            role:'Firmware and Integration Lead  ·  5-person team', blurb:"For people who can't grip after a stroke.", href:'/projects/myo-amp/' },
  ]},
  { facet:'DIGITAL DESIGN', slug:'digital', items:[
    { year:'2025', title:'RV32I RISC-V Processor', role:'4-person team  ·  Computer Architecture', blurb:'A processor, built from the spec by hand.', href:'/projects/rv32i/' },
  ]},
  { facet:'IN THE SHOP', slug:'shop', items:[
    { year:'2025 — now',  title:'Olin Shop', role:'Shop Assistant  ·  Summer Fellow', blurb:"Teaching people to use machines they've never touched.", href:'/experience/olin-shop/' },
    { year:'2025 — 2026', title:'Making',    role:'Fusion 360  ·  Tormach and ShopBot', blurb:'Four parts I drew and cut.', href:'/making/' },
  ]},
  { facet:'SOFTWARE', slug:'software', items:[
    { year:'2026 — now',  title:'The Shop Barcode Scanner', soon:true, role:'Backend Lead', blurb:'Every tool in the shop, checked in and out.', href:'/experience/olin-shop/barcode-scanner/' },
    { year:'2023 — 2024', title:'VoiceXP',                  role:'Sole author  ·  Innovators for Purpose', blurb:'A voice assistant on a Raspberry Pi, mostly fighting room noise.', cv:true },
    { year:'2023 — 2024', title:'Innovators for Purpose',   role:'Web Developer', blurb:'A nonprofit site, and the Next.js rewrite underneath it.', cv:true },
    { year:'2022 — 2023', title:'SmartBear',                role:'Service Desk Intern', blurb:'IT support at a company that makes developer testing tools.', cv:true },
  ]},
  { facet:'TEACHING', slug:'teaching', items:[
    { year:'2025 — now',  title:'Ideas Become Impact', soon:true,          role:'Co-Founder', blurb:"Machine learning for kids who'd never met it.", href:'/experience/ideas-become-impact/' },
    { year:'2025 — now',  title:'Course Assistant',             role:'Software Systems  ·  Software Design  ·  PIE', blurb:'Took Software Systems, then came back the next semester to teach it.', cv:true },
    { year:'2025 — 2026', title:'Software Practices Research',  role:'Student Researcher  ·  SIGCSE TS 2026', blurb:'What actually makes an engineer use the tools they were taught.', cv:true },
    { year:'2024',        title:'MIT Data Activism',            role:'Data Activist  ·  MIT Media Lab', blurb:'Surveillance in local schools, told back through data and art.', cv:true },
  ]},
  { facet:'GAMES', slug:'games', items:[
    { year:'2025', title:'biplup-run', role:'4-person team  ·  Software Systems', blurb:'A game on hardware with no operating system.', href:'/projects/biplup-run/' },
  ]},
];

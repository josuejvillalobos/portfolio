// Single source of truth for identity & links.
// Change a URL here once and the whole site updates — no hardcoding elsewhere.

// BASE_URL is '/portfolio/' on GitHub Pages, or '/' if you later add a custom domain.
const BASE = import.meta.env.BASE_URL

export const site = {
  name: 'Josue Villalobos',
  email: 'josue.villa778@gmail.com',
  github: 'https://github.com/josuejvillalobos',
  linkedin: 'https://www.linkedin.com/in/josue-joel-villalobos-alferez-b5aa0a2b4',
  // Put your PDF at  public/cv/josue-villalobos-cv.pdf
  cv: `${BASE}cv/josue-villalobos-cv.pdf`,
} as const
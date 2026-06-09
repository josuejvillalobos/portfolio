const BASE = import.meta.env.BASE_URL
const github = 'https://github.com/josuejvillalobos'

export const site = {
  name: 'Josue Villalobos',
  email: 'josue.villa778@gmail.com',
  github,
  linkedin: 'https://www.linkedin.com/in/josue-joel-villalobos-alferez-b5aa0a2b4',
  // Put your PDF at  public/cv/josue-villalobos-cv.pdf
  cv: `${BASE}cv/josue-villalobos-cv.pdf`,
} as const

export type Project = {
  id: string
  title: string
  meta?: string
  tagKey?: string
  metrics: { value: string; labelKey: string }[]
  demo?: string
  code: string
}

export const projects: Project[] = [
  {
    id: 'route',
    title: 'Intelligent Route Optimization',
    meta: 'MIAA · 2026',
    metrics: [
      { value: '−35%', labelKey: 'projects.route.k1' },
      { value: '−70%', labelKey: 'projects.route.k2' },
    ],
    demo: '#demos',
    code: github,
  },
  {
    id: 'bioterra',
    title: 'BioTerra — Smart Agriculture',
    tagKey: 'projects.bioterra.tag',
    metrics: [
      { value: '1st', labelKey: 'projects.bioterra.k1' },
      { value: 'RT', labelKey: 'projects.bioterra.k2' },
    ],
    code: github,
  },
  {
    id: 'hr',
    title: 'HR & Organizational System',
    meta: 'MIAA · 2026',
    metrics: [
      { value: '−60%', labelKey: 'projects.hr.k1' },
      { value: 'RBAC', labelKey: 'projects.hr.k2' },
    ],
    code: github,
  },
  {
    id: 'customs',
    title: 'Customs Quotation Automation',
    meta: 'Datallizer · 2024',
    metrics: [
      { value: '−30%', labelKey: 'projects.customs.k1' },
      { value: '0', labelKey: 'projects.customs.k2' },
    ],
    code: github,
  },
]
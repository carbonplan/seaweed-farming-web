export const NAN = 9.969209968386869e36

export const COLORMAPS_MAP = {
  mitigationCost: { clim: [250, 2000], reversed: true },
  cost: { clim: [250, 2000], reversed: true },
  benefit: { clim: [0, 0.45], reversed: false },
  depth: { clim: [0, 10000], reversed: false },
  growth: { clim: [0, 5000], reversed: false },
  nharv: { clim: [1, 8], reversed: false },
  wave_height: { clim: [0, 5], reversed: false },
  lineDensity: { clim: [0, 1000000], reversed: false },
  d2p: { clim: [0, 5000], reversed: false },
  d2sink: { clim: [0, 2500], reversed: false },
  fseq: { clim: [0, 1], reversed: false },
  species_preferred: { clim: [0, 4], reversed: false },
}

export const UNITS_MAP = {
  mitigationCost: {
    products: '$ / tCO₂e',
    sinking: '$ / tCO₂',
  },
  cost: '$ / ton DW',
  benefit: {
    products: 'tCO₂e / ton DW',
    sinking: 'tCO₂ / ton DW',
  },
  depth: 'm',
  growth: 'tons DW / km²',
  nharv: 'count / year',
  wave_height: 'm',
  lineDensity: 'm / km²',
  d2p: 'km',
  d2sink: 'km',
  fseq: '%',
}

export const LABEL_MAP = {
  mitigationCost: 'mitigation cost',
  cost: 'project cost',
  benefit: 'climate benefit',
  depth: 'depth',
  growth: 'growth',
  nharv: 'harvests',
  wave_height: 'wave height',
  lineDensity: 'line density',
  d2p: 'distance to port',
  d2sink: 'distance to sink',
  fseq: 'fraction sequestered',
  species_preferred: 'preferred species',
}

export const TARGETS = ['sinking', 'products']

export const GROWTH_MODELS = ['low', 'high']

export const SPECIES = [
  'eucheuma',
  'sargassum',
  'porphyra',
  'saccharina',
  'macrocystis',
]

export const LINE_DENSITY_MAPPING = {
  eucheuma: 5000000.0,
  sargassum: 751880.0,
  porphyra: 20000000.0,
  saccharina: 666667.0,
  macrocystis: 666667.0,
}

export const EQUIPMENT_MAPPING = {
  eucheuma: 1231.87,
  sargassum: 185.24,
  porphyra: 4927.5,
  saccharina: 164.25,
  macrocystis: 164.25,
}

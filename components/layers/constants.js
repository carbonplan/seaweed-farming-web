export const CLIM_MAP = {
  cost: [0, 750],
  benefit: [0, 1],
  depth: [0, 10000],
  growth: [0, 5000],
  nharv: [0, 5],
  wave_height: [0, 5],
  lineDensity: [0, 1000000],
  d2p: [0, 5000],
  d2sink: [0, 5000],
  fseq: [0, 1],
}

export const UNITS_MAP = {
  cost: '$ / ton DW',
  benefit: 'tCO₂e / ton DW',
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
  cost: 'net cost',
  benefit: 'climate benefit',
  depth: 'depth',
  growth: 'growth',
  nharv: 'harvests',
  wave_height: 'wave height',
  lineDensity: 'line density',
  d2p: 'distance to port',
  d2sink: 'distance to sink',
  fseq: 'fraction sequestered',
}

export const TARGETS = ['sinking', 'products']

export const GROWTH_MODELS = ['low', 'high']

export const SPECIES = [
  'preferred',
  'sargassum',
  'eucheuma',
  'macrocystis',
  'porphyra',
  'saccharina',
]

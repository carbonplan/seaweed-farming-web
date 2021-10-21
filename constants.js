export const NAN = 9.969209968386869e36

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
  species_preferred: [0, 4],
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

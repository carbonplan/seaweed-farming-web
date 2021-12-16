export const NAN = 9.969209968386869e36

export const COLORMAPS_MAP = {
  mitigationCost: { clim: [250, 2000], reversed: true },
  cost: { clim: [250, 2000], reversed: true },
  benefit: { clim: [0, 2], reversed: false },
  depth: { clim: [0, 6000], reversed: false },
  growth: { clim: [0, 5000], reversed: false },
  nharv: { clim: [1, 8], reversed: false },
  wave_height: { clim: [0, 5], reversed: false },
  d2p: { clim: [0, 2000], reversed: false },
  d2sink: { clim: [0, 1000], reversed: false },
  fseq: { clim: [0.7, 1], reversed: false },
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
  d2p: 'km',
  d2sink: 'km',
  fseq: '%',
}

export const LABEL_MAP = {
  mitigationCost: {
    products: 'Mitigation cost',
    sinking: 'Removal cost',
  },
  cost: 'Project cost',
  benefit: 'Climate benefit',
  depth: 'Depth',
  growth: 'Growth',
  nharv: 'Harvests',
  wave_height: 'Wave height',
  d2p: 'Distance to port',
  d2sink: 'Distance to sink',
  fseq: 'Fraction sequestered',
  species_preferred: 'Preferred species',
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

export const PARAMETER_MAPPING = {
  productValue: {
    id: 'productValue',
    min: 10,
    max: 600,
    step: 10,
    label: 'Product value',
    units: '$ / ton DW',
  },
  capex: {
    id: 'capex',
    min: 170630,
    max: 969626,
    step: 10,
    label: 'Capex',
    units: '$ / km² / year',
  },
  lineCost: {
    id: 'lineCost',
    min: 0.06,
    max: 1.45,
    step: 0.01,
    label: 'Line cost',
    units: '$ / m',
  },
  opex: {
    id: 'opex',
    min: 137119,
    max: 295532,
    step: 100,
    label: 'Opex',
    units: '$ / km² / year',
  },
  transportCost: {
    id: 'transportCost',
    min: 0.11,
    max: 0.34,
    step: 0.01,
    label: 'Transport cost',
    units: '$ / ton / km',
  },
  harvestCost: {
    id: 'harvestCost',
    min: 124485,
    max: 394780,
    step: 100,
    label: 'Harvest costs',
    units: '$ / km² / harvest',
  },
  conversionCost: {
    id: 'conversionCost',
    min: 24,
    max: 72,
    step: 1,
    label: 'Conversion cost',
    units: '$ / ton DW',
  },
  transportEmissions: {
    id: 'transportEmissions',
    min: 0.0,
    max: 0.0000427,
    step: 0.0000001,
    label: 'Transport emissions',
    units: 'tCO₂e / ton DW / km',
  },
  maintenanceEmissions: {
    id: 'maintenanceEmissions',
    min: 0.0,
    max: 0.005229,
    step: 0.000001,
    label: 'Maintenance emissions',
    units: 'tCO₂e / km',
  },
  conversionEmissions: {
    id: 'conversionEmissions',
    min: 0.0,
    max: 0.0085,
    step: 0.0001,
    label: 'Conversion emissions',
    units: 'tCO₂e / ton DW',
  },
  avoidedEmissions: {
    id: 'avoidedEmissions',
    min: 0.1,
    max: 6.25,
    step: 0.05,
    label: 'Avoided emissions',
    units: 'tCO₂e / ton DW',
  },
  removalRate: {
    id: 'removalRate',
    min: 0.4,
    max: 1,
    step: 0.05,
    format: (d) => d * 100,
    label: 'Removal rate',
    units: '%',
  },
}

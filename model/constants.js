export const SPECIES = [
  'eucheuma',
  'sargassum',
  'porphyra',
  'saccharina',
  'macrocystis',
]
export const SPECIES_EQUIPMENT_COSTS = {
  eucheuma: 1231.87,
  sargassum: 185.24,
  porphyra: 4927.5,
  saccharina: 164.25,
  macrocystis: 164.25,
}

export const SPECIES_LINE_DENSITIES = {
  eucheuma: 5000000.0,
  sargassum: 751880.0,
  porphyra: 20000000.0,
  saccharina: 666667.0,
  macrocystis: 666667.0,
}

export const LAYER_UNITS = {
  mitigationCost: {
    products: '$ / tCO₂e',
    sinking: '$ / tCO₂',
  },
  cost: {
    products: '$ / ton DW',
    sinking: '$ / ton DW',
  },
  benefit: {
    products: 'tCO₂e / ton DW',
    sinking: 'tCO₂ / ton DW',
  },
  depth: {
    products: 'm',
    sinking: 'm',
  },
  seaweed_dw: {
    products: 'tons DW / km²',
    sinking: 'tons DW / km²',
  },
  nharv: {
    products: 'count / year',
    sinking: 'count / year',
  },
  wave_height: {
    products: 'm',
    sinking: 'm',
  },
  d2p: {
    products: 'km',
    sinking: 'km',
  },
  d2sink: {
    products: 'km',
    sinking: 'km',
  },
  fseq: {
    products: '',
    sinking: '',
  },
  fseq_transport: {
    products: '',
    sinking: '',
  },
  species: {
    products: '',
    sinking: '',
  },
}

export const LAYER_UNIFORMS = {
  cost: 'costLayer',
  mitigationCost: 'mitigationCostLayer',
  benefit: 'benefitLayer',
  depth: 'depthLayer',
  seaweed_dw: 'seaweed_dwLayer',
  nharv: 'nharvLayer',
  wave_height: 'wave_heightLayer',
  d2p: 'd2pLayer',
  d2sink: 'd2sinkLayer',
  fseq: 'fseqLayer',
  species_preferred: 'species_preferredLayer',
}

export const PARAMETERS = {
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
    min: 10000,
    max: 1000000,
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
    tooltip:
      'The cost of transporting a ton of macroalgae (dry weight) one km. Applied to either the distance to port or distance to sink.',
    units: '$ / ton DW / km',
  },
  harvestCost: {
    id: 'harvestCost',
    min: 124485,
    max: 394780,
    step: 100,
    label: 'Harvest costs',
    tooltip:
      'The cost of converting a ton of macroalgae (dry weight) into a valuable product.',
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
    tooltip:
      'The emissions associated with transporting a ton of macroalgae (dry weight) one km. Applied to either the distance to port or distance to sink. Calculated with [TK: GWP100].',
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
    tooltip:
      'The emissions associated with converting a ton of macroalgae (dry weight) into a valuable product. Calculated with [TK: GWP100].',
    units: 'tCO₂e / ton DW',
  },
  avoidedEmissions: {
    id: 'avoidedEmissions',
    min: 0.1,
    max: 6.25,
    step: 0.05,
    label: 'Avoided emissions',
    tooltip:
      'The emissions displaced by the use of a macroalgae-derived product. Calculated with [TK: GWP100].',
    units: 'tCO₂e / ton DW',
  },
  removalRate: {
    id: 'removalRate',
    min: 0.4,
    max: 1,
    step: 0.01,
    label: 'Removal rate',
    units: 'fraction',
  },
}

export const LAYER_PARAMETERS = {
  mitigationCost: {
    products: ['productValue'],
    sinking: [],
    shared: [],
  },
  cost: {
    shared: ['capex', 'lineCost', 'opex', 'transportCost', 'harvestCost'],
    products: ['conversionCost'],
    sinking: [],
  },
  benefit: {
    shared: ['transportEmissions', 'maintenanceEmissions'],
    products: ['avoidedEmissions', 'conversionEmissions'],
    sinking: ['removalRate'],
  },
}

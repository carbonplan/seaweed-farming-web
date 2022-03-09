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
    min: 400,
    max: 800,
    step: 10,
    label: 'Product value',
    units: '$ / ton DW',
    tooltip: 'Dried seaweed market value for use in products.',
  },
  capex: {
    id: 'capex',
    min: 10000,
    max: 1000000,
    step: 10,
    label: 'Capital expenditures',
    units: '$ / km² / year',
    tooltip:
      'The cost of capital equipment including anchors, buoys, structural rope, and boats.',
  },
  lineCost: {
    id: 'lineCost',
    min: 0.05,
    max: 1.45,
    step: 0.01,
    label: 'Line cost',
    units: '$ / m',
    tooltip: 'The cost of seeded seaweed growth line.',
  },
  opex: {
    id: 'opex',
    min: 134000,
    max: 297000,
    step: 1000,
    label: 'Operating expenses',
    units: '$ / km² / year',
    tooltip:
      'The cost of operating and maintenance materials, licensing and insurance, and labor (excluding transport and harvest labor).',
  },
  transportCost: {
    id: 'transportCost',
    min: 0.1,
    max: 0.35,
    step: 0.01,
    label: 'Transport cost',
    tooltip:
      'The cost of transporting a ton of seaweed (dry weight) one km. Applied to either the distance to port or distance to sink.',
    units: '$ / ton DW / km',
  },
  harvestCost: {
    id: 'harvestCost',
    min: 120000,
    max: 400000,
    step: 10000,
    label: 'Harvest costs',
    tooltip:
      'The cost to harvest seaweed, including harvest boats and harvesting labor.',
    units: '$ / km² / harvest',
  },
  conversionCost: {
    id: 'conversionCost',
    min: 20,
    max: 80,
    step: 1,
    label: 'Conversion cost',
    units: '$ / ton DW',
    tooltip:
      'The cost of converting a ton of macroalgae (dry weight) into a valuable product.',
  },
  transportEmissions: {
    id: 'transportEmissions',
    min: 0.0,
    max: 0.000045,
    step: 0.000001,
    label: 'Transport emissions',
    tooltip:
      'The emissions associated with transporting a ton of seaweed (dry weight) one km. Applied to either the distance to port or distance to sink. Calculated with [TK: GWP100].',
    units: 'tCO₂e / ton DW / km',
  },
  maintenanceEmissions: {
    id: 'maintenanceEmissions',
    min: 0.0,
    max: 0.0035,
    step: 0.0001,
    label: 'Maintenance emissions',
    units: 'tCO₂e / km',
    tooltip:
      'The emissions from boat travel to and around the seaweed farm for regular maintenance.',
  },
  conversionEmissions: {
    id: 'conversionEmissions',
    min: 0.0,
    max: 0.01,
    step: 0.001,
    label: 'Conversion emissions',
    tooltip:
      'The emissions associated with converting a ton of seaweed (dry weight) into a valuable product. Calculated with [TK: GWP100].',
    units: 'tCO₂e / ton DW',
  },
  avoidedEmissions: {
    id: 'avoidedEmissions',
    min: 0.7,
    max: 6,
    step: 0.1,
    label: 'Avoided emissions',
    tooltip:
      'The emissions displaced by the use of a seaweed-derived product. Calculated with [TK: GWP100].',
    units: 'tCO₂e / ton DW',
  },
  removalRate: {
    id: 'removalRate',
    min: 0.4,
    max: 1,
    step: 0.01,
    label: 'Atmospheric removal fraction',
    units: 'fraction',
    tooltip:
      'The fraction of carbon in seaweed that corresponds to an equivalent amount of additional carbon removed from the atmosphere. This ratio is not necessarily 1, due to uncertainties in the rates of air-sea gas exchange and ocean overturning circulation compared to seaweed uptake of dissolved carbon in the ocean. The atmospheric removal fraction range also represents uncertainty in the impact of seaweed farming on the carbon sink from natural phytoplankton growth, which could be reduced due to nutrient competition between seaweed and phytoplankton.',
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

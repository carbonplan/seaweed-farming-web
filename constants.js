export const NAN = 9.969209968386869e36

export const COLORMAPS_MAP = {
  mitigationCost: { clim: [100, 10000], step: 50, colormapName: 'cool' },
  cost: { clim: [100, 10000], step: 50, colormapName: 'cool' },
  benefit: { clim: [0, 2], step: 0.1, colormapName: 'cool' },
  depth: { clim: [0, 6000], step: 10, colormapName: 'cool' },
  seaweed_dw: { clim: [0, 5000], step: 10, colormapName: 'cool' },
  nharv: { clim: [1, 8], step: 0.1, colormapName: 'cool' },
  wave_height: { clim: [0, 3], step: 0.05, colormapName: 'cool' },
  d2p: { clim: [0, 2000], step: 10, colormapName: 'cool' },
  d2sink: { clim: [0, 1000], step: 10, colormapName: 'cool' },
  fseq: { clim: [0.75, 1], step: 0.01, colormapName: 'cool' },
  species_preferred: { clim: [0, 4], step: 0.1, colormapName: 'cool' },
}

export const LABEL_MAP = {
  mitigationCost: {
    products: 'Mitigation cost',
    sinking: 'Removal cost',
  },
  cost: 'Production cost',
  depth: 'Depth',
  seaweed_dw: 'Seaweed biomass',
  nharv: 'Harvests',
  wave_height: 'Wave height',
  d2p: 'Distance to port',
  d2sink: 'Distance to sink',
  fseq: 'Fraction sequestered',
  species_preferred: 'Preferred seaweed type',
}

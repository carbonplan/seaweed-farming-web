import { createContext, useContext, useMemo, useState } from 'react'

const initTarget = {
  sinking: true,
  products: false,
}

const initGrowthModel = {
  low: true,
  high: false,
}

const initSeaweedSpecies = {
  preferred: true,
  sargassum: false,
  eucheuma: false,
  macrocystis: false,
  porphyra: false,
  saccharina: false,
}

const LayersContext = createContext(null)

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('cost')
  const [target, setTarget] = useState(initTarget)
  const [species, setSpecies] = useState(initSeaweedSpecies)
  const [growthModel, setGrowthModel] = useState(initGrowthModel)
  const [mask, setMask] = useState(false)

  return (
    <LayersContext.Provider
      value={{
        layer,
        setLayer,
        target,
        setTarget,
        species,
        setSpecies,
        growthModel,
        setGrowthModel,
        mask,
        setMask,
      }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export const useRawUniformValues = () => {
  const value = useContext(LayersContext)
  return value
}

const emptyLayers = {
  costLayer: 0,
  benefitLayer: 0,
  depthLayer: 0,
  growthLayer: 0,
  nharvLayer: 0,
  waveHeightLayer: 0,
  lineDensityLayer: 0,
  d2pLayer: 0,
}

export const useLayers = () => {
  const { layer, target, species, growthModel, mask } = useRawUniformValues()

  const layerUniforms = useMemo(
    () => ({ ...emptyLayers, [`${layer}Layer`]: 1 }),
    [layer]
  )

  const speciesUniforms = useMemo(
    () =>
      Object.keys(species).reduce((accum, speciesName) => {
        accum[speciesName] = species[speciesName] ? 1 : 0
        return accum
      }, {}),
    [species]
  )

  const uniforms = {
    ...layerUniforms,
    ...speciesUniforms,
    mask: mask ? 1 : 0,
    target,
  }

  const speciesDefinition = `
  float growth;
  float nharv;

  if (preferred == 1.0) {
      growth = harv_preferred;
      nharv = nharv_preferred;
  }
  if (preferred == 1.0) {
      growth = harv_preferred;
      nharv = nharv_preferred;
  }
  if (sargassum == 1.0) {
      growth = harv_sargassum;
      nharv = nharv_sargassum;
  }
  if (eucheuma == 1.0) {
      growth = harv_eucheuma;
      nharv = nharv_eucheuma;
  }
  if (macrocystis == 1.0) {
      growth = harv_macrocystis;
      nharv = nharv_macrocystis;
  }
  if (porphyra == 1.0) {
      growth = harv_porphyra;
      nharv = nharv_porphyra;
  }
  if (saccharina == 1.0) {
      growth = harv_saccharina;
      nharv = nharv_saccharina;
  }
  `

  return { layer, target, uniforms, speciesDefinition }
}

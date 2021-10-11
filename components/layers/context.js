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
  d2sinkLayer: 0,
  fseqLayer: 0,
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

  const targetValue = useMemo(
    () => Object.keys(target).find((k) => target[k]),
    [target]
  )

  const speciesValue = useMemo(
    () => Object.keys(species).find((k) => species[k]),
    [species]
  )

  const uniforms = {
    ...layerUniforms,
    ...speciesUniforms,
    productsTarget: target.products ? 1 : 0,
    sinkingTarget: target.sinking ? 1 : 0,
    includeMask: mask ? 1 : 0,
  }

  return { layer, uniforms, target: targetValue, species: speciesValue }
}

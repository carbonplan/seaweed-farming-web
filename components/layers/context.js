import { createContext, useContext, useMemo, useState } from 'react'
import { GROWTH_MODELS, SPECIES } from './constants'

const LayersContext = createContext(null)

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('benefit')
  const [target, setTarget] = useState('sinking')
  const [species, setSpecies] = useState(SPECIES[0])
  const [growthModel, setGrowthModel] = useState(GROWTH_MODELS[0])
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

export const LAYER_UNIFORMS = [
  'costLayer',
  'benefitLayer',
  'depthLayer',
  'growthLayer',
  'nharvLayer',
  'wave_heightLayer',
  'lineDensityLayer',
  'd2pLayer',
  'd2sinkLayer',
  'fseqLayer',
]

export const useLayers = () => {
  const { layer, target, species, growthModel, mask } = useRawUniformValues()

  const layerUniforms = useMemo(
    () =>
      LAYER_UNIFORMS.reduce((uniforms, uniformName) => {
        uniforms[uniformName] = uniformName === `${layer}Layer` ? 1 : 0
        return uniforms
      }, {}),
    [layer]
  )

  const speciesUniforms = useMemo(
    () =>
      SPECIES.reduce((accum, speciesName) => {
        accum[speciesName] = species === speciesName ? 1 : 0
        return accum
      }, {}),
    [species]
  )

  const uniforms = {
    ...layerUniforms,
    ...speciesUniforms,
    productsTarget: target === 'products' ? 1 : 0,
    sinkingTarget: target === 'sinking' ? 1 : 0,
    includeMask: mask ? 1 : 0,
  }

  return { layer, uniforms, target, species }
}

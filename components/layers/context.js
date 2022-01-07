import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { GROWTH_MODELS } from '../../constants'

const LayersContext = createContext(null)

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('mitigationCost')
  const [target, setTarget] = useState('sinking')
  const [sensitiveAreaMask, setSensitiveAreaMask] = useState(0)
  const [growthModel, setGrowthModel] = useState(GROWTH_MODELS[0])

  const resetLayers = useCallback(() => {
    setLayer('mitigationCost')
    setTarget('sinking')
    setSensitiveAreaMask(0)
  }, [])

  return (
    <LayersContext.Provider
      value={{
        layer,
        setLayer,
        target,
        setTarget,
        growthModel,
        setGrowthModel,
        sensitiveAreaMask,
        setSensitiveAreaMask,
        resetLayers,
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
  'mitigationCostLayer',
  'benefitLayer',
  'depthLayer',
  'growthLayer',
  'nharvLayer',
  'wave_heightLayer',
  'd2pLayer',
  'd2sinkLayer',
  'fseqLayer',
  'species_preferredLayer',
]

export const useLayers = () => {
  const {
    layer,
    target,
    resetLayers,
    sensitiveAreaMask,
  } = useRawUniformValues()

  const layerUniforms = useMemo(
    () =>
      LAYER_UNIFORMS.reduce((uniforms, uniformName) => {
        uniforms[uniformName] = uniformName === `${layer}Layer` ? 1 : 0
        return uniforms
      }, {}),
    [layer]
  )

  const uniforms = {
    ...layerUniforms,
    sensitiveAreaMask,
    productsTarget: target === 'products' ? 1 : 0,
    sinkingTarget: target === 'sinking' ? 1 : 0,
  }

  return { layer, uniforms, target, sensitiveAreaMask, resetLayers }
}

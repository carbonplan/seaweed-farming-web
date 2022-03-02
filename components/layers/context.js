import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LAYER_UNIFORMS } from '../../model'

const LayersContext = createContext(null)

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('mitigationCost')
  const [target, setTarget] = useState('sinking')
  const [sensitiveAreaMask, setSensitiveAreaMask] = useState(0)

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

export const useLayers = () => {
  const {
    layer,
    target,
    resetLayers,
    sensitiveAreaMask,
  } = useRawUniformValues()

  const layerUniforms = useMemo(
    () =>
      Object.keys(LAYER_UNIFORMS).reduce((uniforms, l) => {
        const uniformName = LAYER_UNIFORMS[l]
        uniforms[uniformName] = layer === l ? 1 : 0
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

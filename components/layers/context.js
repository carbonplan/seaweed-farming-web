import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LAYER_UNIFORMS } from '../../model'
import { COLORMAPS_MAP } from '../../constants'

const LayersContext = createContext(null)

const INITIAL_CLIMS = Object.entries(COLORMAPS_MAP).reduce((a, d) => {
  a[d[0]] = d[1].clim
  return a
}, {})

export const LayersProvider = ({ children }) => {
  const [layer, setLayer] = useState('mitigationCost')
  const [target, setTarget] = useState('sinking')
  const [sensitiveAreaMask, setSensitiveAreaMask] = useState(0)
  const [clims, setClims] = useState(INITIAL_CLIMS)

  const resetLayers = useCallback(() => {
    setLayer('mitigationCost')
    setTarget('sinking')
    setSensitiveAreaMask(0)
    setClims(INITIAL_CLIMS)
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
        clims,
        setClims,
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
    clims,
    setClims,
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

  return {
    layer,
    clim: clims[layer],
    setClim: (value) => setClims((prev) => ({ ...prev, [layer]: value })),
    uniforms,
    target,
    sensitiveAreaMask,
    resetLayers,
  }
}

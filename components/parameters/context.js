import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { PARAMETERS } from '../../model'

const ParameterContext = createContext(null)

const DEFAULT_OUTLOOK = 'optimistic'
const DEFAULT_PRODUCT = 'food'

const getParameters = (outlook, product) => {
  return Object.keys(PARAMETERS).reduce((accum, name) => {
    const { presets } = PARAMETERS[name]
    if (typeof presets[outlook] === 'number') {
      accum[name] = presets[outlook]
    } else {
      accum[name] = presets[outlook][product]
    }
    return accum
  }, {})
}

export const ParameterProvider = ({ children }) => {
  const [values, setValues] = useState(() =>
    getParameters(DEFAULT_OUTLOOK, DEFAULT_PRODUCT)
  )
  const [outlook, setOutlook] = useState(DEFAULT_OUTLOOK)
  const [product, setProduct] = useState(DEFAULT_PRODUCT)

  const presets = useMemo(() => ({ outlook, product }), [outlook, product])
  const setPresets = useCallback(
    (obj) => {
      if (obj.product) setProduct(obj.product)
      if (obj.outlook) setOutlook(obj.outlook)
      setValues(getParameters(obj.outlook || outlook, obj.product || product))
    },
    [outlook, product]
  )

  const setParameters = useCallback(
    (obj) => {
      setValues({ ...values, ...obj })
    },
    [values]
  )
  const resetParameters = useCallback(() => {
    setValues(getParameters(DEFAULT_OUTLOOK, DEFAULT_PRODUCT))
    setOutlook(DEFAULT_OUTLOOK)
    setProduct(DEFAULT_PRODUCT)
  }, [])

  return (
    <ParameterContext.Provider
      value={{
        ...values,
        presets,
        setPresets,
        setParameters,
        resetParameters,
      }}
    >
      {children}
    </ParameterContext.Provider>
  )
}

export const useParameters = () => {
  return useContext(ParameterContext)
}

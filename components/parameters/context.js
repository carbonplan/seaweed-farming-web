import { createContext, useCallback, useContext, useState } from 'react'
import { PARAMETER_MAPPING } from '../../constants'

const ParameterContext = createContext(null)

const getInitialParameters = () =>
  Object.keys(PARAMETER_MAPPING).reduce((accum, key) => {
    const { min, max } = PARAMETER_MAPPING[key]
    accum[key] = (min + max) / 2
    return accum
  }, {})

export const ParameterProvider = ({ children }) => {
  const [values, setValues] = useState(getInitialParameters)
  const setParameters = useCallback(
    (obj) => {
      setValues({ ...values, ...obj })
    },
    [values]
  )
  const resetParameters = useCallback(() => {
    setValues(getInitialParameters())
  }, [])

  return (
    <ParameterContext.Provider
      value={{
        ...values,
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

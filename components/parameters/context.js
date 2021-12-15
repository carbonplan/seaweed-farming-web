import { createContext, useCallback, useContext, useState } from 'react'

const ParameterContext = createContext(null)

const initialParameters = {
  capex: 170630,
  lineCost: 0.06,
  opex: 137119,
  harvestCost: 124485,
  depthFactor: 0,
  waveFactor: 0,
  transportCost: 0.11,
  conversionCost: 50,
  productValue: 100,
  transportEmissions: 0.00003,
  conversionEmissions: 0.005,
  avoidedEmissions: 0.5,
  removalRate: 0.6,
  maintenanceEmissions: 0.0009075,
}
export const ParameterProvider = ({ children }) => {
  const [values, setValues] = useState(initialParameters)
  const setParameters = useCallback(
    (obj) => {
      setValues({ ...values, ...obj })
    },
    [values]
  )
  const resetParameters = useCallback(() => {
    setValues(initialParameters)
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

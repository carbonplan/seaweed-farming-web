import { createContext, useCallback, useContext, useState } from 'react'

const ParameterContext = createContext(null)

const initialParameters = {
  capex: 170630,
  lineCost: 0.06,
  opex: 63004,
  labor: 37706,
  harvestCost: 124485,
  depthFactor: 0,
  waveFactor: 0,
  insurance: 35000,
  license: 1409,
  transportCost: 0.11,
  conversionCost: 50,
  productValue: 100,
  transportEmissions: 0.00003,
  conversionEmissions: 0.005,
  avoidedEmissions: 0.5,
  sequestrationRate: 0.95,
  removalRate: 0.6,
}
export const ParameterProvider = ({ children }) => {
  const [values, setValues] = useState(initialParameters)
  const handleChange = useCallback(
    (key, value) => {
      setValues({ ...values, [key]: value })
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
        setParameter: handleChange,
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

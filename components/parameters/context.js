import { createContext, useContext, useState } from 'react'

export const ParameterContext = createContext(null)

export const ParameterProvider = ({ children }) => {
  const [capex, setCapex] = useState(170630)
  const [lineCost, setLineCost] = useState(0.06)
  const [opex, setOpex] = useState(63004)
  const [labor, setLabor] = useState(37706)
  const [harvestCost, setHarvestCost] = useState(124485)
  const [depthFactor, setDepthFactor] = useState(0)
  const [waveFactor, setWaveFactor] = useState(0)
  const [insurance, setInsurance] = useState(35000)
  const [license, setLicense] = useState(1409)

  const [transportCost, setTransportCost] = useState(0.11)
  const [conversionCost, setConversionCost] = useState(50)
  const [productValue, setProductValue] = useState(100)
  const [sinkingValue, setSinkingValue] = useState(0)

  const [transportEmissions, setTransportEmissions] = useState(0.00003)

  const [conversionEmissions, setConversionEmissions] = useState(0.005)
  const [avoidedEmissions, setAvoidedEmissions] = useState(0.5)
  const [sequestrationRate, setSequestrationRate] = useState(0.95)
  const [removalRate, setRemovalRate] = useState(0.6)

  return (
    <ParameterContext.Provider
      value={{
        capex,
        setCapex,
        lineCost,
        setLineCost,
        opex,
        setOpex,
        labor,
        setLabor,
        harvestCost,
        setHarvestCost,
        depthFactor,
        setDepthFactor,
        waveFactor,
        setWaveFactor,
        insurance,
        setInsurance,
        license,
        setLicense,
        transportCost,
        setTransportCost,
        conversionCost,
        setConversionCost,
        productValue,
        setProductValue,
        sinkingValue,
        setSinkingValue,
        transportEmissions,
        setTransportEmissions,
        conversionEmissions,
        setConversionEmissions,
        avoidedEmissions,
        setAvoidedEmissions,
        sequestrationRate,
        setSequestrationRate,
        removalRate,
        setRemovalRate,
      }}
    >
      {children}
    </ParameterContext.Provider>
  )
}

export const useParameters = () => {
  const {
    capex,
    lineCost,
    opex,
    labor,
    harvestCost,
    depthFactor,
    waveFactor,
    insurance,
    license,
    transportCost,
    conversionCost,
    productValue,
    sinkingValue,
    transportEmissions,
    conversionEmissions,
    avoidedEmissions,
    sequestrationRate,
    removalRate,
  } = useContext(ParameterContext)

  return {
    capex,
    lineCost,
    opex,
    labor,
    harvestCost,
    depthFactor,
    waveFactor,
    insurance,
    license,
    transportCost,
    conversionCost,
    productValue,
    sinkingValue,
    transportEmissions,
    conversionEmissions,
    avoidedEmissions,
    sequestrationRate,
    removalRate,
  }
}

import { createContext, useContext, useState } from 'react'
import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Expander } from '@carbonplan/components'
import Parameter from './parameter'

const ParameterContext = createContext(null)

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
  const [setupEmissions, setSetupEmissions] = useState(5)
  const [harvestTransportEmissions, setHarvestTransportEmissions] = useState(
    0.00003
  )

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
        setupEmissions,
        setSetupEmissions,
        harvestTransportEmissions,
        setHarvestTransportEmissions,
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
    setupEmissions,
    harvestTransportEmissions,
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
    setupEmissions,
    harvestTransportEmissions,
  }
}

const Parameters = ({ sx }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx

  const [expandedParameters, setExpandedParameters] = useState(false)
  const {
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
    setupEmissions,
    setSetupEmissions,
    harvestTransportEmissions,
    setHarvestTransportEmissions,
    sequestrationRate,
    setSequestrationRate,
    removalRate,
    setRemovalRate,
  } = useContext(ParameterContext)

  return (
    <Box sx={sxProps}>
      <Parameter
        min={0.0000142}
        max={0.0000426}
        step={0.0000001}
        value={transportEmissions}
        setValue={setTransportEmissions}
        label={'Transport emissions'}
      />

      <Parameter
        min={0.0011}
        max={0.0085}
        step={0.0001}
        value={conversionEmissions}
        setValue={setConversionEmissions}
        label={'Conversion emissions'}
      />

      <Parameter
        min={0.1}
        max={1}
        step={0.05}
        value={avoidedEmissions}
        setValue={setAvoidedEmissions}
        label={'Avoided emissions'}
      />

      <Parameter
        min={1}
        max={10}
        step={0.1}
        value={setupEmissions}
        setValue={setSetupEmissions}
        label={'Setup emissions'}
      />

      <Parameter
        min={0.0000142}
        max={0.00004268}
        step={0.0000001}
        value={harvestTransportEmissions}
        setValue={setHarvestTransportEmissions}
        label={'Harvest transport emissions'}
      />

      <Parameter
        min={0.9}
        max={1}
        step={0.01}
        value={sequestrationRate}
        setValue={setSequestrationRate}
        label={'Sequestration rate'}
      />

      <Parameter
        min={0.5}
        max={1}
        step={0.05}
        value={removalRate}
        setValue={setRemovalRate}
        label={'Removal rate'}
      />

      <>
        <Box
          sx={{
            mt: [1, 1, 1, 2],
            cursor: 'pointer',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover > #expander': { stroke: 'primary' },
              '&:hover > #label': { color: 'primary' },
            },
          }}
          onClick={() => setExpandedParameters(!expandedParameters)}
        >
          <Expander
            value={expandedParameters}
            id='expander'
            sx={{ position: 'relative', top: ['2px'], left: ['-4px'] }}
          />{' '}
          <Box
            as='span'
            id='label'
            sx={{ color: 'secondary', transition: 'color 0.15s' }}
          >
            More parameters
          </Box>
        </Box>
        <AnimateHeight
          duration={150}
          height={expandedParameters ? 'auto' : 0}
          easing={'linear'}
        >
          {expandedParameters && (
            <Box mt={[3]}>
              <Parameter
                min={170630}
                max={969626}
                step={10}
                value={capex}
                setValue={setCapex}
                label={'Capex'}
              />

              <Parameter
                min={0.06}
                max={1.45}
                step={0.01}
                value={lineCost}
                setValue={setLineCost}
                label={'Line cost'}
              />

              <Parameter
                min={63004}
                max={69316}
                step={100}
                value={opex}
                setValue={setOpex}
                label={'Opex'}
              />

              <Parameter
                min={0.11}
                max={0.34}
                step={0.01}
                value={transportCost}
                setValue={setTransportCost}
                label={'Transport cost'}
              />

              <Parameter
                min={50}
                max={200}
                step={10}
                value={conversionCost}
                setValue={setConversionCost}
                label={'Conversion cost'}
              />

              <Parameter
                min={100}
                max={500}
                step={10}
                value={productValue}
                setValue={setProductValue}
                label={'Product value'}
              />

              <Parameter
                min={0}
                max={100}
                step={10}
                value={sinkingValue}
                setValue={setSinkingValue}
                label={'Sinking value'}
              />

              <Parameter
                min={37706}
                max={119579}
                step={10}
                value={labor}
                setValue={setLabor}
                label={'Labor'}
              />

              <Parameter
                min={124485}
                max={394780}
                step={100}
                value={harvestCost}
                setValue={setHarvestCost}
                label={'Harvest costs'}
              />

              <Parameter
                min={0}
                max={3}
                step={0.1}
                value={depthFactor}
                setValue={setDepthFactor}
                label={'Depth factor'}
              />

              <Parameter
                min={0}
                max={2}
                step={0.1}
                value={waveFactor}
                setValue={setWaveFactor}
                label={'Wave factor'}
              />

              <Parameter
                min={35000}
                max={105000}
                step={1000}
                value={insurance}
                setValue={setInsurance}
                label={'Insurance'}
              />

              <Parameter
                min={1409}
                max={1637}
                step={1}
                value={license}
                setValue={setLicense}
                label={'License'}
              />
            </Box>
          )}
        </AnimateHeight>
      </>
    </Box>
  )
}

export default Parameters

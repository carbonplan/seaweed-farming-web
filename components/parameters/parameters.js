import { createContext, useContext, useState } from 'react'
import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Expander, FadeIn } from '@carbonplan/components'
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
  }
}

const Parameters = ({ applicableParameters, sx }) => {
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
  } = useContext(ParameterContext)

  if (applicableParameters.length < 1) {
    return null
  }

  return (
    <Box sx={sxProps}>
      <Box sx={sxHeading}>Parameters</Box>
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
    </Box>
  )
}

export default Parameters

import { useContext, useState } from 'react'
import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Expander } from '@carbonplan/components'

import Parameter from './parameter'
import { ParameterContext } from './context'
import { useLayers } from '../layers'

const useParameterInputs = ({ sx }) => {
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
    sequestrationRate,
    setSequestrationRate,
    removalRate,
    setRemovalRate,
  } = useContext(ParameterContext)
  const { target, layer } = useLayers()

  const mapping = {
    cost: {
      shared: [
        <Parameter
          min={170630}
          max={969626}
          step={10}
          value={capex}
          key='capex'
          setValue={setCapex}
          label={'Capex'}
          units={'$ / km² / year'}
          sx={sx}
        />,
        <Parameter
          min={0.06}
          max={1.45}
          step={0.01}
          value={lineCost}
          key='lineCost'
          setValue={setLineCost}
          label={'Line cost'}
          units={'$ / m'}
          sx={sx}
        />,
        <Parameter
          min={63004}
          max={69316}
          step={100}
          value={opex}
          key='opex'
          setValue={setOpex}
          label={'Opex'}
          units={'$ / km² / year'}
          sx={sx}
        />,
        <Parameter
          min={0.11}
          max={0.34}
          step={0.01}
          value={transportCost}
          key='transportCost'
          setValue={setTransportCost}
          label={'Transport cost'}
          units={'$ / ton / km'}
          sx={sx}
        />,
        <Parameter
          min={37706}
          max={119579}
          step={10}
          value={labor}
          key='labor'
          setValue={setLabor}
          label={'Labor'}
          units={'$ / km² / year'}
          sx={sx}
        />,
        <Parameter
          min={124485}
          max={394780}
          step={100}
          value={harvestCost}
          key='harvestCost'
          setValue={setHarvestCost}
          label={'Harvest costs'}
          units={'$ / km² / harvest'}
          sx={sx}
        />,
        <Parameter
          min={0}
          max={3}
          step={0.1}
          value={depthFactor}
          key='depthFactor'
          setValue={setDepthFactor}
          label={'Depth factor'}
          units={'scaling factor'}
          sx={sx}
        />,
        <Parameter
          min={0}
          max={2}
          step={0.1}
          value={waveFactor}
          key='waveFactor'
          setValue={setWaveFactor}
          label={'Wave factor'}
          units={'scaling factor'}
          sx={sx}
        />,
        <Parameter
          min={35000}
          max={105000}
          step={1000}
          value={insurance}
          key='insurance'
          setValue={setInsurance}
          label={'Insurance'}
          units={'$ / km² / year'}
          sx={sx}
        />,
        <Parameter
          min={1409}
          max={1637}
          step={1}
          value={license}
          key='license'
          setValue={setLicense}
          label={'License'}
          units={'$ / km² / year'}
          sx={sx}
        />,
      ],
      products: [
        <Parameter
          min={50}
          max={200}
          step={10}
          value={conversionCost}
          key='conversionCost'
          setValue={setConversionCost}
          label={'Conversion cost'}
          units={'$ / ton DW'}
          sx={sx}
        />,

        <Parameter
          min={100}
          max={500}
          step={10}
          value={productValue}
          key='productValue'
          setValue={setProductValue}
          label={'Product value'}
          units={'$ / ton DW'}
          sx={sx}
        />,
      ],
      sinking: [
        <Parameter
          min={0}
          max={100}
          step={10}
          value={sinkingValue}
          key='sinkingValue'
          setValue={setSinkingValue}
          label={'Sinking value'}
          units={'$ / ton'}
          sx={sx}
        />,
      ],
    },
    benefit: {
      shared: [
        <Parameter
          min={0.0000142}
          max={0.0000426}
          step={0.0000001}
          value={transportEmissions}
          key='transportEmissions'
          setValue={setTransportEmissions}
          label={'Transport emissions'}
          units={'tCO₂e / ton DW / km'}
          sx={sx}
        />,
      ],
      products: [
        <Parameter
          min={0.0011}
          max={0.0085}
          step={0.0001}
          value={conversionEmissions}
          key='conversionEmissions'
          setValue={setConversionEmissions}
          label={'Conversion emissions'}
          units={'tCO₂e / ton DW'}
          sx={sx}
        />,
        <Parameter
          min={0.1}
          max={1}
          step={0.05}
          value={avoidedEmissions}
          key='avoidedEmissions'
          setValue={setAvoidedEmissions}
          label={'Avoided emissions'}
          units={'tCO₂e / ton DW'}
          sx={sx}
        />,
      ],
      sinking: [
        <Parameter
          min={0.9}
          max={1}
          step={0.01}
          value={sequestrationRate}
          displayValue={sequestrationRate * 100}
          key='sequestrationRate'
          setValue={setSequestrationRate}
          label={'Sequestration rate'}
          units={'%'}
          sx={sx}
        />,

        <Parameter
          min={0.5}
          max={1}
          step={0.05}
          value={removalRate}
          displayValue={removalRate * 100}
          key='removalRate'
          setValue={setRemovalRate}
          label={'Removal rate'}
          units={'%'}
          sx={sx}
        />,
      ],
    },
  }

  // render parameters for cost layer first if layer other than cost or benefit is active
  const firstLayer = layer === 'benefit' ? 'benefit' : 'cost'
  const secondLayer = layer === 'benefit' ? 'cost' : 'benefit'

  const secondTarget = target === 'sinking' ? 'products' : 'sinking'
  const active = mapping[firstLayer][target].concat(mapping[firstLayer].shared)
  const inactive = mapping[secondLayer][target]
    .concat(mapping[secondLayer].shared)
    .concat(mapping[firstLayer][secondTarget])
    .concat(mapping[secondLayer][secondTarget])

  if (layer === 'benefit' || layer === 'cost') {
    return { active, inactive }
  } else {
    return { active: [], inactive: active.concat(inactive) }
  }
}

const Parameters = ({ sx }) => {
  const {
    heading: sxHeading,
    description: sxDescription,
    label: sxLabel,
    ...sxProps
  } = sx

  const [expandedParameters, setExpandedParameters] = useState(false)
  const { active, inactive } = useParameterInputs(sxLabel)

  return (
    <Box sx={sxProps}>
      {active}
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
          {expandedParameters && <Box mt={[3]}>{inactive}</Box>}
        </AnimateHeight>
      </>
    </Box>
  )
}

export default Parameters

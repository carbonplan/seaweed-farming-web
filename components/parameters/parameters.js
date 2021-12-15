import { useState } from 'react'
import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Reset } from '@carbonplan/icons'
import { Button, Group, Expander, Row, Column } from '@carbonplan/components'

import Parameter from './parameter'
import ParameterPresets from './parameter-presets'
import { useParameters } from './context'
import { useLayers } from '../layers'

const useParameterInputs = ({ sx }) => {
  const {
    capex,
    lineCost,
    opex,
    harvestCost,
    depthFactor,
    waveFactor,
    transportCost,
    conversionCost,
    productValue,
    transportEmissions,
    conversionEmissions,
    avoidedEmissions,
    removalRate,
    maintenanceEmissions,
    setParameters,
  } = useParameters()
  const { target, layer } = useLayers()

  const mapping = {
    mitigationCost: {
      products: [
        <Parameter
          min={100}
          max={500}
          step={10}
          value={productValue}
          key='productValue'
          id='productValue'
          setValue={setParameters}
          label={'Product value'}
          units={'$ / ton DW'}
          sx={sx}
        />,
      ],
      sinking: [],
      shared: [],
    },
    cost: {
      shared: [
        <Parameter
          min={170630}
          max={969626}
          step={10}
          value={capex}
          key='capex'
          id='capex'
          setValue={setParameters}
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
          id='lineCost'
          setValue={setParameters}
          label={'Line cost'}
          units={'$ / m'}
          sx={sx}
        />,
        <Parameter
          min={137119}
          max={295532}
          step={100}
          value={opex}
          key='opex'
          id='opex'
          setValue={setParameters}
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
          id='transportCost'
          setValue={setParameters}
          label={'Transport cost'}
          units={'$ / ton / km'}
          sx={sx}
        />,
        <Parameter
          min={124485}
          max={394780}
          step={100}
          value={harvestCost}
          key='harvestCost'
          id='harvestCost'
          setValue={setParameters}
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
          id='depthFactor'
          setValue={setParameters}
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
          id='waveFactor'
          setValue={setParameters}
          label={'Wave factor'}
          units={'scaling factor'}
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
          id='conversionCost'
          setValue={setParameters}
          label={'Conversion cost'}
          units={'$ / ton DW'}
          sx={sx}
        />,
      ],
      sinking: [],
    },
    benefit: {
      shared: [
        <Parameter
          min={0.0000142}
          max={0.0000426}
          step={0.0000001}
          value={transportEmissions}
          key='transportEmissions'
          id='transportEmissions'
          setValue={setParameters}
          label={'Transport emissions'}
          units={'tCO₂e / ton DW / km'}
          sx={sx}
        />,
        <Parameter
          min={0.0}
          max={0.005229}
          step={0.000001}
          value={maintenanceEmissions}
          key='maintenanceEmissions'
          id='maintenanceEmissions'
          setValue={setParameters}
          label={'Maintenance emissions'}
          units={'tCO₂e / km'}
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
          id='conversionEmissions'
          setValue={setParameters}
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
          id='avoidedEmissions'
          setValue={setParameters}
          label={'Avoided emissions'}
          units={'tCO₂e / ton DW'}
          sx={sx}
        />,
      ],
      sinking: [
        <Parameter
          min={0.5}
          max={1}
          step={0.05}
          value={removalRate}
          displayValue={removalRate * 100}
          key='removalRate'
          id='removalRate'
          setValue={setParameters}
          label={'Removal rate'}
          units={'%'}
          sx={sx}
        />,
      ],
    },
  }

  // render parameters for benefit layer first if layer other than benefit or cost is active
  const firstLayer = layer === 'cost' ? 'cost' : 'benefit'
  const secondLayer = layer === 'cost' ? 'benefit' : 'cost'

  const first = mapping[firstLayer][target].concat(mapping[firstLayer].shared)
  const second = mapping[secondLayer][target].concat(
    mapping[secondLayer].shared
  )

  if (layer === 'benefit' || layer === 'cost') {
    return { active: first, inactive: second }
  } else if (layer === 'mitigationCost') {
    return {
      active: mapping.mitigationCost[target].concat(first).concat(second),
      inactive: [],
    }
  } else {
    return { active: [], inactive: first.concat(second) }
  }
}

const Parameters = ({ sx }) => {
  const {
    heading: sxHeading,
    description: sxDescription,
    label: sxLabel,
    ...sxProps
  } = sx
  const { resetParameters } = useParameters()

  const [expandedParameters, setExpandedParameters] = useState(false)
  const { target } = useLayers()
  const { active, inactive } = useParameterInputs(sxLabel)

  return (
    <Box sx={sxProps}>
      <Group spacing={4}>
        {target === 'products' && <ParameterPresets sx={sx} />}

        <Box>
          <Row columns={3}>
            <Column start={3} width={1}>
              <Button
                prefix={<Reset />}
                onClick={resetParameters}
                size='xs'
                inverted
              >
                Reset
              </Button>
            </Column>
          </Row>
          {active}
        </Box>
      </Group>
      {inactive.length > 0 && (
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
              sx={{ color: 'secondary', transition: 'color 0.25s' }}
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
      )}
    </Box>
  )
}

export default Parameters

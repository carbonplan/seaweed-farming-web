import { useState } from 'react'
import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Reset } from '@carbonplan/icons'
import { Button, Group, Expander, Row, Column } from '@carbonplan/components'

import Parameter from './parameter'
import ParameterPresets from './parameter-presets'
import { useParameters } from './context'
import { useLayers } from '../layers'
import { PARAMETER_MAPPING } from '../../constants'

const LAYER_MAPPING = {
  mitigationCost: {
    products: ['productValue'],
    sinking: [],
    shared: [],
  },
  cost: {
    shared: ['capex', 'lineCost', 'opex', 'transportCost', 'harvestCost'],
    products: ['conversionCost'],
    sinking: [],
  },
  benefit: {
    shared: ['transportEmissions', 'maintenanceEmissions'],
    products: ['avoidedEmissions', 'conversionEmissions'],
    sinking: ['removalRate'],
  },
}

const useParameterInputs = ({ sx }) => {
  const { target, layer } = useLayers()

  // render parameters for benefit layer first if layer other than benefit or cost is active
  const firstLayer = layer === 'cost' ? 'cost' : 'benefit'
  const secondLayer = layer === 'cost' ? 'benefit' : 'cost'

  const first = LAYER_MAPPING[firstLayer][target].concat(
    LAYER_MAPPING[firstLayer].shared
  )
  const second = LAYER_MAPPING[secondLayer][target].concat(
    LAYER_MAPPING[secondLayer].shared
  )

  if (layer === 'benefit' || layer === 'cost') {
    return { active: first, inactive: second }
  } else if (layer === 'mitigationCost') {
    return {
      active: LAYER_MAPPING.mitigationCost[target].concat(first).concat(second),
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

  const { setParameters, resetParameters, ...parameters } = useParameters()

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
          {active.map((id) => (
            <Parameter
              key={id}
              value={parameters[id]}
              setValue={setParameters}
              sx={sx}
              {...PARAMETER_MAPPING[id]}
            />
          ))}
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
            {expandedParameters && (
              <Box mt={[3]}>
                {inactive.map((id) => (
                  <Parameter
                    key={id}
                    value={parameters[id]}
                    setValue={setParameters}
                    sx={sx}
                    {...PARAMETER_MAPPING[id]}
                  />
                ))}
              </Box>
            )}
          </AnimateHeight>
        </>
      )}
    </Box>
  )
}

export default Parameters

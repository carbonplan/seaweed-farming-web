import { Box } from 'theme-ui'
import { Reset } from '@carbonplan/icons'
import { Button, Group, Row, Column } from '@carbonplan/components'

import Parameter from './parameter'
import ParameterPresets from './parameter-presets'
import { useParameters } from './context'
import { useLayers } from '../layers'
import { PARAMETER_MAPPING } from '../../constants'
import { useMemo } from 'react'

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

const Parameters = ({ sx }) => {
  const {
    heading: sxHeading,
    description: sxDescription,
    label: sxLabel,
    ...sxProps
  } = sx

  const { setParameters, resetParameters, ...parameters } = useParameters()
  const { target, layer } = useLayers()

  const active = useMemo(() => {
    if (!LAYER_MAPPING[layer]) {
      return []
    }
    let result = LAYER_MAPPING[layer][target].concat(
      LAYER_MAPPING[layer].shared
    )

    if (layer === 'mitigationCost') {
      const { cost, benefit } = LAYER_MAPPING
      result = result
        .concat(benefit[target].concat(benefit.shared))
        .concat(cost[target].concat(cost.shared))
    }

    return result
  }, [target, layer])

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
              sx={sxLabel}
              {...PARAMETER_MAPPING[id]}
            />
          ))}
        </Box>
      </Group>
    </Box>
  )
}

export default Parameters

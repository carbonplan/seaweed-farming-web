import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'

import Radio from '../radio'
import { useParameters } from './context'

const PRODUCT_PRESETS = [
  { label: 'Fuels', values: { avoidedEmissions: 0.8, productValue: 500 } },
  { label: 'Food', values: { avoidedEmissions: 3.6, productValue: 600 } },
  { label: 'Feed', values: { avoidedEmissions: 2.5, productValue: 525 } },
]

const ParameterPresets = ({ sx }) => {
  const { setParameters, ...parameters } = useParameters()
  const matchingProduct = PRODUCT_PRESETS.find(({ values }) =>
    Object.keys(values).every((k) => parameters[k] === values[k])
  )?.label

  return (
    <Box>
      <Box sx={sx.label}>Product presets</Box>
      <Group direction='horizontal'>
        {PRODUCT_PRESETS.map(({ label }) => {
          return (
            <Radio
              key={label}
              label={label}
              value={label}
              name='productPreset'
              onChange={(label) =>
                setParameters(
                  PRODUCT_PRESETS.find((p) => p.label === label).values
                )
              }
              checked={label === matchingProduct}
            />
          )
        })}
      </Group>
    </Box>
  )
}

export default ParameterPresets

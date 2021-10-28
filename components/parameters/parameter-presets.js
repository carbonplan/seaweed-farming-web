import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { useState } from 'react'

import Radio from '../radio'
import { useParameters } from './context'

const PRODUCT_PRESETS = [
  { label: 'Feed', values: { productValue: 100 } },
  { label: 'Fuel', values: { productValue: 500 } },
  { label: 'Custom', values: {} },
]

const ParameterPresets = ({ sx }) => {
  const { setParameters, ...parameters } = useParameters()
  const matchingProduct = PRODUCT_PRESETS.find(({ values }) =>
    Object.keys(values).every((k) => parameters[k] === values[k])
  ).label

  const [custom, setCustom] = useState(() => !!matchingProduct)

  const handleChange = (label) => {
    if (label === 'Custom') {
      setCustom(true)
    } else {
      setCustom(false)
      setParameters(PRODUCT_PRESETS.find((p) => p.label === label).values)
    }
  }

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
              onChange={handleChange}
              checked={
                (label === 'Custom' && custom) || label === matchingProduct
              }
            />
          )
        })}
      </Group>
    </Box>
  )
}

export default ParameterPresets

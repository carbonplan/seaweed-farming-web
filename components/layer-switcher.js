import { useCallback, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

import ControlPanelDivider from './control-panel-divider'

const initOutputs = {
  cost: true,
  value: false,
}

const initCostInputs = {
  depth: true,
  growth: true,
  harvest: true,
  'wave height': true,
  'line density': true,
}

const filterToValue = {
  depth: 'depth',
  growth: 'growth',
  harvest: 'harvest',
  'wave height': 'waveHeight',
  'line density': 'lineDensity',
  'distance to port': 'd2p',
}

const initValueOutputs = {
  'distance to port': true,
}

const LayerSwitcher = ({ setLayer, sx }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initCostInputs)

  const handleOutputChange = useCallback((res) => {
    let layer
    setOutputs(res)
    if (res.cost) {
      layer = 'cost'
      setInputs(initCostInputs)
    } else {
      layer = 'value'
      setInputs(initValueOutputs)
    }

    setLayer(layer)
  })

  const handleInputChange = useCallback((res) => {
    setOutputs({ cost: false, value: false })
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
    setLayer(filterToValue[selected])
  })

  return (
    <Group sx={sxProps}>
      <Box>
        <Box sx={sxHeading}>Outputs</Box>
        <Filter values={outputs} setValues={handleOutputChange} />
      </Box>
      <ControlPanelDivider />
      <Box>
        <Box sx={sxHeading}>Inputs</Box>
        <Filter values={inputs} setValues={handleInputChange} />
      </Box>
    </Group>
  )
}

export default LayerSwitcher

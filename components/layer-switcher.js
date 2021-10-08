import { useCallback, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

import ControlPanelDivider from './control-panel-divider'
const initOutputs = {
  'net cost': true,
  'climate benefit': false,
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

const LayerSwitcher = ({ setLayer, setTarget, sx, target }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initCostInputs)

  const handleOutputChange = useCallback((res) => {
    let layer
    setOutputs(res)
    if (res['net cost']) {
      layer = 'cost'
      setInputs(initCostInputs)
    } else {
      layer = 'benefit'
      setInputs(initValueOutputs)
    }

    setLayer(layer)
  })

  const handleInputChange = useCallback((res) => {
    setOutputs({ 'net cost': false, 'climate benefit': false })
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
    setLayer(filterToValue[selected])
  })

  return (
    <Group sx={sxProps}>
      <Box>
        <Box sx={sxHeading}>Target</Box>
        <Filter values={target} setValues={setTarget} />
      </Box>

      <ControlPanelDivider />

      <Box>
        <Box sx={sxHeading}>Derived outputs</Box>
        <Filter values={outputs} setValues={handleOutputChange} />
      </Box>

      <ControlPanelDivider />

      <Box>
        <Box sx={sxHeading}>Biophysical inputs</Box>
        <Filter values={inputs} setValues={handleInputChange} />
      </Box>
    </Group>
  )
}

export default LayerSwitcher

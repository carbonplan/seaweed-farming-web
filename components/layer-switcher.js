import { useCallback, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

const initOutputs = {
  cost: true,
  value: false,
}

const initCostInputs = {
  depth: true,
  growth: true,
  harvest: true,
  waveHeight: true,
  lineDensity: true,
}

const initValueOutputs = {}

const emptyUniforms = {
  costLayer: 0,
  valueLayer: 0,
  depthLayer: 0,
  growthLayer: 0,
  harvestLayer: 0,
  waveHeightLayer: 0,
  lineDensityLayer: 0,
}

export const INITIAL_UNIFORMS = {
  ...emptyUniforms,
  costLayer: 1,
}

const LayerSwitcher = ({ setUniforms, sx }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initCostInputs)

  const handleOutputChange = useCallback((res) => {
    let uniform
    setOutputs(res)
    if (res.cost) {
      uniform = 'costLayer'
      setInputs(initCostInputs)
    } else {
      uniform = 'valueLayer'
      setInputs(initValueOutputs)
    }

    setUniforms({ ...emptyUniforms, [uniform]: 1 })
  })

  const handleInputChange = useCallback((res) => {
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
    const uniform = `${selected}Layer`
    setUniforms({ ...emptyUniforms, [uniform]: 1 })
  })

  return (
    <Group sx={sxProps}>
      <Box>
        <Box sx={sxHeading}>Outputs</Box>
        <Filter values={outputs} setValues={handleOutputChange} />
      </Box>
      <Box>
        <Box sx={sxHeading}>Inputs</Box>
        <Filter values={inputs} setValues={handleInputChange} />
      </Box>
    </Group>
  )
}

export default LayerSwitcher

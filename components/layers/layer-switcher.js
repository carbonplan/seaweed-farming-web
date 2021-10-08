import { useCallback, useState } from 'react'
import { Filter, Group, Toggle } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import ControlPanelDivider from '../control-panel-divider'
import Parameters from '../parameters'
import { useRawUniformValues } from './context'

const initOutputs = {
  'net cost': true,
  'climate benefit': false,
}

const initCostInputs = {
  depth: true,
  growth: true,
  harvests: true,
  'wave height': true,
  'line density': true,
}

const filterToValue = {
  depth: 'depth',
  growth: 'growth',
  harvests: 'nharv',
  'wave height': 'waveHeight',
  'line density': 'lineDensity',
  'distance to port': 'd2p',
}

const initValueOutputs = {
  'distance to port': true,
}

const parameterMapping = {
  cost: [
    'capex',
    'capex',
    'lineCost',
    'opex',
    'labor',
    'harvestCost',
    'depthFactor',
    'waveFactor',
    'insurance',
    'license',
  ],
}

const LayerSwitcher = ({ sx }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initCostInputs)
  const [parameters, setParameters] = useState(parameterMapping.cost)
  const {
    species,
    setSpecies,
    growthModel,
    setGrowthModel,
    mask,
    setMask,
    setLayer,
    setTarget,
    target,
  } = useRawUniformValues()

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

    setParameters(parameterMapping[layer] || [])
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

      <Group>
        <Box>
          <Box sx={sxHeading}>Growth model</Box>
          <Filter values={growthModel} setValues={setGrowthModel} />
        </Box>
        <Box>
          <Box sx={sxHeading}>Seaweed species</Box>
          <Filter values={species} setValues={setSpecies} />
        </Box>
        <Box>
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Box sx={sxHeading}>Include sensitive areas</Box>
            <Toggle value={mask} onClick={() => setMask(!mask)} />
          </Flex>
        </Box>
      </Group>

      <ControlPanelDivider />

      <Box>
        <Box sx={sxHeading}>Biophysical inputs</Box>
        <Filter values={inputs} setValues={handleInputChange} />
      </Box>

      <Parameters sx={sx} applicableParameters={parameters} />
    </Group>
  )
}

export default LayerSwitcher

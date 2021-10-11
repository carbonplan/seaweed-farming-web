import { useCallback, useMemo, useState } from 'react'
import { Filter, Group, Toggle } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import ControlPanelDivider from '../control-panel-divider'
import Parameters from '../parameters'
import { useRawUniformValues } from './context'

const initOutputs = {
  'climate benefit': true,
  'net value': false,
}

const initCostInputs = {
  growth: true,
  harvests: true,
  depth: true,
  'wave height': true,
  'line density': true,
}

const filterToValue = {
  depth: 'depth',
  growth: 'growth',
  harvests: 'nharv',
  'wave height': 'wave_height',
  'line density': 'lineDensity',
  'distance to port': 'd2p',
  'distance to sink': 'd2sink',
  'fraction sequestered': 'fseq',
}

const initBenefitInputs = {
  growth: true,
  'distance to port': true,
  'distance to sink': true,
  'fraction sequestered': true,
}

const PARAMETERS = {
  cost: {
    base: [
      'capex',
      'lineCost',
      'opex',
      'labor',
      'harvestCost',
      'depthFactor',
      'waveFactor',
      'insurance',
      'license',
      'transportCost',
    ],
    products: ['conversionCost', 'productValue'],
    sinking: ['sinkingValue'],
  },
  benefit: {
    base: ['transportEmissions'],
    products: ['conversionEmissions', 'avoidedEmissions'],
    sinking: ['sequestrationRate', 'removalRate'],
  },
}

const LayerSwitcher = ({ sx }) => {
  const { heading: sxHeading, description: sxDescription, ...sxProps } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initBenefitInputs)
  const {
    species,
    setSpecies,
    growthModel,
    setGrowthModel,
    mask,
    setMask,
    layer,
    setLayer,
    setTarget,
    target,
  } = useRawUniformValues()

  const handleOutputChange = useCallback((res) => {
    let layer
    setOutputs(res)
    if (res['net value']) {
      layer = 'cost'
      setInputs(initCostInputs)
    } else {
      layer = 'benefit'
      setInputs(initBenefitInputs)
    }

    setLayer(layer)
  })

  const handleInputChange = useCallback((res) => {
    setOutputs({ 'net value': false, 'climate benefit': false })
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
    setLayer(filterToValue[selected])
  })

  const applicableParameters = useMemo(() => {
    const layerParameters = PARAMETERS[layer]

    if (layerParameters) {
      const targetKey = Object.keys(target).find((k) => target[k])
      return [...PARAMETERS[layer].base, ...PARAMETERS[layer][targetKey]]
    } else {
      return []
    }
  }, [layer, target])

  const showGrowthControls = ['cost', 'benefit', 'growth', 'harvests'].includes(
    layer
  )

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

      {showGrowthControls && <ControlPanelDivider />}

      {showGrowthControls && (
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
      )}

      {applicableParameters.length > 0 && <ControlPanelDivider />}

      {applicableParameters.length > 0 && (
        <Parameters sx={sx} applicableParameters={applicableParameters} />
      )}
    </Group>
  )
}

export default LayerSwitcher

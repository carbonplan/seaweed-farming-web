import { useCallback, useEffect, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box, Divider } from 'theme-ui'

import { useRawUniformValues } from './context'
import { LABEL_MAP } from '../../constants'
import Radio from '../radio'
import Info from '../info'

const OUTPUT_LAYERS = ['mitigationCost', 'cost']
const INPUT_LAYERS = [
  'seaweed_dw',
  'nharv',
  'depth',
  'wave_height',
  'd2p',
  'd2sink',
  'fseq',
  'species_preferred',
]

const filterToValue = {
  [LABEL_MAP['mitigationCost']['sinking']]: 'mitigationCost',
  [LABEL_MAP['mitigationCost']['products']]: 'mitigationCost',
  [LABEL_MAP['cost']]: 'cost',
  [LABEL_MAP['depth']]: 'depth',
  [LABEL_MAP['seaweed_dw']]: 'seaweed_dw',
  [LABEL_MAP['nharv']]: 'nharv',
  [LABEL_MAP['wave_height']]: 'wave_height',
  [LABEL_MAP['d2p']]: 'd2p',
  [LABEL_MAP['d2sink']]: 'd2sink',
  [LABEL_MAP['fseq']]: 'fseq',
  [LABEL_MAP['species_preferred']]: 'species_preferred',
}

const outputDescriptions = {
  mitigationCost: {
    sinking:
      'The cost of removing a net ton of CO₂ from the atmosphere for at least 100 years by growing and sinking seaweed.',
    products:
      'The cost of displacing the emission of a net ton CO₂e through the conversion of seaweed into useful products. Calculated with GWP100.',
  },
  cost: 'The cost of growing a ton (dry weight) of seaweed.',
}
const inputDescriptions = {
  depth: 'Ocean depth (m).',
  seaweed_dw: 'Amount of seaweed biomass harvested annually.',
  nharv: 'Number of harvests per year to achieve maximum seaweed biomass.',
  wave_height: 'Significant wave height (m).',
  d2p: 'Sea-route distance (km) from any point in the ocean to the nearest port.',
  d2sink:
    'Sea-route distance (km) from any point to the cost-optimal and net-emissions-optimal location to sink seaweed.',
  fseq: 'Fraction of sunk carbon that remains sequestered in the deep ocean for at least 100 years.',
  species_preferred:
    'The seaweed type in each grid cell that produces the most biomass.',
}

const getFilter = (layers, activeLayer, target) => {
  return layers.reduce((accum, layer) => {
    const key =
      typeof LABEL_MAP[layer] === 'string'
        ? LABEL_MAP[layer]
        : LABEL_MAP[layer][target]
    accum[key] = layer === activeLayer

    return accum
  }, {})
}

const getOutputDescription = (layer, target) => {
  const description = outputDescriptions[layer]

  if (!description) {
    return 'These are the primary outputs from the combined biophysical and technoeconomic model. Select one to map the corresponding variable. These outputs are influenced by both static, spatially-variable inputs – like modeled seaweed growth rates – and by user-controlled parameters.'
  } else if (typeof outputDescriptions[layer] === 'string') {
    return outputDescriptions[layer]
  } else {
    return outputDescriptions[layer][target]
  }
}

const getInputDescription = (layer, target) => {
  const description = inputDescriptions[layer]

  if (!description) {
    return 'These are the primary spatially-varying inputs into the model. Some of them reflect biophysical parameters – like seaweed growth or wave height – whereas others reflect technoeconomic parameters like distance between growth sites and ports. Select one to view the corresponding variable on the map.'
  } else if (typeof inputDescriptions[layer] === 'string') {
    return inputDescriptions[layer]
  } else {
    return inputDescriptions[layer][target]
  }
}

const LayerSwitcher = ({ sx }) => {
  const {
    heading: sxHeading,
    label: sxLabel,
    description: sxDescription,
    ...sxProps
  } = sx
  const { layer, setLayer, setTarget, target } = useRawUniformValues()
  const [outputs, setOutputs] = useState(() =>
    getFilter(OUTPUT_LAYERS, layer, target)
  )
  const [inputs, setInputs] = useState(() =>
    getFilter(INPUT_LAYERS, layer, target)
  )

  useEffect(() => {
    setOutputs(getFilter(OUTPUT_LAYERS, layer, target))
  }, [layer, target])

  const handleOutputChange = useCallback(
    (res) => {
      const selected = Object.keys(res).find((key) => res[key])
      setOutputs(res)
      setInputs(getFilter(INPUT_LAYERS, selected, target))
      setLayer(filterToValue[selected])
    },
    [target]
  )

  const handleInputChange = useCallback(
    (res) => {
      const selected = Object.keys(res).find((key) => res[key])
      setOutputs(getFilter(OUTPUT_LAYERS, selected, target))
      setInputs(res)
      setLayer(filterToValue[selected])
    },
    [target]
  )

  return (
    <Group sx={sxProps} spacing={4}>
      <Group spacing={3}>
        <Box sx={sxDescription}>
          Select a target end use for cultivated seaweed, either sinking it for
          carbon removal or converting it into a product.
        </Box>
        <Box>
          <Box sx={{ display: 'inline-block', mr: [3] }}>
            <Radio
              label='Sinking'
              value='sinking'
              name='target'
              onChange={setTarget}
              checked={target === 'sinking'}
            />
          </Box>
          <Box sx={{ display: 'inline-block' }}>
            <Radio
              label='Products'
              value='products'
              name='target'
              onChange={setTarget}
              checked={target === 'products'}
            />
          </Box>
        </Box>
      </Group>

      <Divider sx={{ my: 4 }} />

      <Box sx={sxHeading}>Display</Box>
      <Box sx={{ mb: ['22px'] }}>
        <Box sx={{ ...sxLabel, display: 'inline-block' }}>Derived outputs</Box>
        <Info
          sx={{
            ...sxDescription,
            display: 'inline-block',
            position: 'relative',
            ml: ['12px'],
            top: '-1px',
          }}
          sxInner={{ pb: ['6px'] }}
        >
          <Box sx={{ mt: [-1], mb: [3] }}>
            {getOutputDescription(layer, target)}
          </Box>
        </Info>

        <Filter values={outputs} setValues={handleOutputChange} />
      </Box>

      <Box>
        <Box sx={{ ...sxLabel, display: 'inline-block' }}>Inputs</Box>
        <Info
          sx={{
            ...sxDescription,
            display: 'inline-block',
            position: 'relative',
            ml: ['12px'],
            top: '-1px',
          }}
          sxInner={{ pb: ['6px'] }}
        >
          <Box sx={{ mt: [-1], mb: [3] }}>
            {getInputDescription(layer, target)}
          </Box>
        </Info>

        <Filter values={inputs} setValues={handleInputChange} />
      </Box>
    </Group>
  )
}

export default LayerSwitcher

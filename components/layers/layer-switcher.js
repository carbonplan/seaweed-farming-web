import { useCallback, useEffect, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

import ControlPanelDivider from '../control-panel-divider'
import Section from '../section'
import { useRawUniformValues } from './context'
import { LABEL_MAP } from '../../constants'
import Radio from '../radio'

const OUTPUT_LAYERS = ['mitigationCost', 'benefit', 'cost']
const INPUT_LAYERS = [
  'growth',
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
  [LABEL_MAP['benefit']]: 'benefit',
  [LABEL_MAP['depth']]: 'depth',
  [LABEL_MAP['growth']]: 'growth',
  [LABEL_MAP['nharv']]: 'nharv',
  [LABEL_MAP['wave_height']]: 'wave_height',
  [LABEL_MAP['d2p']]: 'd2p',
  [LABEL_MAP['d2sink']]: 'd2sink',
  [LABEL_MAP['fseq']]: 'fseq',
  [LABEL_MAP['species_preferred']]: 'species_preferred',
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
      <Box>
        <Group direction='horizontal'>
          <Radio
            label='Sinking'
            value='sinking'
            name='target'
            onChange={setTarget}
            checked={target === 'sinking'}
          />
          <Radio
            label='Products'
            value='products'
            name='target'
            onChange={setTarget}
            checked={target === 'products'}
          />
        </Group>
      </Box>

      <ControlPanelDivider />

      <Section sx={sxHeading} label='Display'>
        <Group>
          <Box>
            <Box sx={sxLabel}>Derived outputs</Box>
            <Filter values={outputs} setValues={handleOutputChange} />
          </Box>

          <Box>
            <Box sx={sxLabel}>Inputs</Box>
            <Filter values={inputs} setValues={handleInputChange} />
          </Box>
        </Group>
      </Section>
    </Group>
  )
}

export default LayerSwitcher

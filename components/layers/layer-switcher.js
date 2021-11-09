import { useCallback, useState } from 'react'
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
  'lineDensity',
  'd2p',
  'd2sink',
  'fseq',
  'species_preferred',
]

const filterToValue = {
  [LABEL_MAP['mitigationCost']]: 'mitigationCost',
  [LABEL_MAP['cost']]: 'cost',
  [LABEL_MAP['benefit']]: 'benefit',
  [LABEL_MAP['depth']]: 'depth',
  [LABEL_MAP['growth']]: 'growth',
  [LABEL_MAP['nharv']]: 'nharv',
  [LABEL_MAP['wave_height']]: 'wave_height',
  [LABEL_MAP['lineDensity']]: 'lineDensity',
  [LABEL_MAP['d2p']]: 'd2p',
  [LABEL_MAP['d2sink']]: 'd2sink',
  [LABEL_MAP['fseq']]: 'fseq',
  [LABEL_MAP['species_preferred']]: 'species_preferred',
}

const getFilter = (layers, activeLayer) => {
  return layers.reduce((accum, layer) => {
    accum[LABEL_MAP[layer]] = layer === activeLayer

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
  const [outputs, setOutputs] = useState(() => getFilter(OUTPUT_LAYERS, layer))
  const [inputs, setInputs] = useState(() => getFilter(INPUT_LAYERS, layer))

  const handleOutputChange = useCallback((res) => {
    const selected = Object.keys(res).find((key) => res[key])
    setOutputs(res)
    setInputs(getFilter(INPUT_LAYERS, selected))
    setLayer(filterToValue[selected])
  })

  const handleInputChange = useCallback((res) => {
    const selected = Object.keys(res).find((key) => res[key])
    setOutputs(getFilter(OUTPUT_LAYERS, selected))
    setInputs(res)
    setLayer(filterToValue[selected])
  })

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

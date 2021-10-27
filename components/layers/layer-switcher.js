import { useCallback, useState } from 'react'
import { Filter, Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

import ControlPanelDivider from '../control-panel-divider'
import Section from '../section'
import { useRawUniformValues } from './context'
import { LABEL_MAP } from '../../constants'
import Radio from '../radio'

const initOutputs = {
  [LABEL_MAP['mitigationCost']]: false,
  [LABEL_MAP['benefit']]: true,
  [LABEL_MAP['cost']]: false,
}

const initInputs = {
  [LABEL_MAP['growth']]: false,
  [LABEL_MAP['nharv']]: false,
  [LABEL_MAP['depth']]: false,
  [LABEL_MAP['wave_height']]: false,
  [LABEL_MAP['lineDensity']]: false,
  [LABEL_MAP['d2p']]: false,
  [LABEL_MAP['d2sink']]: false,
  [LABEL_MAP['fseq']]: false,
  [LABEL_MAP['species_preferred']]: false,
}

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

const LayerSwitcher = ({ sx }) => {
  const {
    heading: sxHeading,
    label: sxLabel,
    description: sxDescription,
    ...sxProps
  } = sx
  const [outputs, setOutputs] = useState(initOutputs)
  const [inputs, setInputs] = useState(initInputs)
  const { setLayer, setTarget, target } = useRawUniformValues()

  const handleOutputChange = useCallback((res) => {
    setOutputs(res)
    setInputs(initInputs)
    const selected = Object.keys(res).find((key) => res[key])
    setLayer(filterToValue[selected])
  })

  const handleInputChange = useCallback((res) => {
    setOutputs({
      'mitigation cost': false,
      'climate benefit': false,
      'project cost': false,
    })
    setInputs(res)
    const selected = Object.keys(res).find((key) => res[key])
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
            <Box sx={sxLabel}>Biophysical inputs</Box>
            <Filter values={inputs} setValues={handleInputChange} />
          </Box>
        </Group>
      </Section>
    </Group>
  )
}

export default LayerSwitcher

import { Group } from '@carbonplan/components'

import { GrowthParameters, useLayers } from '../layers'
import Section from '../section'
import Parameters from './parameters'

const OUTPUTS = ['mitigationCost', 'cost', 'benefit']

const ParametersSection = ({ sx }) => {
  const { layer } = useLayers()
  return (
    <Section sx={sx.heading} label='Parameters'>
      {OUTPUTS.includes(layer) ? (
        <Group spacing={4}>
          <GrowthParameters sx={sx} />

          <Parameters sx={sx} />
        </Group>
      ) : (
        'Select a derived output to adjust applicable parameters.'
      )}
    </Section>
  )
}

export default ParametersSection

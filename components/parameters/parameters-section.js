import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { GrowthParameters, useLayers } from '../layers'
import Parameters from './parameters'

const OUTPUTS = ['mitigationCost', 'cost', 'benefit']

const ParametersSection = ({ sx }) => {
  const { layer } = useLayers()
  return (
    <>
      <Box sx={sx.heading}>Parameters</Box>

      {OUTPUTS.includes(layer) ? (
        <Group spacing={4}>
          <GrowthParameters sx={sx} />

          <Parameters sx={sx} />
        </Group>
      ) : (
        'Select a derived output to adjust applicable parameters.'
      )}
    </>
  )
}

export default ParametersSection

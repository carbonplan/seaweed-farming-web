import { Filter, Group, Toggle } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import { useRawUniformValues } from './context'

const GrowthParameters = ({ sx }) => {
  const {
    species,
    setSpecies,
    growthModel,
    setGrowthModel,
    mask,
    setMask,
  } = useRawUniformValues()

  return (
    <Group>
      <Box>
        <Box sx={sx.label}>Growth model</Box>
        <Filter values={growthModel} setValues={setGrowthModel} />
      </Box>
      <Box>
        <Box sx={sx.label}>Seaweed species</Box>
        <Filter values={species} setValues={setSpecies} />
      </Box>
      <Box>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box sx={sx.label}>Include sensitive areas</Box>
          <Toggle value={mask} onClick={() => setMask(!mask)} />
        </Flex>
      </Box>
    </Group>
  )
}

export default GrowthParameters

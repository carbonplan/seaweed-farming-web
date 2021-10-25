import { Box, Flex } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { SPECIES } from '../constants'

const SpeciesLegend = ({ colormap }) => {
  return (
    <Flex sx={{ flexDirection: 'column', gap: 0 }}>
      {colormap.map((d, i) => (
        <Group direction='horizontal' spacing='sm' key={SPECIES[i]}>
          <Box
            sx={{
              backgroundColor: `rgb(${d})`,
              border: ({ colors }) => `solid 1px ${colors.hinted}`,
              height: '10px',
              width: '10px',
            }}
          />
          <Box
            sx={{
              fontFamily: 'mono',
              fontSize: ['9px', 0, 0, 1],
              letterSpacing: 'smallcaps',
              textTransform: 'uppercase',
            }}
          >
            {SPECIES[i]}
          </Box>
        </Group>
      ))}
    </Flex>
  )
}

export default SpeciesLegend

import { Box, Flex } from 'theme-ui'
import { formatValue } from '../utils'

const AverageDisplay = ({ value, label, units, color = 'teal' }) => {
  return (
    <Box>
      <Box
        sx={{
          fontFamily: 'faux',
          letterSpacing: 'smallcaps',
          fontSize: [2, 2, 2, 3],
        }}
      >
        {label}
      </Box>
      <Flex sx={{ gap: 2, alignItems: 'baseline' }}>
        <Box
          sx={{
            fontFamily: 'mono',
            letterSpacing: 'mono',
            fontSize: [3, 3, 4, 5],
            color,
          }}
        >
          {formatValue(value)}
        </Box>
        <Box
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'faux',
            fontSize: [0, 0, 0, 1],
            color: 'secondary',
          }}
        >
          {units}
        </Box>
      </Flex>
    </Box>
  )
}

export default AverageDisplay

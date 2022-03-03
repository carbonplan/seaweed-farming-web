import { Box, Flex } from 'theme-ui'
import { formatValue } from '../utils'

const LegendItem = ({ color, label, value, units }) => {
  return (
    <Flex sx={{ gap: 5 }}>
      <Flex sx={{ gap: 3, alignItems: 'center' }}>
        <Box
          sx={{
            width: '14px',
            height: '14px',
            mt: '2px',
            backgroundColor: color,
            display: 'inline-block',
          }}
        />

        <Box
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'smallcaps',
            fontSize: [2, 2, 2, 3],
          }}
        >
          {label}
        </Box>
      </Flex>
      <Flex sx={{ gap: 2, alignItems: 'baseline' }}>
        <Box
          sx={{
            fontFamily: 'mono',
            letterSpacing: 'mono',
            fontSize: [2, 2, 2, 3],
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
    </Flex>
  )
}
export default LegendItem

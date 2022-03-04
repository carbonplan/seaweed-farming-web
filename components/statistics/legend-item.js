import { Box, Flex } from 'theme-ui'
import { formatValue } from '../utils'

const LegendItem = ({ color, label, value, units }) => {
  return (
    <Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
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

          <Flex sx={{ gap: 2, alignItems: 'baseline' }}>
            <Box
              sx={{
                fontFamily: 'faux',
                letterSpacing: 'smallcaps',
                fontSize: [2, 2, 2, 3],
              }}
            >
              {label}
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
            %
          </Box>
        </Flex>
      </Flex>
      <Box
        sx={{
          mb: 1,
          height: '3px',
          background: ({ colors }) =>
            `linear-gradient(to right, ${color} ${value.toFixed(0)}%, ${
              colors.muted
            } ${value.toFixed(0)}% 100%)`,
        }}
      />
    </Box>
  )
}
export default LegendItem

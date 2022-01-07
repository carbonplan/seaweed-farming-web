import { Box } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'
import { formatValue } from '../utils'

const AverageDisplay = ({ value, label, units }) => {
  return (
    <Row columns={3} sx={{ mb: ['18px'] }}>
      <Column start={1} width={2}>
        <Box
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'smallcaps',
            fontSize: [2, 2, 2, 3],
          }}
        >
          {label}
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
        </Box>
      </Column>
      <Column start={3} width={1}>
        <Box sx={{ mt: ['4px'] }}>
          <Badge>{Number.isNaN(value) ? 'n/a' : formatValue(value)}</Badge>
        </Box>
      </Column>
    </Row>
  )
}

export default AverageDisplay

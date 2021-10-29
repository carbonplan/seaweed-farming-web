import { Box } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'

const AverageDisplay = ({ value, label, units }) => {
  return (
    <Row columns={3}>
      <Column start={1} width={2}>
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
          as='span'
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'faux',
            fontSize: [0, 0, 0, 1],
            color: 'secondary',
          }}
        >
          {units}
        </Box>
      </Column>
      <Column start={3} width={1}>
        <Box>
          <Badge>{Number.isNaN(value) ? 'n/a' : value.toFixed(2)}</Badge>
        </Box>
      </Column>
    </Row>
  )
}

export default AverageDisplay

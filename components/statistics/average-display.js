import { Box } from 'theme-ui'
import { Badge, Row, Column } from '@carbonplan/components'

const AverageDisplay = ({ value, label, units }) => {
  return (
    <Row columns={3}>
      <Column
        start={1}
        width={1}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'smallcaps',
            fontSize: [2, 2, 2, 3],
          }}
        >
          {label}
        </Box>
      </Column>
      <Column start={2} width={2}>
        <Box sx={{ textAlign: 'right' }}>
          <Badge>{Number.isNaN(value) ? 'n/a' : value.toFixed(2)}</Badge>
          <br />
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
        </Box>
      </Column>
    </Row>
  )
}

export default AverageDisplay

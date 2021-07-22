import { Box, Container } from 'theme-ui'
import { Row, Column, Slider } from '@carbonplan/components'

const prefix = 'https://images.carbonplan.org'

const Options = ({ options, onChange }) => {
  const { operatingCost, transportationCost } = options

  return (
    <Box
      sx={{
        py: [4],
        borderStyle: 'solid',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderColor: 'muted',
      }}
    >
      <Container>
        <Row columns={[6]}>
          <Column start={[1]} width={[3]}>
            Operating cost: {operatingCost}
            <Slider
              value={operatingCost}
              min={1}
              max={100}
              step={1}
              onChange={(e) =>
                onChange('operatingCost', parseFloat(e.target.value))
              }
            />
          </Column>
          <Column start={[4]} width={[3]}>
            Transportation cost: {transportationCost}
            <Slider
              value={transportationCost}
              min={0}
              max={10}
              step={1}
              onChange={(e) =>
                onChange('transportationCost', parseFloat(e.target.value))
              }
            />
          </Column>
        </Row>
      </Container>
    </Box>
  )
}

export default Options

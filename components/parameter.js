import { Box } from 'theme-ui'
import { Slider, Badge, Row, Column } from '@carbonplan/components'

const Parameter = ({ label, min, max, step, value, setValue, onChange }) => {
  return (
    <Box sx={{ mt: [2], mb: [2] }}>
      <Box
        sx={{
          fontFamily: 'faux',
          letterSpacing: 'smallcaps',
          fontSize: [2, 2, 2, 3],
        }}
      >
        {label}
      </Box>
      <Row columns={3}>
        <Column start={1} width={2}>
          <Box sx={{ height: ['3px'] }} />
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={
              onChange ? onChange : (e) => setValue(parseFloat(e.target.value))
            }
          />
        </Column>
        <Column start={3} width={1}>
          <Badge>{value}</Badge>
        </Column>
      </Row>
    </Box>
  )
}

export default Parameter

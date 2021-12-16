import { Box } from 'theme-ui'
import { Slider, Badge, Row, Column } from '@carbonplan/components'
import Info from '../info'

const Parameter = ({
  label,
  min,
  max,
  step,
  value,
  units,
  setValue,
  format,
  tooltip,
  id,
  sx,
}) => {
  return (
    <Box sx={{ mt: [2], mb: [3] }}>
      <Box sx={{ ...sx, mb: [1] }}>
        {label}
        <Box
          as='span'
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'faux',
            fontSize: [0, 0, 0, 1],
            color: 'secondary',
            ml: [2],
          }}
        >
          {units}
        </Box>

        {tooltip && (
          <Info
            sx={{
              display: 'inline-block',
              ml: [2],
            }}
          >
            {tooltip}
          </Info>
        )}
      </Box>

      <Row columns={3}>
        <Column start={1} width={2}>
          <Box sx={{ height: ['3px'] }} />
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue({ [id]: parseFloat(e.target.value) })}
          />
        </Column>
        <Column start={3} width={1}>
          <Badge>{format ? format(value) : value}</Badge>
        </Column>
      </Row>
    </Box>
  )
}

export default Parameter

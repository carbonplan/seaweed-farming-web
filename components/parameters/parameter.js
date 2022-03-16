import { Box } from 'theme-ui'
import { Slider, Badge, Row, Column } from '@carbonplan/components'
import Info from '../info'
import { formatValue } from '../utils'

const Parameter = ({
  label,
  min,
  max,
  step,
  value,
  units,
  setValue,
  tooltip,
  id,
  sx,
}) => {
  return (
    <Box sx={{ mt: [2], mb: ['16px'] }} id={id}>
      <Box sx={{ ...sx, mb: [0] }}>
        <Box sx={{ display: 'inline-block', mr: ['12px'] }}>
          {label}
          <Box
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              fontSize: [0, 0, 0, 1],
              color: 'secondary',
              ml: [0],
              mt: [0],
            }}
          >
            {units}
          </Box>
        </Box>
        {tooltip && (
          <Info
            sx={{
              display: 'inline-block',
              position: 'relative',
              verticalAlign: 'top',
              mt: ['-1px', '-1px', '-1px', '-2px'],
            }}
            sxInner={{ pb: [3] }}
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
          <Badge sx={{ width: 'max-content' }}>{formatValue(value)}</Badge>
        </Column>
      </Row>
    </Box>
  )
}

export default Parameter

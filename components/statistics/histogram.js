import {
  Chart,
  Plot,
  Bar,
  Axis,
  AxisLabel,
  TickLabels,
  Ticks,
} from '@carbonplan/charts'
import { Box } from 'theme-ui'

const Histogram = ({ data, labels, colormap, sx, units, axisLabel }) => {
  const colors = colormap.map((d) => `rgb(${d})`)

  return (
    <Box sx={{ width: '100%', height: '200px', mb: 3, ...sx }}>
      <Chart x={[0, 100]} y={[-1, data.length]}>
        <Axis left bottom />
        <AxisLabel bottom units='%'>
          Percentage
        </AxisLabel>
        {axisLabel && (
          <AxisLabel left units={units}>
            {axisLabel}
          </AxisLabel>
        )}
        <Ticks bottom />
        <TickLabels bottom />
        <TickLabels left labels={labels} values={labels.map((l, i) => i)} />
        <Plot>
          <Bar data={data} color={colors} direction='horizontal' />
        </Plot>
      </Chart>
    </Box>
  )
}

export default Histogram

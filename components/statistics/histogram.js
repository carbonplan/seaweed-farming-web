import {
  Chart,
  Plot,
  Bar,
  Axis,
  AxisLabel,
  TickLabels,
  Ticks,
  Label,
} from '@carbonplan/charts'
import { Box } from 'theme-ui'

const formatValue = (d) => (d < 0.05 ? 0 : d.toFixed(1))

const Histogram = ({ data, labels, colormap, sx, units, axisLabel }) => {
  const colors = colormap.map((d) => `rgb(${d})`)

  return (
    <Box sx={{ width: '100%', height: '200px', mb: 3, ...sx }}>
      <Chart
        x={[0, 100]}
        y={[-1, data.length]}
        padding={{ left: 70, right: [0, 0, 48, 54], bottom: 50 }}
      >
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
        {data.map(([x, y]) => (
          <Label
            key={x}
            x={y}
            y={x}
            height={1}
            verticalAlign='middle'
            sx={{ ml: 1 }}
          >
            {formatValue(y)}%
          </Label>
        ))}
      </Chart>
    </Box>
  )
}

export default Histogram

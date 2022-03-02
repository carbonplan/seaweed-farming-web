import { Box, Divider, Flex } from 'theme-ui'
import { Chart, Plot, Donut } from '@carbonplan/charts'

import LegendItem from './legend-item'

// todo:
// - deterministic ordering
// - average display
const DonutChart = ({ color, data, labels, opacity }) => {
  return (
    <Flex sx={{ flexDirection: ['column', 'column', 'column', 'row'] }}>
      <Box
        sx={{
          width: ['100px', '100px', '100px', '50%'],
          width: '200px',
          height: '100px',
          mb: 3,
        }}
      >
        <Chart padding={{ left: 0, bottom: 0 }}>
          <Plot square>
            <Donut
              data={data}
              innerRadius={0.26}
              color={color}
              opacity={opacity}
            />
          </Plot>
        </Chart>
      </Box>

      <Box>
        {labels.map((l, i) => (
          <LegendItem
            key={l}
            color={typeof color === 'string' ? color : color[i]}
            label={l}
            units='%'
            value={data[i] ? data[i] * 100 : 0}
          />
        ))}
      </Box>
    </Flex>
  )
}

export default DonutChart

import { Box, Flex } from 'theme-ui'
import { Chart, Plot, Donut } from '@carbonplan/charts'

import LegendItem from './legend-item'

// todo:
// - deterministic ordering
const DonutChart = ({ color, data, label, labels, units, summary }) => {
  return (
    <Box>
      <Box>
        <Flex sx={{ gap: 2, alignItems: 'baseline' }}>
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
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              fontSize: [0, 0, 0, 1],
              color: 'secondary',
            }}
          >
            {units}
          </Box>
        </Flex>

        <Flex>
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
                  opacity={1}
                />
              </Plot>
            </Chart>
          </Box>

          {summary && (
            <Box
              sx={{
                fontFamily: 'mono',
                letterSpacing: 'mono',
                fontSize: [3, 3, 4, 5],
                color,
              }}
            >
              {summary}
            </Box>
          )}
        </Flex>
      </Box>

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
  )
}

export default DonutChart

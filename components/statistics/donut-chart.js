import { Box, Flex } from 'theme-ui'
import { Chart, Plot, Donut } from '@carbonplan/charts'
import { Column, Row } from '@carbonplan/components'

import LegendItem from './legend-item'

// TODOs
// - improve summary positioning
// - specify summary value?

const DonutChart = ({ color, empty, data, label, labels, units, summary }) => {
  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Flex sx={{ gap: 2, alignItems: 'baseline', mb: 3 }}>
          <Box
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'smallcaps',
              fontSize: [2, 2, 2, 3],
            }}
          >
            {label}
          </Box>
        </Flex>
      </Column>

      <Column start={1} width={3}>
        <Flex sx={{ gap: 5 }}>
          <Box
            sx={{
              width: ['100px', '100px', '100px', '100px'],
              height: '100px',
              mb: 3,
            }}
          >
            <Chart padding={{ left: 0, bottom: 0 }}>
              <Plot square>
                <Donut
                  data={empty ? [1] : data}
                  innerRadius={0.26}
                  color={empty ? 'secondary' : color}
                  preserveOrder
                />
              </Plot>
            </Chart>
          </Box>
          {summary != null && (
            <Flex sx={{ gap: 2, alignItems: 'baseline' }}>
              <Box
                sx={{
                  fontFamily: 'mono',
                  letterSpacing: 'mono',
                  fontSize: [3, 3, 4, 5],
                  color: empty ? 'secondary' : 'primary',
                }}
              >
                {summary}
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
          )}
        </Flex>
      </Column>

      <Column start={1} width={3}>
        {labels.map((l, i) => (
          <LegendItem
            key={l}
            color={typeof color === 'string' ? color : color[i]}
            label={l}
            units={i === 0 ? units : null}
            value={data[i] ? data[i] * 100 : 0}
          />
        ))}
      </Column>
    </Row>
  )
}

export default DonutChart

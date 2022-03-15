import { Box, Flex } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'

import SummaryLegend from './summary-legend'

const Summary = ({ colors, data, label, labels, units, summary }) => {
  const empty = data.every((d) => !d)
  const percentages = data.reduce((a, d, i) => {
    const prev = a[i - 1] ?? 0
    const value = d ? d * 100 : 0
    a.push(prev + value)
    return a
  }, [])

  return (
    <Row columns={3}>
      <Column start={1} width={3}>
        <Flex
          sx={{
            alignItems: 'baseline',
            justifyContent: 'space-between',
            mb: 2,
          }}
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
                {empty ? 'N/A' : summary}
              </Box>
              {!empty && (
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
              )}
            </Flex>
          )}
          {summary == null && (
            <Box
              sx={{
                fontFamily: 'mono',
                fontSize: [3, 3, 4, 5],
                opacity: 0,
              }}
            >
              {'x'}
            </Box>
          )}
        </Flex>
      </Column>

      <Column start={1} width={3}>
        <Box
          sx={{
            mb: 3,
            width: '100%',
            height: '28px',
            background: empty
              ? 'secondary'
              : `linear-gradient(to right, ${percentages
                  .map(
                    (p, i) => `${colors[i]} ${percentages[i - 1] ?? 0}% ${p}%`
                  )
                  .join(', ')})`,
          }}
        />
      </Column>

      <Column start={1} width={3}>
        <SummaryLegend
          colors={colors}
          data={data}
          labels={labels}
          units={units}
        />
      </Column>
    </Row>
  )
}

export default Summary

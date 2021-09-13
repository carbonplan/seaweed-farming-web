import { Box } from 'theme-ui'
import { Group, Badge, Row, Column } from '@carbonplan/components'

import { useRegionData } from './context'
import { useParameters } from '../parameters'

const NAN = -9999

const averageData = (data) => {
  if (data.length === 0) {
    return null
  }

  const filteredData = data.filter((d) => d !== NAN)
  return filteredData.reduce((a, d) => a + d, 0) / filteredData.length
}

const valuesToCost = (values, parameters) => {
  const {
    capex,
    depthFactor,
    harvestCost,
    insurance,
    labor,
    license,
    lineCost,
    opex,
    waveFactor,
  } = parameters
  return values.Growth2.map((_, i) => {
    const Growth2 = values.Growth2[i]
    const elevation = values.elevation[i]
    const d2p = values.d2p[i]
    const wave_height = values.wave_height[i]

    // constants for forthcoming layers
    const lineDensity = 714286.0
    const nharv = 2.0

    // invert depth
    const depth = -1.0 * elevation

    // map to null if we have low or null value for growth
    if (Growth2 === NAN || Growth2 < 0.2) {
      return NAN
    }

    // parameters
    const cheapDepth = 50.0
    const priceyDepth = 150.0
    const lowWaveDamage = 1.0
    const highWaveDamage = 2.0

    // calculate depth premium
    let depthPremium
    if (depth <= cheapDepth) {
      depthPremium = 0.0
    }
    if (depth > cheapDepth && depth < priceyDepth) {
      depthPremium = (depth / priceyDepth) * depthFactor
    }
    if (depth > priceyDepth) {
      depthPremium = depthFactor
    }

    // calculate wave premium
    let wavePremium
    if (wave_height <= lowWaveDamage) {
      wavePremium = 0.0
    }
    if (wave_height > lowWaveDamage && wave_height < highWaveDamage) {
      wavePremium = (wave_height / highWaveDamage) * waveFactor
    }
    if (wave_height > highWaveDamage) {
      wavePremium = waveFactor
    }

    // calculate primary terms
    const capital =
      capex +
      depthPremium * capex +
      wavePremium * capex +
      lineCost * lineDensity
    const operations = opex + labor + insurance + license
    const harvest = harvestCost * nharv

    // combine terms
    return (capital + operations + harvest) / Growth2
  })
}

const AverageDisplay = ({ value, label, units }) => {
  return (
    <Row columns={3}>
      <Column
        start={1}
        width={1}
        sx={{ display: 'flex', alignItems: 'center' }}
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
      </Column>
      <Column start={2} width={2}>
        <Box sx={{ textAlign: 'right' }}>
          <Badge>{Number.isNaN(value) ? 'n/a' : value.toFixed(2)}</Badge>
          <br />
          <Box
            as='span'
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              fontSize: [0, 0, 0, 1],
              color: 'secondary',
            }}
          >
            {units}
          </Box>
        </Box>
      </Column>
    </Row>
  )
}

export const RegionDataDisplay = ({ sx }) => {
  const { regionData } = useRegionData()
  const parameters = useParameters()

  if (!regionData) {
    return null
  } else if (regionData.loading) {
    return 'loading...'
  } else {
    const cost = averageData(valuesToCost(regionData.value, parameters))
    const elevation = averageData(regionData.value.elevation)
    const Growth2 = averageData(regionData.value.Growth2) || 0

    return (
      <>
        <Box sx={sx.heading}>Inspector</Box>
        <Group>
          <AverageDisplay label='Cost' units='$ / ton DW' value={cost} />
          <AverageDisplay label='Depth' units='m' value={-1 * elevation} />
          <AverageDisplay label='Growth' units='tons DW/km²' value={Growth2} />
        </Group>
      </>
    )
  }
}

export default RegionDataDisplay

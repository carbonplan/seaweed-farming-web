import { Box } from 'theme-ui'
import { Group, Badge, Row, Column, Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

import { RecenterButton } from './recenter-button'
import { useRegionContext } from './context'
import { useParameters } from '../parameters'
import { useLayers } from '../layers'

const NAN = 9.969209968386869e36

const averageData = (data) => {
  if (data.length === 0) {
    return null
  }

  const filteredData = data.filter((d) => d !== NAN)
  return filteredData.reduce((a, d) => a + d, 0) / filteredData.length
}

const valuesToCost = (values, target, species, parameters) => {
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
    productValue,
    transportCost,
    conversionCost,
    sinkingValue,
  } = parameters
  const growthVariable = `harv_${species}`
  const nharvVariable = `nharv_${species}`

  return values.harv_preferred.map((_, i) => {
    const growth = values[growthVariable][i]
    const elevation = values.elevation[i]
    const d2p = values.d2p[i]
    const nharv = values[nharvVariable][i]
    const wave_height = values.wave_height[i]
    const d2sink = values.d2sink[i]

    // constants for forthcoming layers
    const lineDensity = 714286.0

    // invert depth
    const depth = -1.0 * elevation

    // map to null if we have low or null value for growth
    if (growth === NAN || growth < 0.2) {
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
    const growthCost = (capital + operations + harvest) / growth

    if (target === 'products') {
      // calculate product value
      return (
        growth * (productValue - transportCost * d2p - conversionCost) -
        growthCost
      )
    } else {
      // map to null null value for d2sink
      if (d2sink === NAN) {
        return NAN
      }

      // calculate sinking value
      return growth * (sinkingValue - transportCost * d2sink) - growthCost
    }
  })
}

const valuesToBenefit = (values, target, species, parameters) => {
  const {
    avoidedEmissions,
    transportEmissions,
    conversionEmissions,
    sequestrationRate,
    removalRate,
  } = parameters
  const growthVariable = `harv_${species}`

  return values.harv_preferred.map((_, i) => {
    const growth = values[growthVariable][i]
    const d2p = values.d2p[i]
    const fseq = values.fseq[i]
    const d2sink = values.d2sink[i]

    // constants for forthcoming layers
    const carbon_fraction = 0.248
    const carbon_to_co2 = 3.67

    // map to null if we have low or null value for growth
    if (growth === NAN || growth < 0.2) {
      return NAN
    }
    if (target === 'products') {
      // calculate climate benefit of products
      return (
        growth *
        (avoidedEmissions - transportEmissions * d2p - conversionEmissions)
      )
    } else {
      // map to null null value for d2sink
      if (d2sink === NAN) {
        return NAN
      }

      // calculate climate benefit of sinking
      return (
        growth *
        (carbon_fraction *
          carbon_to_co2 *
          fseq *
          sequestrationRate *
          removalRate -
          transportEmissions * d2sink)
      )
    }
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
  const {
    showRegionPicker,
    setShowRegionPicker,
    regionData,
  } = useRegionContext()
  const parameters = useParameters()
  const { target, species } = useLayers()

  let content
  if (showRegionPicker) {
    if (!regionData || regionData.loading) {
      content = 'loading...'
    } else {
      const cost = averageData(
        valuesToCost(
          regionData.value.all_variables,
          target,
          species,
          parameters
        )
      )
      const benefit = averageData(
        valuesToBenefit(
          regionData.value.all_variables,
          target,
          species,
          parameters
        )
      )
      const elevation = averageData(regionData.value.all_variables.elevation)
      const growth =
        averageData(regionData.value.all_variables[`harv_${species}`]) || 0

      content = (
        <>
          <Box
            as='span'
            sx={{
              fontFamily: 'faux',
              letterSpacing: 'faux',
              color: 'secondary',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: [1] }}>Recenter map</Box>
            <RecenterButton color='secondary' />
          </Box>
          <Group>
            <AverageDisplay label='Net cost' units='$ / ton DW' value={cost} />
            <AverageDisplay
              label='Climate benefit'
              units='tons CO₂e'
              value={benefit}
            />
            <AverageDisplay label='Depth' units='m' value={-1 * elevation} />
            <AverageDisplay label='Growth' units='tons DW/km²' value={growth} />
          </Group>
        </>
      )
    }
  }

  return (
    <>
      <Box
        sx={{
          ...sx.heading,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover > #expander': { stroke: 'secondary' },
            '&:hover > #label': { color: 'secondary' },
          },
        }}
        onClick={() => setShowRegionPicker(!showRegionPicker)}
      >
        <Box
          as='span'
          id='label'
          sx={{ color: 'primary', transition: 'color 0.15s' }}
        >
          Region data
        </Box>
        <Expander
          value={showRegionPicker}
          id='expander'
          sx={{ position: 'relative' }}
        />
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker && regionData ? 'auto' : 0}
        easing={'linear'}
      >
        {content || null}
      </AnimateHeight>
    </>
  )
}

export default RegionDataDisplay

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
      // calculate net product cost
      return growthCost + transportCost * d2p + conversionCost - productValue
    } else {
      // map to null null value for d2sink
      if (d2sink === NAN) {
        return NAN
      }

      // calculate net sinking cost
      return growthCost + transportCost * d2sink - sinkingValue
    }
  })
}

const valuesToBenefit = (values, target, species, parameters) => {
  const {
    avoidedEmissions,
    transportEmissions,
    conversionEmissions,
    harvestTransportEmissions,
    setupEmissions,
    sequestrationRate,
    removalRate,
  } = parameters
  const growthVariable = `harv_${species}`
  const nharvVariable = `nharv_${species}`

  return values.harv_preferred.reduce(
    (accum, _, i) => {
      const growth = values[growthVariable][i]
      const nharv = values[nharvVariable][i]
      const d2p = values.d2p[i]
      const fseq = values.fseq[i]
      const d2sink = values.d2sink[i]

      // constants for forthcoming layers
      const carbon_fraction = 0.248
      const carbon_to_co2 = 3.67

      // map to null if we have low or null value for growth
      if (growth === NAN || growth < 0.2) {
        accum.net.push(NAN)
        accum.benefit.push(NAN)
        accum.growth.push(NAN)
        return accum
      }

      const growthEmissions =
        nharv * d2p * harvestTransportEmissions + setupEmissions * 2.0 * d2p
      let emissionsBenefit
      let transport = 0
      let conversion = 0
      if (target === 'products') {
        // calculate climate benefit of products
        emissionsBenefit = avoidedEmissions
        transport = transportEmissions * d2p
        conversion = conversionEmissions
      } else {
        // map to null when null value for d2sink
        if (d2sink === NAN) {
          accum.net.push(NAN)
          accum.benefit.push(NAN)
          accum.growth.push(NAN)
          return accum
        }

        // calculate climate benefit of sinking
        emissionsBenefit =
          carbon_fraction *
          carbon_to_co2 *
          fseq *
          sequestrationRate *
          removalRate
        transport = transportEmissions * d2sink
      }

      accum.net.push(
        emissionsBenefit - growthEmissions - transport - conversion
      )
      accum.benefit.push(emissionsBenefit)
      accum.growth.push(growthEmissions)
      accum.transport.push(transport)
      accum.conversion.push(conversion)
      return accum
    },
    { net: [], benefit: [], growth: [], transport: [], conversion: [] }
  )
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
      const {
        net: netBenefit,
        benefit: emissionsBenefit,
        growth: growthEmissions,
        transport: transportEmissions,
        conversion: conversionEmissions,
      } = valuesToBenefit(
        regionData.value.all_variables,
        target,
        species,
        parameters
      )

      const benefit = averageData(netBenefit)
      const cost = averageData(
        valuesToCost(
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
            <AverageDisplay
              label='Net climate benefit'
              units='tons CO₂e'
              value={averageData(netBenefit)}
            />
            <AverageDisplay
              label='Emissions benefit'
              units='tons CO₂e'
              value={averageData(emissionsBenefit)}
            />
            <AverageDisplay
              label='Production emissions'
              units='tons CO₂e'
              value={averageData(growthEmissions)}
            />
            <AverageDisplay
              label='Transport emissions'
              units='tons CO₂e'
              value={averageData(transportEmissions)}
            />
            <AverageDisplay
              label='Conversion emissions'
              units='tons CO₂e'
              value={averageData(conversionEmissions)}
            />
            ------
            <AverageDisplay
              label='Cost of avoided emissions'
              units='$ / ton CO₂e'
              value={benefit / cost}
            />
            <AverageDisplay label='Net cost' units='$ / ton DW' value={cost} />
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
          Statistics
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

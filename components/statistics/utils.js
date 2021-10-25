import {
  NAN,
  EQUIPMENT_MAPPING,
  LINE_DENSITY_MAPPING,
  SPECIES,
} from '../../constants'

export const averageData = (data) => {
  if (data.length === 0) {
    return NaN
  }

  const filteredData = data.filter((d) => d !== NAN)
  return filteredData.reduce((a, d) => a + d, 0) / filteredData.length
}

export const valuesToCost = (values, target, parameters) => {
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

  return values.harv_preferred.reduce(
    (accum, _, i) => {
      const growth = values.harv_preferred[i]
      const elevation = values.elevation[i]
      const d2p = values.d2p[i]
      const nharv = values.nharv_preferred[i]
      const wave_height = values.wave_height[i]
      const d2sink = values.d2sink[i]

      const species = SPECIES[values.species_preferred[i]]
      const lineDensity = LINE_DENSITY_MAPPING[species]
      const equipment = EQUIPMENT_MAPPING[species]

      // invert depth
      const depth = -1.0 * elevation

      // map to null if we have low or null value for growth
      if (growth === NAN || growth < 0.2) {
        accum.netCost.push(NAN)
        accum.grossCost.push(NAN)
        accum.grossIncome.push(NAN)
        return accum
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
      const harvest =
        harvestCost +
        growth * transportCost * nharv * d2p +
        transportCost * equipment * d2p

      // combine terms
      const growthCost = (capital + operations + harvest) / growth

      let grossIncome
      let grossCost
      if (target === 'products') {
        grossIncome = productValue
        grossCost = growthCost + transportCost * d2p + conversionCost
      } else {
        // map to null value for d2sink
        if (d2sink === NAN) {
          accum.netCost.push(NAN)
          accum.grossCost.push(NAN)
          accum.grossIncome.push(NAN)
          return accum
        }

        grossIncome = sinkingValue
        grossCost = growthCost + transportCost * d2sink
      }

      accum.netCost.push(grossCost - grossIncome)
      accum.grossCost.push(grossCost)
      accum.grossIncome.push(grossIncome)

      return accum
    },
    {
      netCost: [],
      grossIncome: [],
      grossCost: [],
    }
  )
}

export const valuesToBenefit = (values, target, parameters) => {
  const {
    avoidedEmissions,
    transportEmissions,
    conversionEmissions,
    sequestrationRate,
    removalRate,
  } = parameters

  return values.harv_preferred.reduce(
    (accum, _, i) => {
      const growth = values.harv_preferred[i]
      const nharv = values.nharv_preferred[i]
      const d2p = values.d2p[i]
      const fseq = values.fseq[i]
      const d2sink = values.d2sink[i]

      const species = SPECIES[values.species_preferred[i]]
      const equipment = EQUIPMENT_MAPPING[species]

      // constants for forthcoming layers
      const carbon_fraction = 0.248
      const carbon_to_co2 = 3.67

      // map to null if we have low or null value for growth
      if (growth === NAN || growth < 0.2) {
        accum.netBenefit.push(NAN)
        accum.grossBenefit.push(NAN)
        accum.grossEmissions.push(NAN)
        return accum
      }

      const growthEmissions =
        (growth * transportEmissions * nharv * d2p +
          transportEmissions * equipment * d2p) /
        growth
      let grossBenefit
      let transport = 0
      let conversion = 0
      if (target === 'products') {
        // calculate climate benefit of products
        grossBenefit = avoidedEmissions
        transport = transportEmissions * d2p
        conversion = conversionEmissions
      } else {
        // map to null when null value for d2sink
        if (d2sink === NAN) {
          accum.netBenefit.push(NAN)
          accum.grossBenefit.push(NAN)
          accum.grossEmissions.push(NAN)
          return accum
        }

        // calculate climate benefit of sinking
        grossBenefit =
          carbon_fraction *
          carbon_to_co2 *
          fseq *
          sequestrationRate *
          removalRate
        transport = transportEmissions * d2sink
      }

      const grossEmissions = growthEmissions + transport + conversion

      accum.netBenefit.push(grossBenefit - grossEmissions)
      accum.grossBenefit.push(grossBenefit)
      accum.grossEmissions.push(grossEmissions)
      return accum
    },
    {
      netBenefit: [],
      grossBenefit: [],
      grossEmissions: [],
    }
  )
}

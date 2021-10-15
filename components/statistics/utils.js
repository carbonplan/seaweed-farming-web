const NAN = 9.969209968386869e36

export const averageData = (data) => {
  if (data.length === 0) {
    return null
  }

  const filteredData = data.filter((d) => d !== NAN)
  return filteredData.reduce((a, d) => a + d, 0) / filteredData.length
}

export const valuesToCost = (values, target, species, parameters) => {
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
      return (
        growthCost +
        growth * (transportCost * d2p + conversionCost - productValue)
      )
    } else {
      // map to null null value for d2sink
      if (d2sink === NAN) {
        return NAN
      }

      // calculate net sinking cost
      return growthCost + growth * (transportCost * d2sink - sinkingValue)
    }
  })
}

export const valuesToBenefit = (values, target, species, parameters) => {
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

import {
  NAN,
  EQUIPMENT_MAPPING,
  LINE_DENSITY_MAPPING,
  SPECIES,
} from '../../constants'

export const averageData = (data, area) => {
  const totalArea = area
    .filter((a) => a !== NAN)
    .reduce((accum, a) => a + accum, 0)

  return data.reduce((a, d, i) => {
    const dArea = area[i]
    if (d === NAN || dArea === NAN) {
      return a
    } else {
      const areaWeight = dArea / totalArea
      return a + d * areaWeight
    }
  }, 0)
}

export const weightedData = (data, area) => {
  const totalArea = area
    .filter((a) => a !== NAN)
    .reduce((accum, a) => a + accum, 0)

  return data.reduce((a, d, i) => {
    const dArea = area[i]
    if (d === NAN || dArea === NAN) {
      return a
    } else {
      a[d] = a[d] || 0
      a[d] += dArea / totalArea
      return a
    }
  }, {})
}

const isMasked = ({ seaweed_dw, sensitive_areas }, sensitiveAreaMask) => {
  // map to null if we have low or null value for seaweed growth
  if (seaweed_dw === NAN || seaweed_dw < 0.2) {
    return true
  }

  // map to null if sensitiveAreaMask exactly matches value
  if (sensitiveAreaMask > 0.0 && sensitiveAreaMask === sensitive_areas) {
    return true
  }

  // map to null if all sensitive areas are masked (sensitiveAreaMask=3) and sensitive in some way
  if (sensitiveAreaMask === 3 && sensitive_areas > 0.0) {
    return true
  }
}

export const valuesToCost = (values, target, parameters, sensitiveAreaMask) => {
  const {
    capex,
    depthFactor,
    harvestCost,
    lineCost,
    opex,
    waveFactor,
    transportCost,
    conversionCost,
  } = parameters

  return values.harv_preferred.reduce((accum, _, i) => {
    const seaweed_dw = values.harv_preferred[i]
    const seaweed_ww = seaweed_dw / 0.1
    const elevation = values.elevation[i]
    const d2p = values.d2p[i]
    const nharv = values.nharv_preferred[i]
    const wave_height = values.wave_height[i]
    const d2sink = values.d2sink[i]
    const sensitive_areas = values.sensitive_areas[i]

    const species = SPECIES[values.species_preferred[i]]
    const lineDensity = LINE_DENSITY_MAPPING[species]
    const equipment = EQUIPMENT_MAPPING[species]

    // invert depth
    const depth = -1.0 * elevation

    if (isMasked({ seaweed_dw, sensitive_areas }, sensitiveAreaMask)) {
      accum.push(NAN)
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
    if (depth >= priceyDepth) {
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
    if (wave_height >= highWaveDamage) {
      wavePremium = waveFactor
    }

    // calculate primary terms
    const capital =
      capex +
      depthPremium * capex +
      wavePremium * capex +
      lineCost * lineDensity
    const harvest = harvestCost * nharv + transportCost * equipment * d2p

    // combine terms
    const growthCost = (capital + opex + harvest) / seaweed_dw

    let grossCost
    if (target === 'products') {
      grossCost =
        growthCost +
        conversionCost +
        (transportCost * d2p * seaweed_ww) / seaweed_dw
    } else {
      // map to null value for d2sink
      if (d2sink === NAN) {
        accum.push(NAN)
        return accum
      }

      grossCost =
        growthCost +
        (transportCost * (d2sink * seaweed_ww + 2.0 * d2sink * equipment)) /
          seaweed_dw
    }

    accum.push(grossCost)

    return accum
  }, [])
}

export const valuesToBenefit = (
  values,
  target,
  parameters,
  sensitiveAreaMask
) => {
  const {
    avoidedEmissions,
    transportEmissions,
    conversionEmissions,
    maintenanceEmissions,
    removalRate,
  } = parameters

  return values.harv_preferred.reduce((accum, _, i) => {
    const seaweed_dw = values.harv_preferred[i]
    const seaweed_ww = seaweed_dw / 0.1
    const d2p = values.d2p[i]
    const fseq = values.fseq[i]
    const d2sink = values.d2sink[i]
    const sensitive_areas = values.sensitive_areas[i]

    const species = SPECIES[values.species_preferred[i]]
    const equipment = EQUIPMENT_MAPPING[species]

    // constants for forthcoming layers
    const carbon_fraction = 0.248
    const carbon_to_co2 = 3.67

    if (isMasked({ seaweed_dw, sensitive_areas }, sensitiveAreaMask)) {
      accum.push(NAN)
      return accum
    }

    const growthEmissions =
      (transportEmissions * equipment * d2p +
        d2p * 24.0 * maintenanceEmissions +
        50.0 * maintenanceEmissions) /
      seaweed_dw
    let grossBenefit
    let transport = 0
    let conversion = 0
    if (target === 'products') {
      // calculate climate benefit of products
      grossBenefit = avoidedEmissions
      transport = (transportEmissions * d2p * seaweed_ww) / seaweed_dw
      conversion = conversionEmissions
    } else {
      // map to null when null value for d2sink
      if (d2sink === NAN) {
        accum.push(NAN)
        return accum
      }

      // calculate climate benefit of sinking
      grossBenefit = carbon_fraction * carbon_to_co2 * fseq * removalRate
      transport =
        (transportEmissions *
          (d2sink * seaweed_ww + 2.0 * d2sink * equipment)) /
        seaweed_dw
    }

    const grossEmissions = growthEmissions + transport + conversion
    const netBenefit = grossBenefit - grossEmissions

    if (netBenefit < 0) {
      accum.push(NAN)
    } else {
      accum.push(netBenefit)
    }
    return accum
  }, [])
}

export const valuesToMitigationCost = (
  values,
  target,
  parameters,
  sensitiveAreaMask
) => {
  const netBenefit = valuesToBenefit(
    values,
    target,
    parameters,
    sensitiveAreaMask
  )
  const projectCost = valuesToCost(
    values,
    target,
    parameters,
    sensitiveAreaMask
  )

  return projectCost.map((c, i) => {
    if (c === NAN || netBenefit[i] === NAN) {
      return NAN
    }
    const netCost = target === 'products' ? c - parameters.productValue : c
    return netCost / netBenefit[i]
  })
}

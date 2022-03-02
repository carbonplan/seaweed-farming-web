import { NAN } from '../../constants'

import { calculateBenefit, calculateCost, SPECIES } from '../../model'

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

const isMasked = (
  { seaweed_dw, sensitive_areas, d2sink },
  sensitiveAreaMask,
  target
) => {
  // map to null if we have low or null value for seaweed growth
  if (seaweed_dw === NAN || seaweed_dw < 0.2) {
    return true
  }

  // map to null if we have no sinking location
  if (target === 'sinking' && d2sink === NAN) {
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
  return values.harv_preferred.reduce((accum, _, i) => {
    const seaweed_dw = values.harv_preferred[i]
    const sensitive_areas = values.sensitive_areas[i]
    const d2sink = values.d2sink[i]

    if (
      isMasked(
        { seaweed_dw, sensitive_areas, d2sink },
        sensitiveAreaMask,
        target
      )
    ) {
      accum.push(NAN)
      return accum
    }

    const cost = calculateCost(
      target,
      {
        seaweed_dw,
        depth: -1.0 * values.elevation[i],
        d2p: values.d2p[i],
        nharv: values.nharv_preferred[i],
        wave_height: values.wave_height[i],
        d2sink,
        species: SPECIES[values.species_preferred[i]],
      },
      parameters
    )

    accum.push(cost)
    return accum
  }, [])
}

export const valuesToBenefit = (
  values,
  target,
  parameters,
  sensitiveAreaMask
) => {
  return values.harv_preferred.reduce((accum, _, i) => {
    const seaweed_dw = values.harv_preferred[i]
    const d2sink = values.d2sink[i]
    const sensitive_areas = values.sensitive_areas[i]

    if (
      isMasked(
        { seaweed_dw, sensitive_areas, d2sink },
        sensitiveAreaMask,
        target
      )
    ) {
      accum.push(NAN)
      return accum
    }

    const benefit = calculateBenefit(
      target,
      {
        seaweed_dw,
        d2p: values.d2p[i],
        fseq_transport: values.fseq_transport[i],
        d2sink,
        species: SPECIES[values.species_preferred[i]],
      },
      parameters
    )

    if (benefit < 0) {
      accum.push(NAN)
    } else {
      accum.push(benefit)
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

import { bin } from 'd3-array'

import Summary from './summary'
import { averageData } from './utils'
import { formatValue } from '../utils'
import { NAN } from '../../constants'

const getDonutData = (data, area, clim) => {
  const filteredData = data.filter((d, i) => d !== NAN && area[i] !== NAN)
  const thresholds = [0, 1, 2, 3, 4].map(
    (d) => clim[0] + (d * (clim[1] - clim[0])) / 5
  )
  const initBins = bin().domain(clim).thresholds(thresholds)(filteredData)

  const bins = initBins.map((bin, i) => {
    return {
      label: `${formatValue(bin.x0)} - ${formatValue(bin.x1)}`,
      x0: bin.x0,
      x1: bin.x1,
      count: 0,
      value: 0,
      sum: 0,
    }
  })

  const totalArea = area
    .filter((a, i) => a !== NAN && data[i] !== NAN)
    .reduce((accum, a) => a + accum, 0)

  data.forEach((d, i) => {
    const dArea = area[i]
    if (d === NAN || dArea === NAN) {
      return
    }

    let index = bins.findIndex((bin) => d >= bin.x0 && d < bin.x1)

    let bin = bins[index]
    if (d < bins[0].x0) {
      bin = bins[0]
      bin.label = `<${formatValue(bin.x0)} - ${formatValue(bin.x1)}`
    } else if (d >= bins[bins.length - 1].x1) {
      bin = bins[bins.length - 1]
      if (d > bins[bins.length - 1].x1)
        bin.label = `${formatValue(bin.x0)} - ${formatValue(bin.x1)}+`
    }

    bin.count += 1
    bin.sum += d
    bin.value += dArea / totalArea
  })

  return bins
}

const BinnedSummary = ({ clim, colormap, data, area, label, units }) => {
  const bins = getDonutData(data, area, clim)

  const colors = bins.map((bin) => {
    let average
    if (bin.count) {
      average = bin.sum / bin.count
    } else {
      average = (bin.x0 + bin.x1) / 2
    }
    const ratio = (average - clim[0]) / (clim[1] - clim[0])
    const index = Math.max(
      Math.min(Math.round(ratio * (colormap.length - 1)), colormap.length - 1),
      0
    )
    return colormap[index]
  })

  return (
    <Summary
      data={bins.map((b) => b.value)}
      labels={bins.map((b) => b.label)}
      colors={colors.map((c) => `rgb(${c})`)}
      units={units}
      label={label}
      summary={formatValue(averageData(data, area))}
    />
  )
}

export default BinnedSummary

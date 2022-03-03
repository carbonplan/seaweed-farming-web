import { bin } from 'd3-array'

import DonutChart from './donut-chart'
import { averageData } from './utils'
import { formatValue } from '../utils'
import { NAN } from '../../constants'
import { useEffect, useRef } from 'react'

// TODOs
// - handle 0 bins
// - handle 1 bin
// - improve units
// - specify summary value color
const BinnedDonutChart = ({
  clim,
  colormap,
  data,
  area,
  label,
  setClim,
  units,
  thresholds = 4,
}) => {
  const { current: initialClim } = useRef(clim)
  const filteredData = data.filter((d, i) => d !== NAN && area[i] !== NAN)
  const binnedData = bin().thresholds(thresholds)(filteredData)

  useEffect(() => {
    return () => {
      setClim(initialClim)
    }
  }, [])

  const clim0 = binnedData[0].x0
  const clim1 = binnedData[binnedData.length - 1].x1

  useEffect(() => {
    if (clim0 !== clim[0] || clim1 !== clim[1]) {
      setClim([clim0, clim1])
    }
  }, [clim, clim0, clim1])

  const totalArea = area
    .filter((a, i) => a !== NAN && data[i] !== NAN)
    .reduce((accum, a) => a + accum, 0)

  const donutData = data.reduce(
    (a, d, i) => {
      const dArea = area[i]
      if (d === NAN || dArea === NAN) {
        return a
      } else {
        const index = binnedData.findIndex((bin) => bin.x0 <= d && d <= bin.x1)
        a[index] += dArea / totalArea
        return a
      }
    },
    binnedData.map(() => 0)
  )

  const donutLabels = binnedData.map((bin) => `${bin.x0} - ${bin.x1}`)

  const colors = binnedData.map((bin) => {
    const average = (bin.x0 + bin.x1) / 2
    const ratio = (average - clim[0]) / (clim[1] - clim[0])
    const index = Math.round(ratio * (colormap.length - 1))
    return colormap[index]
  })

  return (
    <DonutChart
      data={donutData}
      labels={donutLabels}
      color={colors.map((c) => `rgb(${c})`)}
      units={units}
      label={label}
      summary={formatValue(averageData(data, area))}
    />
  )
}

export default BinnedDonutChart

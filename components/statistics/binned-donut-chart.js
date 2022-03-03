import { bin } from 'd3-array'

import DonutChart from './donut-chart'
import { averageData } from './utils'
import { formatValue } from '../utils'
import { NAN } from '../../constants'

// TODOs
// - handle 0 bins
// - handle 1 bin
// - improve units
const BinnedDonutChart = ({ data, area, label, units, thresholds = 4 }) => {
  const filteredData = data.filter((d, i) => d !== NAN && area[i] !== NAN)
  const binnedData = bin().thresholds(thresholds)(filteredData)

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

  return (
    <DonutChart
      data={donutData}
      labels={donutLabels}
      color='teal'
      units={units}
      label={label}
      summary={formatValue(averageData(data, area))}
    />
  )
}

export default BinnedDonutChart

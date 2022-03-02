import { bin } from 'd3-array'
import { NAN } from '../../constants'
import DonutChart from './donut-chart'

// TODOs
// - handle 0 bins
// - handle 1 bin
// - improve units
const BinnedDonutChart = ({ data, area, units = '', thresholds = 4 }) => {
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

  const donutLabels = binnedData.map((bin) => `${bin.x0}-${bin.x1}${units}`)

  return <DonutChart data={donutData} labels={donutLabels} color='teal' />
}

export default BinnedDonutChart

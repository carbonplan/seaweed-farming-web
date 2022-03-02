import { Box, Divider } from 'theme-ui'

import AverageDisplay from './average-display'
import BinnedDonutChart from './binned-donut-chart'
import DonutChart from './donut-chart'

import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import {
  averageData,
  weightedData,
  valuesToBenefit,
  valuesToCost,
  valuesToMitigationCost,
} from './utils'
import { useCustomColormap } from '../utils'
import { LABEL_MAP, NAN } from '../../constants'
import { LAYER_UNITS, SPECIES } from '../../model'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { layer, target, sensitiveAreaMask } = useLayers()
  const { colormap } = useCustomColormap(layer)

  if (!data || !data.value) {
    return 'loading...'
  } else {
    const { area } = data.value.all_variables

    const showOutput = ['mitigationCost', 'cost', 'benefit'].includes(layer)

    if (showOutput) {
      const netBenefit = valuesToBenefit(
        data.value.all_variables,
        target,
        parameters,
        sensitiveAreaMask
      )

      const projectCost = valuesToCost(
        data.value.all_variables,
        target,
        parameters,
        sensitiveAreaMask
      )

      const mitigationCost = valuesToMitigationCost(
        data.value.all_variables,
        target,
        parameters,
        sensitiveAreaMask
      )

      return (
        <Box sx={{ mb: [-3] }}>
          <AverageDisplay
            label={LABEL_MAP.mitigationCost[target]}
            units={LAYER_UNITS.mitigationCost[target]}
            value={averageData(mitigationCost, area)}
          />
          <Divider sx={{ my: [4] }} />
          <AverageDisplay
            label={LABEL_MAP.benefit}
            units={LAYER_UNITS.benefit[target]}
            value={averageData(netBenefit, area)}
          />
          <Divider sx={{ my: [4] }} />
          <AverageDisplay
            label={LABEL_MAP.cost}
            units={LAYER_UNITS.cost[target]}
            value={averageData(projectCost, area)}
          />
        </Box>
      )
    } else if (layer === 'species_preferred') {
      const ratios = weightedData(
        data.value.all_variables['species_preferred'],
        area
      )
      return (
        <Box sx={{ mb: [-3] }}>
          <DonutChart
            color={colormap.map((d) => `rgb(${d})`)}
            labels={SPECIES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
            data={SPECIES.map((s, i) => ratios[i])}
            opacity={1}
          />
        </Box>
      )
    } else if (layer === 'nharv') {
      const ratios = weightedData(
        data.value.all_variables['nharv_preferred'],
        area
      )

      return (
        <Box sx={{ mb: [-3] }}>
          <DonutChart
            color={colormap.map((d) => `rgb(${d})`)}
            labels={colormap.map((k, i) => `${i + 1} / year`)}
            data={colormap.map((k, i) => ratios[i + 1])}
            opacity={1}
          />
        </Box>
      )
    } else {
      let values = data.value.all_variables[layer]
      if (layer === 'depth') {
        values = data.value.all_variables['elevation'].map((v) =>
          v === NAN ? NAN : v * -1
        )
      } else if (layer === 'seaweed_dw') {
        values = data.value.all_variables['harv_preferred']
      }
      return (
        <Box sx={{ mb: [-3] }}>
          <AverageDisplay
            label={LABEL_MAP[layer]}
            units={LAYER_UNITS[layer][target]}
            value={averageData(values, area)}
          />
          <BinnedDonutChart
            data={values}
            area={area}
            units={LAYER_UNITS[layer][target]}
          />
        </Box>
      )
    }
  }
}

export default DataDisplay

import { Box } from 'theme-ui'
import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import AverageDisplay from './average-display'
import {
  averageData,
  weightedData,
  valuesToBenefit,
  valuesToCost,
  valuesToMitigationCost,
} from './utils'
import { LABEL_MAP, NAN } from '../../constants'
import { LAYER_UNITS, SPECIES } from '../../model'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { layer, target, sensitiveAreaMask } = useLayers()

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
          <AverageDisplay
            label={LABEL_MAP.benefit}
            units={LAYER_UNITS.benefit[target]}
            value={averageData(netBenefit, area)}
          />
          <AverageDisplay
            label={LABEL_MAP.cost}
            units={LAYER_UNITS.cost}
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
          {SPECIES.map((s, i) => (
            <AverageDisplay
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              units='%'
              value={ratios[i] * 100}
            />
          ))}
        </Box>
      )
    } else if (layer === 'nharv') {
      const ratios = weightedData(
        data.value.all_variables['nharv_preferred'],
        area
      )

      return (
        <Box sx={{ mb: [-3] }}>
          {Object.keys(ratios).map((k) => (
            <AverageDisplay
              key={k}
              label={`${k} / year`}
              units={'%'}
              value={ratios[k] * 100}
            />
          ))}
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
        </Box>
      )
    }
  }
}

export default DataDisplay

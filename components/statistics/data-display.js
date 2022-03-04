import BinnedSummary from './binned-summary'
import Summary from './summary'

import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import {
  averageData,
  weightedData,
  valuesToBenefit,
  valuesToCost,
  valuesToMitigationCost,
} from './utils'
import { formatValue, useCustomColormap } from '../utils'

import { LABEL_MAP, NAN } from '../../constants'
import { LAYER_UNITS, SPECIES } from '../../model'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { layer, target, clim, sensitiveAreaMask } = useLayers()
  const { colormap } = useCustomColormap(layer)

  if (!data || !data.value) {
    return 'loading...'
  } else {
    const { area } = data.value.all_variables

    if (layer === 'species_preferred') {
      const ratios = weightedData(
        data.value.all_variables['species_preferred'],
        area
      )
      return (
        <Summary
          colors={colormap.map((d) => `rgb(${d})`)}
          labels={SPECIES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
          data={SPECIES.map((s, i) => ratios[i])}
          label={LABEL_MAP[layer]}
        />
      )
    } else if (layer === 'nharv') {
      const ratios = weightedData(
        data.value.all_variables['nharv_preferred'],
        area
      )
      const ratioData = colormap.map((k, i) => ratios[i + 1])

      return (
        <Summary
          colors={colormap.map((d) => `rgb(${d})`)}
          labels={colormap.map((k, i) => i + 1)}
          data={ratioData}
          label={LABEL_MAP[layer]}
          units={LAYER_UNITS[layer][target]}
          summary={
            ratioData.every((d) => !d)
              ? 'N/A'
              : formatValue(
                  averageData(data.value.all_variables['nharv_preferred'], area)
                )
          }
        />
      )
    } else {
      let values
      switch (layer) {
        case 'mitigationCost':
          values = valuesToMitigationCost(
            data.value.all_variables,
            target,
            parameters,
            sensitiveAreaMask
          )
          break
        case 'cost':
          values = valuesToCost(
            data.value.all_variables,
            target,
            parameters,
            sensitiveAreaMask
          )
          break
        case 'benefit':
          values = valuesToBenefit(
            data.value.all_variables,
            target,
            parameters,
            sensitiveAreaMask
          )
          break
        case 'depth':
          values = data.value.all_variables['elevation'].map((v) =>
            v === NAN ? NAN : v * -1
          )
          break
        case 'seaweed_dw':
          values = data.value.all_variables['harv_preferred']
          break
        default:
          values = data.value.all_variables[layer]
          break
      }
      return (
        <BinnedSummary
          clim={clim}
          colormap={colormap}
          data={values}
          area={area}
          label={
            typeof LABEL_MAP[layer] === 'string'
              ? LABEL_MAP[layer]
              : LABEL_MAP[layer][target]
          }
          units={LAYER_UNITS[layer][target]}
        />
      )
    }
  }
}

export default DataDisplay

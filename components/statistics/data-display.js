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
          data={SPECIES.map((s, i) =>
            s === 'temperate brown' ? ratios[i] + ratios[i + 1] : ratios[i]
          )}
          label={LABEL_MAP[layer]}
        />
      )
    } else if (layer === 'nharv') {
      const rawRatios = weightedData(
        data.value.all_variables['nharv_preferred'],
        area
      )
      const ratios = [
        rawRatios[1],
        rawRatios[2],
        rawRatios[3],
        rawRatios[4],
        rawRatios[5],
        rawRatios[6],
        rawRatios[7],
        rawRatios[8],
      ].map((d) => (typeof d === 'number' && !Number.isNaN(d) ? d : 0))
      return (
        <Summary
          colors={[
            ratios[0] > ratios[1] ? colormap[0] : colormap[1],
            ratios[2] > ratios[3] ? colormap[2] : colormap[3],
            ratios[4] > ratios[5] ? colormap[4] : colormap[5],
            ratios[6] > ratios[7] ? colormap[6] : colormap[7],
          ].map((d) => `rgb(${d})`)}
          labels={['1 - 2', '3 - 4', '5 - 6', '7 - 8']}
          data={[
            ratios[0] + ratios[1],
            ratios[2] + ratios[3],
            ratios[4] + ratios[5],
            ratios[6] + ratios[7],
          ].map((d) => (Number.isNaN(d) ? 0 : d))}
          label={LABEL_MAP[layer]}
          units={LAYER_UNITS[layer][target]}
          summary={formatValue(
            averageData(data.value.all_variables['nharv_preferred'], area)
          )}
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

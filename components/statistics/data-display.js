import { Group } from '@carbonplan/components'

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
import {
  LABEL_MAP,
  UNITS_MAP,
  LINE_DENSITY_MAPPING,
  SPECIES,
  NAN,
} from '../../constants'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { layer, target } = useLayers()

  if (!data || data.loading) {
    return 'loading...'
  } else {
    const { area } = data.value.all_variables

    const showOutput = ['mitigationCost', 'cost', 'benefit'].includes(layer)

    if (showOutput) {
      const netBenefit = valuesToBenefit(
        data.value.all_variables,
        target,
        parameters
      )

      const projectCost = valuesToCost(
        data.value.all_variables,
        target,
        parameters
      )

      const mitigationCost = valuesToMitigationCost(
        data.value.all_variables,
        target,
        parameters
      )

      return (
        <Group spacing={4}>
          <AverageDisplay
            label={LABEL_MAP.mitigationCost[target]}
            units={UNITS_MAP.mitigationCost[target]}
            value={averageData(mitigationCost, area)}
          />
          <AverageDisplay
            label={LABEL_MAP.benefit}
            units={UNITS_MAP.benefit[target]}
            value={averageData(netBenefit, area)}
          />
          <AverageDisplay
            label={LABEL_MAP.cost}
            units={UNITS_MAP.cost}
            value={averageData(projectCost, area)}
          />
        </Group>
      )
    } else if (layer === 'species_preferred') {
      const ratios = weightedData(
        data.value.all_variables['species_preferred'],
        area
      )
      return (
        <Group spacing={2}>
          {SPECIES.map((s, i) => (
            <AverageDisplay
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              units='%'
              value={ratios[i] * 100}
            />
          ))}
        </Group>
      )
    } else if (layer === 'nharv') {
      const ratios = weightedData(
        data.value.all_variables['nharv_preferred'],
        area
      )

      console.log(ratios)

      return (
        <Group spacing={2}>
          {Object.keys(ratios).map((k) => (
            <AverageDisplay
              key={k}
              label={`${k} / year`}
              units={'%'}
              value={ratios[k] * 100}
            />
          ))}
        </Group>
      )
    } else {
      let values = data.value.all_variables[layer]
      if (layer === 'depth') {
        values = data.value.all_variables['elevation'].map((v) =>
          v === NAN ? NAN : v * -1
        )
      } else if (layer === 'growth') {
        values = data.value.all_variables['harv_preferred']
      } else if (layer === 'lineDensity') {
        values = data.value.all_variables['species_preferred'].map((s) =>
          SPECIES[s] ? LINE_DENSITY_MAPPING[SPECIES[s]] / 1000000 : NAN
        )
      }
      return (
        <AverageDisplay
          label={LABEL_MAP[layer]}
          units={
            typeof UNITS_MAP[layer] === 'string'
              ? UNITS_MAP[layer]
              : UNITS_MAP[layer][target]
          }
          value={averageData(values, area)}
        />
      )
    }
  }
}

export default DataDisplay

import { Group } from '@carbonplan/components'

import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import AverageDisplay from './average-display'
import { averageData, valuesToBenefit, valuesToCost } from './utils'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { target } = useLayers()

  if (!data || data.loading) {
    return 'loading...'
  } else {
    const { harv_preferred, area } = data.value.all_variables
    const netBenefit = valuesToBenefit(
      data.value.all_variables,
      target,
      parameters
    )

    const benefitUnits = target === 'products' ? 'tCO₂e' : 'tCO₂'
    const projectCost = valuesToCost(
      data.value.all_variables,
      target,
      parameters
    )
    const avgCost = averageData(projectCost, area)

    const growth = averageData(harv_preferred, area) || 0

    return (
      <Group spacing={4}>
        <AverageDisplay
          label='Net carbon benefit'
          units={`${benefitUnits} / ton DW`}
          value={averageData(netBenefit, area)}
        />
        <AverageDisplay
          label='Project cost'
          units='$ / ton DW'
          value={averageData(projectCost, area)}
        />
        ------
        <AverageDisplay label='Growth' units='tons DW/km²' value={growth} />
      </Group>
    )
  }
}

export default DataDisplay

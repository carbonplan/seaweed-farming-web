import { Group } from '@carbonplan/components'

import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import AverageDisplay from './average-display'
import {
  averageData,
  valuesToBenefit,
  valuesToCost,
  valuesToMitigationCost,
} from './utils'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { target } = useLayers()

  if (!data || data.loading) {
    return 'loading...'
  } else {
    const { area } = data.value.all_variables
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

    const mitigationCost = valuesToMitigationCost(
      data.value.all_variables,
      target,
      parameters
    )

    return (
      <Group spacing={4}>
        <AverageDisplay
          label='Mitigation cost'
          units={`$ / ${benefitUnits}`}
          value={averageData(mitigationCost, area)}
        />
        <AverageDisplay
          label='Climate benefit'
          units={`${benefitUnits} / ton DW`}
          value={averageData(netBenefit, area)}
        />
        <AverageDisplay
          label='Project cost'
          units='$ / ton DW'
          value={averageData(projectCost, area)}
        />
      </Group>
    )
  }
}

export default DataDisplay

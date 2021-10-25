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
    const { netBenefit, grossBenefit, grossEmissions } = valuesToBenefit(
      data.value.all_variables,
      target,
      parameters
    )

    const benefitUnits = target === 'products' ? 'tCO₂e' : 'tCO₂'
    const { netCost, grossCost, grossIncome } = valuesToCost(
      data.value.all_variables,
      target,
      parameters
    )

    const growth = averageData(data.value.all_variables.harv_preferred) || 0

    return (
      <Group spacing={4}>
        <AverageDisplay
          label='Net carbon benefit'
          units={`${benefitUnits} / ton DW`}
          value={averageData(netBenefit)}
        />
        <AverageDisplay
          label='Gross carbon benefit'
          units={`${benefitUnits} / ton DW`}
          value={averageData(grossBenefit)}
        />
        <AverageDisplay
          label='Gross project emissions'
          units={`tCO₂e / ton DW`}
          value={averageData(grossEmissions)}
        />
        ------
        <AverageDisplay
          label='Net project cost'
          units='$ / ton DW'
          value={averageData(netCost)}
        />
        <AverageDisplay
          label='Gross project income'
          units='$ / ton DW'
          value={averageData(grossIncome)}
        />
        <AverageDisplay
          label='Gross project cost'
          units='$ / ton DW'
          value={averageData(grossCost)}
        />
        ------
        <AverageDisplay label='Growth' units='tons DW/km²' value={growth} />
      </Group>
    )
  }
}

export default DataDisplay

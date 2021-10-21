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
    const {
      net: netBenefit,
      benefit: emissionsBenefit,
      growth: growthEmissions,
      transport: transportEmissions,
      conversion: conversionEmissions,
    } = valuesToBenefit(data.value.all_variables, target, parameters)

    const benefit = averageData(netBenefit)
    const cost = averageData(
      valuesToCost(data.value.all_variables, target, parameters)
    )
    const elevation = averageData(data.value.all_variables.elevation)
    const growth = averageData(data.value.all_variables.harv_preferred) || 0

    return (
      <>
        <Group>
          <AverageDisplay
            label='Net climate benefit'
            units='tCO₂e / ton DW'
            value={averageData(netBenefit)}
          />
          <AverageDisplay
            label='Emissions benefit'
            units='tCO₂e / ton DW'
            value={averageData(emissionsBenefit)}
          />
          <AverageDisplay
            label='Production emissions'
            units='tCO₂e / ton DW'
            value={averageData(growthEmissions)}
          />
          <AverageDisplay
            label='Transport emissions'
            units='tCO₂e / ton DW'
            value={averageData(transportEmissions)}
          />
          <AverageDisplay
            label='Conversion emissions'
            units='tCO₂e / ton DW'
            value={averageData(conversionEmissions)}
          />
          ------
          <AverageDisplay
            label='Cost of avoided emissions'
            units='$ / ton CO₂e'
            value={benefit / cost}
          />
          <AverageDisplay label='Net cost' units='$ / ton DW' value={cost} />
          <AverageDisplay label='Depth' units='m' value={-1 * elevation} />
          <AverageDisplay label='Growth' units='tons DW/km²' value={growth} />
        </Group>
      </>
    )
  }
}

export default DataDisplay

import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'

import { RecenterButton } from '../region/recenter-button'
import { useParameters } from '../parameters'
import { useLayers } from '../layers'
import AverageDisplay from './average-display'
import { averageData, valuesToBenefit, valuesToCost } from './utils'

export const DataDisplay = ({ data }) => {
  const parameters = useParameters()
  const { target, species } = useLayers()

  if (!data || data.loading) {
    return 'loading...'
  } else {
    const {
      net: netBenefit,
      benefit: emissionsBenefit,
      growth: growthEmissions,
      transport: transportEmissions,
      conversion: conversionEmissions,
    } = valuesToBenefit(data.value.all_variables, target, species, parameters)

    const benefit = averageData(netBenefit)
    const cost = averageData(
      valuesToCost(data.value.all_variables, target, species, parameters)
    )
    const elevation = averageData(data.value.all_variables.elevation)
    const growth = averageData(data.value.all_variables[`harv_${species}`]) || 0

    return (
      <>
        <Box
          as='span'
          sx={{
            fontFamily: 'faux',
            letterSpacing: 'faux',
            color: 'secondary',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: [1] }}>Recenter map</Box>
          <RecenterButton color='secondary' />
        </Box>
        <Group>
          <AverageDisplay
            label='Net climate benefit'
            units='tons CO₂e'
            value={averageData(netBenefit)}
          />
          <AverageDisplay
            label='Emissions benefit'
            units='tons CO₂e'
            value={averageData(emissionsBenefit)}
          />
          <AverageDisplay
            label='Production emissions'
            units='tons CO₂e'
            value={averageData(growthEmissions)}
          />
          <AverageDisplay
            label='Transport emissions'
            units='tons CO₂e'
            value={averageData(transportEmissions)}
          />
          <AverageDisplay
            label='Conversion emissions'
            units='tons CO₂e'
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

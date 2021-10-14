import { Filter, Group } from '@carbonplan/components'

import { useRegionContext } from '../region'
import Section from '../section'
import DataDisplay from './data-display'

export const Statistics = ({ sx }) => {
  const {
    regionData,
    showRegionPicker,
    setShowRegionPicker,
  } = useRegionContext()

  let data

  if (showRegionPicker) {
    data = regionData
  }
  return (
    <Section
      sx={sx.heading}
      label='Statistics'
      onClose={() => setShowRegionPicker(false)}
    >
      <Group>
        <Filter
          values={{ global: !showRegionPicker, regional: showRegionPicker }}
          setValues={(res) => {
            setShowRegionPicker(res.regional)
          }}
        />
        {data && <DataDisplay data={data} />}
      </Group>
    </Section>
  )
}

export default Statistics

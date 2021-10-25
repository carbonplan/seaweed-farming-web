import { Group } from '@carbonplan/components'
import { Globe, Search } from '@carbonplan/icons'

import { useRegionContext } from '../region'
import { useGlobalContext } from '../global'
import Section from '../section'
import DataDisplay from './data-display'
import IconRadio from '../icon-radio'

export const Statistics = ({ sx }) => {
  const {
    regionData,
    showRegionPicker,
    setShowRegionPicker,
  } = useRegionContext()
  const { globalData } = useGlobalContext()

  let data

  if (showRegionPicker) {
    data = regionData
  } else {
    data = globalData
  }
  return (
    <Section
      sx={sx.heading}
      label='Statistics'
      onClose={() => setShowRegionPicker(false)}
    >
      <Group spacing={4}>
        <Group direction='horizontal'>
          <IconRadio
            onClick={() => setShowRegionPicker(false)}
            sx={sx}
            label='Global'
            Icon={Globe}
            checked={!showRegionPicker}
          />

          <IconRadio
            onClick={() => setShowRegionPicker(true)}
            sx={sx}
            label='Regional'
            Icon={Search}
            checked={showRegionPicker}
          />
        </Group>
        {data && <DataDisplay data={data} />}
      </Group>
    </Section>
  )
}

export default Statistics

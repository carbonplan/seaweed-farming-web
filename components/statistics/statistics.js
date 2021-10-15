import { Group } from '@carbonplan/components'

import { useRegionContext } from '../region'
import { useGlobalContext } from '../global'
import Radio from '../radio'
import Section from '../section'
import DataDisplay from './data-display'

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
      <Group>
        <Group direction='horizontal'>
          <Radio
            label='Global'
            value='global'
            name='statistics'
            onChange={(v) => setShowRegionPicker(v === 'regional')}
            checked={!showRegionPicker}
          />
          <Radio
            label='Regional'
            value='regional'
            name='statistics'
            onChange={(v) => setShowRegionPicker(v === 'regional')}
            checked={showRegionPicker}
          />
        </Group>

        {data && <DataDisplay data={data} />}
      </Group>
    </Section>
  )
}

export default Statistics

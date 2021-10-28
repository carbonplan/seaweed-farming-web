import { useRegionContext } from '../region'
import Section from '../section'
import DataDisplay from './data-display'

export const Statistics = ({ sx }) => {
  const {
    regionData,
    showRegionPicker,
    setShowRegionPicker,
  } = useRegionContext()

  return (
    <Section
      sx={sx.heading}
      label='Regional averages'
      onClose={() => setShowRegionPicker(false)}
      onOpen={() => setShowRegionPicker(true)}
    >
      {showRegionPicker && regionData && <DataDisplay data={regionData} />}
    </Section>
  )
}

export default Statistics

import { Box, IconButton, Label } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { Globe, Search } from '@carbonplan/icons'

import { useRegionContext } from '../region'
import { useGlobalContext } from '../global'
import { RecenterButton } from '../region/recenter-button'
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
          <Label sx={{ alignItems: 'center', gap: [2] }}>
            <IconButton
              aria-label='Global'
              onClick={() => setShowRegionPicker(false)}
              sx={{ ...sx, cursor: 'pointer' }}
            >
              <Globe
                sx={{ stroke: !showRegionPicker ? 'primary' : 'secondary' }}
              />
            </IconButton>
            <Box sx={{ height: '100%' }}>Global</Box>
          </Label>

          <Label sx={{ alignItems: 'center', gap: [2] }}>
            <IconButton
              aria-label='Regional'
              onClick={() => setShowRegionPicker(true)}
              sx={{ ...sx, cursor: 'pointer' }}
            >
              <Search
                sx={{ stroke: showRegionPicker ? 'primary' : 'secondary' }}
              />
            </IconButton>
            <Box sx={{ height: '100%' }}>Regional</Box>
          </Label>
        </Group>
        {showRegionPicker && (
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
        )}

        {data && <DataDisplay data={data} />}
      </Group>
    </Section>
  )
}

export default Statistics

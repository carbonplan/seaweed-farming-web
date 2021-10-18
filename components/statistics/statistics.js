import { Box, IconButton, Label } from 'theme-ui'
import { Group } from '@carbonplan/components'

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
              sx={{
                ...sx,
                stroke: !showRegionPicker ? 'primary' : 'secondary',
                cursor: 'pointer',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                strokeWidth='1.75'
                fill='none'
              >
                <circle cx='12' cy='12' r='10' />
                <line x1='9' x2='9' y1='2' y2='22' />
                <line x1='15' x2='15' y1='2' y2='22' />
                <line x1='2' x2='22' y1='9' y2='9' />
                <line x1='2' x2='22' y1='15' y2='15' />
              </svg>
            </IconButton>
            <Box sx={{ height: '100%' }}>Global</Box>
          </Label>

          <Label sx={{ alignItems: 'center', gap: [2] }}>
            <IconButton
              aria-label='Regional'
              onClick={() => setShowRegionPicker(true)}
              sx={{
                ...sx,
                stroke: showRegionPicker ? 'primary' : 'secondary',
                cursor: 'pointer',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                strokeWidth='1.75'
                fill='none'
              >
                <circle cx='12' cy='12' r='10' />
                <circle cx='10' cy='10' r='3' />
                <line x1='12' x2='17' y1='12' y2='17' />
              </svg>
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

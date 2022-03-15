import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Search, X } from '@carbonplan/icons'

import { useRegionContext } from '../region'
import DataDisplay from './data-display'

export const Statistics = ({ sx }) => {
  const { regionData, showRegionPicker } = useRegionContext()

  return (
    <Box>
      <Box
        sx={{
          ...sx.heading,
          ...(showRegionPicker ? {} : { mb: 0 }),
          display: 'flex',
          gap: 2,
          cursor: 'pointer',
          mb: [-1],
        }}
      >
        <Box>Regional data</Box>
        <Box sx={{ position: 'relative', mt: '-1px' }}>
          {!showRegionPicker && (
            <Search sx={{ strokeWidth: 2, width: '18px' }} />
          )}
          {showRegionPicker && <X sx={{ strokeWidth: 2, width: '18px' }} />}
        </Box>
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker ? 'auto' : 0}
        easing={'linear'}
        style={{ pointerEvents: 'none' }}
      >
        <Box sx={{ pt: [2], pb: [1], width: '100%', minHeight: '188px' }}>
          {showRegionPicker && regionData && <DataDisplay data={regionData} />}
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default Statistics

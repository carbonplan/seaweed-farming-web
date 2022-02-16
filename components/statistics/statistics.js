import { Box } from 'theme-ui'
import AnimateHeight from 'react-animate-height'
import { Expander } from '@carbonplan/components'

import { useRegionContext } from '../region'
import DataDisplay from './data-display'

export const Statistics = ({ sx }) => {
  const {
    regionData,
    showRegionPicker,
    setShowRegionPicker,
  } = useRegionContext()

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          ...sx.heading,
          ...(showRegionPicker ? {} : { mb: 0 }),
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setShowRegionPicker((v) => !v)}
      >
        <Box>Regional data</Box>
        <Expander
          value={showRegionPicker}
          sx={{
            stroke: 'secondary',
            transition: 'stroke 0.15s',
          }}
        />
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker ? 'auto' : 0}
        easing={'linear'}
        style={{ pointerEvents: 'none' }}
      >
        <Box sx={{ pt: [3], pb: [1] }}>
          {showRegionPicker && regionData && <DataDisplay data={regionData} />}
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default Statistics

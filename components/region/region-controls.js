import { useCallback } from 'react'
import { IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'
import { useRegionData } from './context'

export const RegionControls = ({ showRegionPicker, setShowRegionPicker }) => {
  const { recenterRegion } = useRecenterRegion()
  const { setRegionData } = useRegionData()

  const handleToggle = useCallback(() => {
    if (showRegionPicker) {
      setRegionData(null)
    }

    setShowRegionPicker(!showRegionPicker)
  }, [showRegionPicker])

  return (
    <>
      {showRegionPicker && (
        <IconButton
          aria-label='Recenter map'
          onClick={recenterRegion}
          sx={{ stroke: 'primary' }}
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
            <circle cx='12' cy='12' r='2' />
          </svg>
        </IconButton>
      )}
      <IconButton
        aria-label='Circle filter'
        onClick={handleToggle}
        sx={{ stroke: showRegionPicker ? 'primary' : 'secondary' }}
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
    </>
  )
}

export default RegionControls

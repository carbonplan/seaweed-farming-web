import { IconButton } from 'theme-ui'
import { useCallback } from 'react'
import { useRegionContext } from './context'

export const RegionPickerButton = ({ sx, color }) => {
  const {
    setRegionData,
    showRegionPicker,
    setShowRegionPicker,
  } = useRegionContext()
  const handleToggle = useCallback(() => {
    if (showRegionPicker) {
      setRegionData(null)
    }

    setShowRegionPicker(!showRegionPicker)
  }, [showRegionPicker])

  return (
    <IconButton
      aria-label='Circle filter'
      onClick={handleToggle}
      sx={{
        ...sx,
        stroke: color,
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
  )
}

export default RegionPickerButton

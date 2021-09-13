import { IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'

export const RecenterButton = ({ color = 'primary', sx }) => {
  const { recenterRegion } = useRecenterRegion()

  return (
    <IconButton
      aria-label='Recenter map'
      onClick={recenterRegion}
      sx={{ ...sx, stroke: color, cursor: 'pointer' }}
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
  )
}

export default RecenterButton

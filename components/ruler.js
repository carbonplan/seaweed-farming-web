import { IconButton, useThemeUI } from 'theme-ui'
import { useCallback, useState } from 'react'
import { useRuler } from '@carbonplan/maps'
import { Globe } from '@carbonplan/icons'

const Ruler = () => {
  const { theme } = useThemeUI()
  const [showAxes, setShowAxes] = useState(true)
  const [showGrid, setShowGrid] = useState(false)

  const switchMode = useCallback(() => {
    if (showGrid) {
      setShowAxes(false)
      setShowGrid(false)
    } else if (showAxes) {
      setShowGrid(true)
    } else {
      setShowAxes(true)
    }
  }, [showAxes, showGrid])

  useRuler({
    showAxes,
    showGrid,
    fontFamily: theme.fonts.faux,
    gridColor: theme.colors.secondary,
  })

  return (
    <IconButton
      aria-label='Switch ruler mode'
      onClick={switchMode}
      sx={{ stroke: 'primary', cursor: 'pointer', ml: [2] }}
    >
      <Globe sx={{ strokeWidth: 1.25 }} />
    </IconButton>
  )
}

export default Ruler

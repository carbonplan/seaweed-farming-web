import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { useCallback, useState } from 'react'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

const spacing = {
  py: [4],
  my: [-4],
  px: [4, 5, 5, 6],
  mx: [-4, -5, -5, -6],
}
export const Section = ({ children, label, onClose, onOpen, sx }) => {
  const [showSection, setShowSection] = useState(false)

  const handleClick = useCallback(() => {
    setShowSection((previouslyShown) => {
      if (previouslyShown && onClose) onClose()
      if (!previouslyShown && onOpen) onOpen()
      return !previouslyShown
    })
  }, [onClose, onOpen])

  return (
    <Box
      sx={{
        ...spacing,
        bg: 'transparent',
        transition: 'background-color 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover #section-expander': { stroke: 'primary' },
          '&:hover': { bg: alpha('muted', 0.1) },
        },
      }}
    >
      <Box
        sx={{
          ...sx,
          ...spacing,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Box as='span' sx={{ color: 'primary' }}>
          {label}
        </Box>
        <Expander
          value={showSection}
          id='section-expander'
          sx={{
            position: 'relative',
            stroke: 'secondary',
            transition: 'stroke 0.15s',
          }}
        />
      </Box>

      <AnimateHeight
        duration={150}
        height={showSection && children ? 'auto' : 0}
        easing={'linear'}
      >
        <Box sx={{ pt: [4] }}>{children || null}</Box>
      </AnimateHeight>
    </Box>
  )
}

export default Section

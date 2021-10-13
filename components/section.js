import { Box } from 'theme-ui'
import { useState } from 'react'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

export const Section = ({ children, label, sx }) => {
  const [showSection, setShowSection] = useState(false)

  return (
    <>
      <Box
        sx={{
          ...sx,
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover > #expander': { stroke: 'secondary' },
            '&:hover > #label': { color: 'secondary' },
          },
        }}
        onClick={() => setShowSection(!showSection)}
      >
        <Box
          as='span'
          id='label'
          sx={{ color: 'primary', transition: 'color 0.15s' }}
        >
          {label}
        </Box>
        <Expander
          value={showSection}
          id='expander'
          sx={{ position: 'relative' }}
        />
      </Box>

      <AnimateHeight
        duration={150}
        height={showSection && children ? 'auto' : 0}
        easing={'linear'}
      >
        <Box sx={{ pt: [4] }}>{children || null}</Box>
      </AnimateHeight>
    </>
  )
}

export default Section

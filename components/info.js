import { useState } from 'react'
import { Info as InfoIcon } from '@carbonplan/icons'
import { Box, IconButton } from 'theme-ui'
import AnimateHeight from 'react-animate-height'

const Info = ({ children, sx, sxInner }) => {
  const [expanded, setExpanded] = useState(false)

  const toggle = (e) => {
    setExpanded(!expanded)
  }

  return (
    <>
      <IconButton
        onClick={toggle}
        aria-label='Toggle more info'
        sx={{
          cursor: 'pointer',
          height: '18px',
          width: '18px',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover > #info': {
              stroke: 'text',
            },
          },
          p: [0],
          ...sx,
        }}
      >
        <InfoIcon
          height='18px'
          width='18px'
          id='info'
          sx={{
            stroke: expanded ? 'text' : 'muted',
            transition: '0.1s',
            transform: 'translate(0px, 5px)',
          }}
        />
      </IconButton>
      <Box sx={{ pt: [2], mb: [-2] }}>
        <AnimateHeight
          duration={100}
          height={expanded ? 'auto' : 0}
          easing={'linear'}
        >
          <Box
            sx={{
              fontFamily: 'body',
              letterSpacing: 'body',
              textTransform: 'none',
              fontFamily: 'body',
              fontSize: [1, 1, 1, 2],
              maxWidth: '100%',
              pb: [2],
              ...sxInner,
            }}
          >
            {children}
          </Box>
        </AnimateHeight>
      </Box>
    </>
  )
}

export default Info

import React from 'react'
import { Box } from 'theme-ui'

const ArrowThin = ({ closed, ...props }) => {
  const style = { vectorEffect: 'non-scaling-stroke' }
  return (
    <Box
      as='svg'
      viewBox='0 0 24 24'
      fill='none'
      width='24'
      height='24'
      stroke='currentColor'
      stroke-width='1.5'
      {...props}
    >
      <line x1='13.4' y1='3.5' x2='21.9' y2='12' style={style} />
      <line x1='21.9' y1='12' x2='13.4' y2='20.5' style={style} />
      <line x1='2.1' y1='12' x2='8.2' y2='12' style={style} />
      <line
        x1='6.9'
        y1='12'
        x2='21.9'
        y2='12'
        style={{ style, strokeLinecap: 'round' }}
      />
    </Box>
  )
}

export default ArrowThin

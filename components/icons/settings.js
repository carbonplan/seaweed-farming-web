import React from 'react'
import { Box } from 'theme-ui'

const Settings = ({ ...props }) => {
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
      <path d='M5.5 0V4' style={style} />
      <path d='M5.5 15L5.5 24' style={style} />
      <line x1='18.5' x2='18.5' y2='9' style={style} />
      <line x1='18.5' y1='20' x2='18.5' y2='24' style={style} />
      <circle cx='5.5' cy='9.5' r='3.5' style={style} />
      <circle cx='18.5' cy='14.5' r='3.5' style={style} />
    </Box>
  )
}

export default Settings

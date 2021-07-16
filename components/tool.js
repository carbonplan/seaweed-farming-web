import { Box } from 'theme-ui'
import {
  Layout,
  Guide,
  Row,
  Column,
  Buttons,
  Links,
} from '@carbonplan/components'
import { useState } from 'react'
import Map from './map'

const prefix = 'https://images.carbonplan.org'

const Tool = () => {
  const [map, setMap] = useState(null)

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Map onMapReady={setMap} />
    </Box>
  )
}

export default Tool

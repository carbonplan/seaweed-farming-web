import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import Map from './map'
import Options from './options'

const initialOptions = {
  operatingCost: 5,
  transportationCost: 5,
}

const Tool = () => {
  const [map, setMap] = useState(null)
  const [options, setOptions] = useState(initialOptions)
  const handleOptionChange = useCallback((option, value) => {
    setOptions({ ...options, [option]: value })
  })
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Options options={options} onChange={handleOptionChange} />
      <Map onMapReady={setMap} options={options} />
    </Box>
  )
}

export default Tool

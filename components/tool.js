import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import { Column, Filter, Row } from '@carbonplan/components'

import Map from './map'
import Options from './options'
import Toolbar from './toolbar'

const initialOptions = {
  operatingCost: 50,
  transportationCost: 5,
}
const initLayers = {
  COST: true,
  GROWTH: false,
  D2PORT: false,
  HARV: false,
}

const Tool = () => {
  const [map, setMap] = useState(null)
  const [options, setOptions] = useState(initialOptions)
  const [visibleLayers, setVisibleLayers] = useState(initLayers)
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
      <Toolbar>
        <Row>
          <Column start={[1]} width={[6]}>
            <Filter
              filters={{ layers: visibleLayers }}
              setFilters={{ layers: setVisibleLayers }}
              filterLabels={{ layers: 'Layers' }}
              filterList={['layers']}
            />
          </Column>
          <Column start={[1, 7]} width={[6]}>
            <Options options={options} onChange={handleOptionChange} />
          </Column>
        </Row>
      </Toolbar>
      <Map
        onMapReady={setMap}
        options={options}
        visibleLayers={visibleLayers}
      />
    </Box>
  )
}

export default Tool

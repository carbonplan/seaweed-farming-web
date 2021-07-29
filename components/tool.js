import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import { Column, Filter, Row, Slider } from '@carbonplan/components'
import { MapProvider } from './map'

import Map from './map'
import Options from './options'
import Toolbar from './toolbar'

const initialOptions = {
  operatingCost: 50,
  transportationCost: 5,
}
const initLayers = {
  COST: false,
  GROWTH: true,
  D2PORT: false,
  HARV: false,
}
const initRange = { min: 0, max: 4000 }

const Tool = () => {
  const [options, setOptions] = useState(initialOptions)
  const [visibleLayers, setVisibleLayers] = useState(initLayers)
  const [dataRange, setDataRange] = useState(initRange)

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
      <MapProvider>
        <Toolbar>
          <Row>
            <Column start={[1]} width={[6]}>
              <Filter
                filters={{ layers: visibleLayers }}
                setFilters={{ layers: setVisibleLayers }}
                filterLabels={{ layers: 'Layers' }}
                filterList={['layers']}
              />
              Range minimum: {dataRange.min}
              <Slider
                size='sm'
                value={dataRange.min}
                min={0}
                max={1000}
                onChange={(e) =>
                  setDataRange({
                    min: Number(e.target.value),
                    max: dataRange.max,
                  })
                }
              />
              Range maximum: {dataRange.max}
              <Slider
                value={dataRange.max}
                size='sm'
                min={100}
                max={99999}
                onChange={(e) =>
                  setDataRange({
                    max: Number(e.target.value),
                    min: dataRange.min,
                  })
                }
              />
            </Column>
            <Column start={[1, 7]} width={[6]}>
              <Options options={options} onChange={handleOptionChange} />
            </Column>
          </Row>
        </Toolbar>
        <Map
          options={options}
          visibleLayers={visibleLayers}
          dataRange={dataRange}
        />
      </MapProvider>
    </Box>
  )
}

export default Tool

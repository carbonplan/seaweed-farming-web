import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import { Column, Filter, Row, Slider, Tag } from '@carbonplan/components'
import { MapProvider } from './map'

import Map from './map'
import Options from './options'
import Toolbar from './toolbar'
import DisplayOptions from './display-options'

const initialOptions = {
  operatingCost: 63000,
  transportationCost: 0.11,
  capitalCost: 170000,
  harvestCost: 124000,
  lineCost: 0.06,
  depthCostFactor: 2,
  cheapDepth: 10,
  priceyDepth: 100,
}

const initLayers = {
  COST: true,
  GROWTH: false,
  D2PORT: false,
  DEPTH: false,
}
const initRange = { min: 0, max: 40000 }

const Tool = () => {
  const [options, setOptions] = useState(initialOptions)
  const [visibleLayers, setVisibleLayers] = useState(initLayers)
  const [invertColors, setInvertColors] = useState(false)
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
              <Row columns={[6]}>
                <Column start={[1]} width={[3]}>
                  <Filter
                    values={visibleLayers}
                    setValues={setVisibleLayers}
                    label='Layer'
                  />
                </Column>
                <Column start={[4]} width={[3]}>
                  <DisplayOptions
                    dataRange={dataRange}
                    setDataRange={setDataRange}
                    invertColors={invertColors}
                    setInvertColors={setInvertColors}
                  />
                </Column>
              </Row>
            </Column>
            <Column start={[1, 7]} width={[6]}>
              <Options options={options} onChange={handleOptionChange} />
            </Column>
          </Row>
        </Toolbar>
        <Map
          options={options}
          visibleLayers={visibleLayers}
          invertColors={invertColors}
          dataRange={dataRange}
        />
      </MapProvider>
    </Box>
  )
}

export default Tool

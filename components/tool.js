import { Box } from 'theme-ui'
import { Column, Filter, Row } from '@carbonplan/components'
import { MapProvider, useMapContext } from './map'

import Map from './map'
import Options from './options'
import Toolbar from './toolbar'
import DisplayOptions from './display-options'

const Layers = () => {
  const {
    options: { layers, setLayers },
  } = useMapContext()

  return <Filter values={layers} setValues={setLayers} label='Layer' />
}

const Tool = () => {
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
                  <Layers />
                </Column>
                <Column start={[4]} width={[3]}>
                  <DisplayOptions />
                </Column>
              </Row>
            </Column>
            <Column start={[1, 7]} width={[6]}>
              <Options />
            </Column>
          </Row>
        </Toolbar>
        <Map />
      </MapProvider>
    </Box>
  )
}

export default Tool

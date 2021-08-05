import { Box, Flex } from 'theme-ui'
import { Column, Filter, Layout, Row } from '@carbonplan/components'
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
    <MapProvider>
      <Flex
        sx={{
          position: 'absolute',
          flexDirection: 'row',
          height: '100%',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            flex: '0 1 auto',
          }}
        >
          <Toolbar>
            <Row columns={[3]}>
              <Column start={[1]} width={[3]}>
                <Row columns={[3]}>
                  <Column start={[1]} width={[3]}>
                    <Layers />
                  </Column>
                  <Column start={[1]} width={[3]}>
                    <DisplayOptions />
                  </Column>
                </Row>
              </Column>
              <Column start={[1]} width={[3]}>
                <Options />
              </Column>
            </Row>
          </Toolbar>
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Map />
        </Box>
      </Flex>
    </MapProvider>
  )
}

export default Tool

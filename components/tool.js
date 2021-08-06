import { Flex } from 'theme-ui'
import { Filter, Group } from '@carbonplan/components'
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
          height: 'calc(100vh - 56px)',
          width: '100vw',
        }}
      >
        <Map />
      </Flex>
      <Toolbar>
        <Group spacing='lg'>
          <Layers />
          <DisplayOptions />
          <Options />
        </Group>
      </Toolbar>
    </MapProvider>
  )
}

export default Tool

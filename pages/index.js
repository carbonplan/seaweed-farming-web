import { useCallback, useState } from 'react'
import { useColorMode, Box, Container } from 'theme-ui'
import {
  Dimmer,
  Expander,
  Group,
  Meta,
  Guide,
  Header,
} from '@carbonplan/components'
import { useColormap } from '@carbonplan/colormaps'
import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import Parameter from '../components/parameter'
import LayerSwitcher, { INITIAL_UNIFORMS } from '../components/layer-switcher'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
}

const CLIM_MAP = {
  costLayer: [0, 5000],
  valueLayer: [0, 1],
  depthLayer: [0, 10000],
  growthLayer: [0, 5000],
  harvestLayer: [0, 5],
  waveHeightLayer: [0, 5],
  lineDensityLayer: [0, 1000000],
}

const Index = () => {
  const [clim, setClim] = useState([0, 5000])
  const [colormapName, setColormapName] = useState('cool')
  const colormap = useColormap(colormapName)
  const [mode] = useColorMode()

  const [layerUniforms, setLayerUniforms] = useState(INITIAL_UNIFORMS)

  const handleUniformChange = useCallback((res) => {
    const updatedUniform = Object.keys(res).find((key) => res[key])
    setClim(CLIM_MAP[updatedUniform])
    setLayerUniforms(res)
  })

  const [capex, setCapex] = useState(170630)
  const [lineCost, setLineCost] = useState(0.06)
  const [opex, setOpex] = useState(63004)
  const [labor, setLabor] = useState(37706)
  const [harvestCost, setHarvestCost] = useState(124485)

  return (
    <>
      <Meta />
      <Container>
        <Guide color='teal' />
      </Container>
      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Container>
          <Header dimmer={'none'} />
        </Container>
      </Box>
      <Container>
        <ControlPanel title='Mapping macroalgae'>
          <Group>
            <Box sx={sx.description}>
              This is an interactive web tool for mapping the potential of
              carbon removal with macroalgae.
            </Box>
            <LayerSwitcher setUniforms={handleUniformChange} sx={sx} />

            <Box>
              <Box sx={sx.heading}>Parameters</Box>
              <Parameter
                min={170630}
                max={969626}
                step={10}
                value={capex}
                setValue={setCapex}
                label={'Capex'}
              />
              <Parameter
                min={0.06}
                max={1.45}
                step={0.01}
                value={lineCost}
                setValue={setLineCost}
                label={'Line cost'}
              />
              <Parameter
                min={63004}
                max={69316}
                step={100}
                value={opex}
                setValue={setOpex}
                label={'Opex'}
              />
              <Parameter
                min={37706}
                max={119579}
                step={10}
                value={labor}
                setValue={setLabor}
                label={'Labor'}
              />
              <Parameter
                min={124485}
                max={394780}
                step={100}
                value={harvestCost}
                setValue={setHarvestCost}
                label={'Harvest costs'}
              />
            </Box>
          </Group>
        </ControlPanel>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
        }}
      >
        <Map
          clim={clim}
          colormap={colormap}
          uniforms={{
            capex: capex,
            lineCost: lineCost,
            opex: opex,
            labor: labor,
            harvestCost: harvestCost,
            empty: mode == 'dark' ? 0.25 : 0.75,
            target: 'cost',
            ...layerUniforms,
          }}
        />
        <Dimmer
          sx={{
            display: ['none', 'none', 'initial', 'initial'],
            position: 'absolute',
            color: 'primary',
            right: [13],
            bottom: [17, 17, 15, 15],
          }}
        />
      </Box>
    </>
  )
}

export default Index

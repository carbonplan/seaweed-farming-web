import { useCallback, useState } from 'react'
import { useColorMode, Box, Container } from 'theme-ui'
import {
  Dimmer,
  Filter,
  Group,
  Meta,
  Row,
  Column,
  Guide,
  Header,
} from '@carbonplan/components'
import { useColormap } from '@carbonplan/colormaps'
import Parameter from '../components/parameter'
import LayerSwitcher, { INITIAL_UNIFORMS } from '../components/layer-switcher'
import Map from '../components/map'

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
  const [expanded, setExpanded] = useState(false)
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
        <Row>
          <Column width={3} start={1}>
            <Box
              sx={{
                position: 'absolute',
                left: '0px',
                right: [
                  'calc(3 * 100vw / 6 - 12px)',
                  'calc(5 * 100vw / 8 - 18px)',
                  'calc(9 * 100vw / 12 - 24px)',
                  'calc(9 * 100vw / 12 - 36px)',
                ],
                zIndex: 1000,
                transition: 'transform 0.2s',
                transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
              }}
            >
              <Box
                as='button'
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                  fontFamily: 'inherit',
                  fontSize: '100%',
                  lineHeight: 1.15,
                  color: 'text',
                  bg: 'background',
                  m: 0,
                  pb: [1],
                  pt: ['2px'],
                  px: [2],
                  position: 'absolute',
                  right: '-53px',
                  bottom: '50px',
                  transform: 'rotate(-90deg)',
                  cursor: 'pointer',
                  border: 'none',
                  borderRight: ({ colors }) => `1px solid ${colors.muted}`,
                  borderBottom: ({ colors }) => `1px solid ${colors.muted}`,
                  borderLeft: ({ colors }) => `1px solid ${colors.muted}`,
                }}
              >
                Controls
              </Box>
              <Box
                sx={{
                  px: [4, 5, 5, 6],
                  height: '56px',
                  bg: 'background',
                  borderRight: ({ colors }) =>
                    `${expanded ? 1 : 0}px solid ${colors.muted}`,
                  borderBottom: ({ colors }) =>
                    `${expanded ? 1 : 0}px solid ${colors.muted}`,
                  transition: 'border 0.2s',
                }}
              />
              <Box
                sx={{
                  px: [4, 5, 5, 6],
                  pb: [5],
                  pt: [5],
                  pointerEvents: 'all',
                  bg: 'background',
                  overflowY: 'scroll',
                  maxHeight: 'calc(100vh - 56px)',
                  minHeight: 'calc(100vh - 56px)',
                  transition: 'border 0.2s',
                  borderRight: ({ colors }) =>
                    `${expanded ? 1 : 0}px solid ${colors.muted}`,
                }}
              >
                <Box
                  sx={{
                    transition: 'opacity 0.2s',
                    opacity: expanded ? 1 : 0,
                  }}
                >
                  <Group>
                    <Box sx={sx.description}>
                      This is an interactive web tool for mapping the potential
                      of carbon removal with macroalgae.
                    </Box>
                    <LayerSwitcher setUniforms={handleUniformChange} />

                    <Box>
                      <Box sx={sx.heading}>Capital Costs</Box>
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
                    </Box>
                    <Box>
                      <Box sx={sx.heading}>Operating costs</Box>
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
                    </Box>
                    <Box>
                      <Box sx={sx.heading}>Harvest costs</Box>
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
                </Box>
              </Box>
            </Box>
          </Column>
          <Column start={[3, 5, 8, 8]} width={3}>
            <Box
              sx={{
                mt: [8],
                opacity: expanded ? 0 : 1,
                transition: 'opacity 0.3s',
                position: 'relative',
                display: 'block',
                zIndex: 1001,
                fontSize: [6, 7, 8, 9],
                letterSpacing: 'heading',
                fontFamily: 'heading',
                lineHeight: 'heading',
                pointerEvents: 'none',
              }}
            >
              Mapping macroalgae
            </Box>
          </Column>
        </Row>
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

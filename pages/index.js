import { useMemo, useState } from 'react'
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
import { Canvas, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import Parameter from '../components/parameter'
import Basemap from '../components/basemap'
import style from '../components/style'
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

const Index = () => {
  const [display, setDisplay] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [clim, setClim] = useState([0, 5000])
  const [colormapName, setColormapName] = useState('cool')
  const [expanded, setExpanded] = useState(false)
  const colormap = useColormap(colormapName)
  const [mode] = useColorMode()

  const [layerUniforms, setLayerUniforms] = useState(INITIAL_UNIFORMS)

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
                    <LayerSwitcher setUniforms={setLayerUniforms} />

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
        <Canvas
          style={style}
          zoom={2}
          minZoom={2}
          center={[0, 0]}
          debug={false}
          extensions={['OES_texture_float', 'OES_element_index_uint']}
        >
          <Basemap inverted />
          <Raster
            maxZoom={5}
            size={128}
            ndim={3}
            colormap={colormap}
            clim={clim}
            display={display}
            opacity={opacity}
            mode={'texture'}
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
            variables={[
              'Growth2',
              'd_Be',
              'd_Bm',
              'd_Ns',
              'harv',
              'elevation',
              'd2p',
              'mask',
              'area',
            ]}
            source={
              'https://storage.googleapis.com/carbonplan-research/macroalgae/data/processed/zarr-pyramid/{z}/all_variables'
            }
            frag={`
              float value;

              // constants for forthcoming layers
              float lineDensity = 714286.0;
              float nharv = 2.0;

              // invert depth
              float depth = -1.0 * elevation;

              if (costLayer == 1.0) {
                // return null color if null value or low growth
                if ((Growth2 == nan) || (Growth2 < 0.2)) {
                  gl_FragColor = vec4(empty, empty, empty, opacity);
                  gl_FragColor.rgb *= gl_FragColor.a;
                  return;
                }
  
                // parameters
                float cheapDepth = 50.0;
                float priceyDepth = 150.0;
                float insurance = 35000.0;
                float license = 1409.0;

                // calculate depth premium
                float depthPremium;
                if (depth <= cheapDepth) {
                  depthPremium = 0.0;
                }
                if ((depth > cheapDepth) && (depth < priceyDepth)) {
                  depthPremium = (depth / priceyDepth) * 3.0;
                }
                if (depth > priceyDepth) {
                  depthPremium = 3.0;
                }

                // calculate primary terms
                float capital = capex + depthPremium * capex + lineCost * lineDensity;
                float operations = opex + labor + insurance + license;
                float harvest = harvestCost * nharv;

                // combine terms
                float cost = (capital + operations + harvest) / Growth2;
                value = cost;
              }

              if (depthLayer == 1.0) {
                value = depth;
              }

              if (growthLayer == 1.0) {
                value = Growth2;
              }

              if (harvestLayer == 1.0) {
                value = nharv;
              }

              if (waveHeightLayer == 1.0) {
                // TODO: return value from forthcoming layer
                value = nan;
              }

              if (lineDensityLayer == 1.0) {
                value = lineDensity;
              }

              // transform for display
              float rescaled = (value - clim.x)/(clim.y - clim.x);
              vec4 c = texture2D(colormap, vec2(rescaled, 1.0));
              gl_FragColor = vec4(c.x, c.y, c.z, opacity);
              gl_FragColor.rgb *= gl_FragColor.a;
              `}
          />
        </Canvas>
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

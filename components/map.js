import { useMemo } from 'react'
import { Box, useColorMode, useThemeUI } from 'theme-ui'
import { Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { useColormap } from '@carbonplan/colormaps'
import { Dimmer } from '@carbonplan/components'

import Basemap from '../components/basemap'
import style from '../components/style'
import { useParameters } from './parameters'

const CLIM_MAP = {
  cost: [0, 5000],
  value: [0, 1],
  depth: [0, 10000],
  growth: [0, 5000],
  harvest: [0, 5],
  waveHeight: [0, 5],
  lineDensity: [0, 1000000],
  d2p: [0, 5000],
}

const emptyUniforms = {
  costLayer: 0,
  valueLayer: 0,
  depthLayer: 0,
  growthLayer: 0,
  harvestLayer: 0,
  waveHeightLayer: 0,
  lineDensityLayer: 0,
  d2pLayer: 0,
}

const Viewer = ({ children, layer }) => {
  const { theme } = useThemeUI()
  const colormap = useColormap('cool')
  const [mode] = useColorMode()
  const parameters = useParameters()
  const { setRegionData, showRegionPicker } = useRegionContext()

  const clim = CLIM_MAP[layer]
  const layerUniforms = useMemo(
    () => ({ ...emptyUniforms, [`${layer}Layer`]: 1 }),
    [layer]
  )

  return (
    <Map zoom={2} minZoom={2} center={[0, 0]} debug={false}>
      <Basemap inverted />
      {showRegionPicker && (
        <RegionPicker
          color={theme.colors.primary}
          backgroundColor={theme.colors.background}
          fontFamily={theme.fonts.monospace}
          // initialRadius={initialRadius}
          // minRadius={minRadius}
          // maxRadius={maxRadius}
        />
      )}
      <Raster
        maxZoom={5}
        size={128}
        ndim={3}
        colormap={colormap}
        clim={clim}
        display={true}
        opacity={1}
        mode={'texture'}
        uniforms={{
          ...layerUniforms,
          ...parameters,
          empty: mode == 'dark' ? 0.25 : 0.75,
        }}
        setRegionData={setRegionData}
        variable={['Growth2', 'elevation', 'd2p', 'wave_height']}
        selector={{ variable: ['Growth2', 'elevation', 'd2p', 'wave_height'] }}
        source={
          'https://storage.googleapis.com/carbonplan-research/macroalgae/data/processed/zarr-pyramid'
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
                if ((Growth2 == fillValue) || (Growth2 < 0.2)) {
                  gl_FragColor = vec4(empty, empty, empty, opacity);
                  gl_FragColor.rgb *= gl_FragColor.a;
                  return;
                }
  
                // parameters
                float cheapDepth = 50.0;
                float priceyDepth = 150.0;
                float lowWaveDamage = 1.0;
                float highWaveDamage = 2.0;

                // calculate depth premium
                float depthPremium;
                if (depth <= cheapDepth) {
                  depthPremium = 0.0;
                }
                if ((depth > cheapDepth) && (depth < priceyDepth)) {
                  depthPremium = (depth / priceyDepth) * depthFactor;
                }
                if (depth > priceyDepth) {
                  depthPremium = depthFactor;
                }

                // calculate wave premium
                float wavePremium;
                if (wave_height <= lowWaveDamage) {
                  wavePremium = 0.0;
                }
                if ((wave_height > lowWaveDamage) && (wave_height < highWaveDamage)) {
                  wavePremium = (wave_height / highWaveDamage) * waveFactor;
                }
                if (wave_height > highWaveDamage) {
                  wavePremium = waveFactor;
                }

                // calculate primary terms
                float capital = capex + depthPremium * capex + wavePremium * capex + lineCost * lineDensity;
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
                value = wave_height;
              }

              if (lineDensityLayer == 1.0) {
                value = lineDensity;
              }

              if (d2pLayer == 1.0) {
                value = d2p;
              }

              if (value == fillValue) {
                gl_FragColor = vec4(empty, empty, empty, opacity);
                gl_FragColor.rgb *= gl_FragColor.a;
                return;
              }

              // transform for display
              float rescaled = (value - clim.x)/(clim.y - clim.x);
              vec4 c = texture2D(colormap, vec2(rescaled, 1.0));
              gl_FragColor = vec4(c.x, c.y, c.z, opacity);
              gl_FragColor.rgb *= gl_FragColor.a;
              `}
      />
      <Box
        sx={{
          position: 'absolute',
          right: [13],
          bottom: [17, 17, 15, 15],
        }}
      >
        <Dimmer
          sx={{
            display: ['none', 'none', 'initial', 'initial'],
            color: 'primary',
          }}
        />
      </Box>
      {children}
    </Map>
  )
}

export default Viewer

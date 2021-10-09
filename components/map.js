import { Box, useColorMode, useThemeUI } from 'theme-ui'
import { Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { useColormap } from '@carbonplan/colormaps'
import { Dimmer } from '@carbonplan/components'

import { useParameters } from './parameters'
import { useLayers } from './layers'

const CLIM_MAP = {
  cost: [0, 5000],
  benefit: [0, 5000],
  depth: [0, 10000],
  growth: [0, 5000],
  nharv: [0, 5],
  waveHeight: [0, 5],
  lineDensity: [0, 1000000],
  d2p: [0, 5000],
}

const speciesDefinition = `
float growth;
float nharv;

if (preferred == 1.0) {
    growth = harv_preferred;
    nharv = nharv_preferred;
}
if (sargassum == 1.0) {
    growth = harv_sargassum;
    nharv = nharv_sargassum;
}
if (eucheuma == 1.0) {
    growth = harv_eucheuma;
    nharv = nharv_eucheuma;
}
if (macrocystis == 1.0) {
    growth = harv_macrocystis;
    nharv = nharv_macrocystis;
}
if (porphyra == 1.0) {
    growth = harv_porphyra;
    nharv = nharv_porphyra;
}
if (saccharina == 1.0) {
    growth = harv_saccharina;
    nharv = nharv_saccharina;
}
`

const lowGrowthFilter = `
// return null color if null value or low growth
if ((growth == fillValue) || (growth < 0.2)) {
  gl_FragColor = vec4(empty, empty, empty, opacity);
  gl_FragColor.rgb *= gl_FragColor.a;
  return;
}
`
const Viewer = ({ children }) => {
  const { theme } = useThemeUI()
  const colormap = useColormap('cool')
  const [mode] = useColorMode()
  const parameters = useParameters()
  const { uniforms: layerUniforms, layer, target } = useLayers()

  const { setRegionData, showRegionPicker } = useRegionContext()

  const clim = CLIM_MAP[layer]

  return (
    <Map zoom={2} minZoom={2} center={[0, 0]} debug={false}>
      <Line
        color={theme.rawColors.primary}
        source={
          'https://storage.googleapis.com/carbonplan-share/maps-demo/land'
        }
        variable={'land'}
      />
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
          target,
          empty: mode == 'dark' ? 0.25 : 0.75,
        }}
        setRegionData={setRegionData}
        variable={'all_variables'}
        selector={{
          variable: [
            'harv_preferred',
            'nharv_preferred',
            'harv_sargassum',
            'nharv_sargassum',
            'harv_eucheuma',
            'nharv_eucheuma',
            'harv_macrocystis',
            'nharv_macrocystis',
            'harv_porphyra',
            'nharv_porphyra',
            'harv_saccharina',
            'nharv_saccharina',
            'elevation',
            'd2p',
            'wave_height',
          ],
        }}
        fillValue={9.969209968386869e36}
        source={
          'https://storage.googleapis.com/carbonplan-research/macroalgae/data/processed/zarr-pyramid-0.3'
        }
        frag={`
              ${speciesDefinition}
              float value;

              // invert depth
              float depth = -1.0 * elevation;

              // constants for forthcoming layers
              float lineDensity = 714286.0;
              float d2sink = depth * 0.5;
              float fseq = 0.6;
              float carbon_fraction = 0.248;
              float carbon_to_co2 = 3.67;


              if (costLayer == 1.0) {
                ${lowGrowthFilter}
  
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
                float growthCost = (capital + operations + harvest) / growth;

                if (productsTarget == 1.0) {
                  // calculate product value
                  value = growth * (productValue - transportCost * d2p - conversionCost) - growthCost;
                } else {
                  // calculate sinking value
                  value = growth * (sinkingValue - transportCost * d2sink) - growthCost;
                }
              }

              if (benefitLayer == 1.0) {
                ${lowGrowthFilter}

                if (productsTarget == 1.0) {
                  // calculate climate benefit of products
                  value = growth * (avoidedEmissions - transportEmissions * d2p - conversionEmissions);
                } else {
                  // calculate climate benefit of sinking
                  value = growth * (carbon_fraction * carbon_to_co2 * fseq * sequestrationRate * removalRate - transportEmissions * d2sink);
                }
              }

              if (depthLayer == 1.0) {
                value = depth;
              }

              if (growthLayer == 1.0) {
                value = growth;
              }

              if (nharvLayer == 1.0) {
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

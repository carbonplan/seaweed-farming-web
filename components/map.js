import { Box, Flex, useColorMode, useThemeUI } from 'theme-ui'
import { Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { useColormap, Colorbar } from '@carbonplan/colormaps'
import { Dimmer } from '@carbonplan/components'

import { useParameters } from './parameters'
import {
  useLayers,
  LAYER_UNIFORMS,
  LABEL_MAP,
  CLIM_MAP,
  UNITS_MAP,
} from './layers'

const speciesDefinition = `
float growth;
float nharv;
float equipment;
float lineDensity;

if (preferred == 1.0) {
  growth = harv_preferred;
  nharv = nharv_preferred;
  // todo: properly handle values for preferred maps
  equipment = 1231.87;
  lineDensity = 5000000.0;
}
if (eucheuma == 1.0) {
  growth = harv_eucheuma;
  nharv = nharv_eucheuma;
  equipment = 1231.87;
  lineDensity = 5000000.0;
}
if (sargassum == 1.0) {
  growth = harv_sargassum;
  nharv = nharv_sargassum;
  equipment = 185.24;
  lineDensity = 751880.0;
}
if (porphyra == 1.0) {
  growth = harv_porphyra;
  nharv = nharv_porphyra;
  equipment = 4927.50;
  lineDensity = 20000000.0;
}

// if (saccharina == 1.0) {
//     growth = harv_saccharina;
//     nharv = nharv_saccharina;
// equipment = 164.25;
// lineDensity = 666667.0;
// }

if (macrocystis == 1.0) {
  growth = harv_macrocystis;
  nharv = nharv_macrocystis;
  equipment = 164.25;
  lineDensity = 666667.0;
}
`

const defaultLayers = LAYER_UNIFORMS.filter(
  (u) => !['costLayer', 'benefitLayer'].includes(u)
)
  .map(
    (uniformName) => `
  if (${uniformName} == 1.0) {
    value = ${uniformName.replace('Layer', '')};
  }
`
  )
  .join('')

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
        />
      )}
      <Raster
        maxZoom={5}
        colormap={colormap}
        clim={clim}
        display={true}
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
            // 'harv_saccharina',
            // 'nharv_saccharina',
            'elevation',
            'd2p',
            'wave_height',
            'fseq',
            'd2sink',
            // 'mask',
          ],
        }}
        fillValue={9.969209968386869e36}
        source={
          'https://storage.googleapis.com/carbonplan-research/macroalgae/data/processed/zarr-pyramid-0.4'
        }
        frag={`
              ${speciesDefinition}
              float value;

              // invert depth
              float depth = -1.0 * elevation;

              // constants
              float carbon_fraction = 0.248;
              float carbon_to_co2 = 3.67;

              ${defaultLayers}

              if (costLayer == 1.0) {
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
                float harvest = harvestCost + growth * transportCost * nharv * d2p + transportCost * equipment * d2p;

                // combine terms
                float growthCost = (capital + operations + harvest) / growth;

                if (productsTarget == 1.0) {
                  // calculate product value
                  value = growthCost + transportCost * d2p + conversionCost - productValue;
                } else {
                  // calculate sinking value
                  value = growthCost + transportCost * d2sink - sinkingValue;
                }
              }

              if (benefitLayer == 1.0) {
                float growthEmissions = (nharv * d2p * transportEmissions * growth + transportEmissions * equipment * d2p) / growth;

                if (productsTarget == 1.0) {
                  // calculate climate benefit of products
                  value = avoidedEmissions - transportEmissions * d2p - conversionEmissions - growthEmissions;
                } else {
                  // calculate climate benefit of sinking
                  value = carbon_fraction * carbon_to_co2 * fseq * sequestrationRate * removalRate - transportEmissions * d2sink - growthEmissions;
                }
              }

              if (costLayer == 1.0 || benefitLayer == 1.0) {
                // filter points
                bool lowGrowth = growth == fillValue || growth < 0.2;
                bool lowSink = sinkingTarget == 1.0 && d2sink == fillValue;
                // bool masked = includeMask == 0.0 && mask == 1.0;

                if (lowGrowth || lowSink) {
                  gl_FragColor = vec4(empty, empty, empty, opacity);
                  gl_FragColor.rgb *= gl_FragColor.a;
                  return;
                }
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
        <Flex sx={{ gap: [4] }}>
          <Colorbar
            colormap={colormap}
            clim={clim}
            units={UNITS_MAP[layer]}
            label={LABEL_MAP[layer]}
            horizontal
          />
          <Dimmer
            sx={{
              display: ['none', 'none', 'initial', 'initial'],
              color: 'primary',
            }}
          />
        </Flex>
      </Box>
      {children}
    </Map>
  )
}

export default Viewer

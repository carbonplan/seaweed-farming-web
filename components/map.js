import { Box, Flex, useColorMode, useThemeUI } from 'theme-ui'
import { Fill, Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { Colorbar } from '@carbonplan/colormaps'
import { Dimmer } from '@carbonplan/components'

import Ruler from './ruler'
import { useParameters } from './parameters'
import { useCustomColormap } from './utils'
import { LAYER_UNIFORMS, useLayers } from './layers'
import {
  NAN,
  LABEL_MAP,
  COLORMAPS_MAP,
  UNITS_MAP,
  SPECIES,
  LINE_DENSITY_MAPPING,
  EQUIPMENT_MAPPING,
} from '../constants'

const speciesDefinition = `
float seaweed_dw = harv_preferred;
float seaweed_ww = seaweed_dw / 0.1;
float nharv = nharv_preferred;
float equipment;
float lineDensity;
${SPECIES.map(
  (species, i) => `
if (species_preferred == ${i.toFixed(1)}) {
  equipment = ${EQUIPMENT_MAPPING[species].toFixed(2)};
  lineDensity = ${LINE_DENSITY_MAPPING[species].toFixed(2)};
}
`
).join('')}
`

const defaultLayers = LAYER_UNIFORMS.filter(
  (u) => !['mitigationCostLayer', 'costLayer', 'benefitLayer'].includes(u)
)
  .map(
    (uniformName) => `
  if (${uniformName} == 1.0) {
    value = ${
      uniformName === 'growthLayer'
        ? 'seaweed_dw'
        : uniformName.replace('Layer', '')
    };
  }
`
  )
  .join('')

const VARIABLES = [
  'harv_preferred',
  'nharv_preferred',
  'elevation',
  'd2p',
  'wave_height',
  'fseq',
  'fseq_transport',
  'd2sink',
  'species_preferred',
  'area',
  'sensitive_areas',
]

const Viewer = ({ children }) => {
  const { theme } = useThemeUI()
  const [mode] = useColorMode()
  const parameters = useParameters()
  const { uniforms: layerUniforms, layer, target } = useLayers()
  const { colormap, legend, discrete } = useCustomColormap(layer)
  const { setRegionData, showRegionPicker } = useRegionContext()
  const { clim } = COLORMAPS_MAP[layer]

  return (
    <Map
      zoom={2}
      minZoom={2}
      center={[0, 0]}
      debug={false}
      style={{ overflow: 'inherit' }}
    >
      <Fill
        color={theme.rawColors.background}
        source={
          'https://storage.googleapis.com/carbonplan-share/maps-demo/land'
        }
        variable={'land'}
      />
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
        regionOptions={{ setData: setRegionData }}
        variable={'all_variables'}
        selector={{ variable: VARIABLES }}
        fillValue={NAN}
        source={
          'https://storage.googleapis.com/carbonplan-macroalgae/data/processed/zarr-pyramid-0.13'
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

              if (costLayer == 1.0 || benefitLayer == 1.0 || mitigationCostLayer == 1.0) {
                float productionCost;
                float netBenefit;

                // filter points
                bool lowGrowth = seaweed_dw == fillValue || seaweed_dw < 0.2;
                bool lowSink = sinkingTarget == 1.0 && d2sink == fillValue;

                bool sensitiveAreaMasked = false;
                if (sensitiveAreaMask > 0.0 && sensitiveAreaMask == sensitive_areas) {
                  sensitiveAreaMasked = true;
                }
                if (sensitiveAreaMask == 3.0 && sensitive_areas > 0.0) {
                  sensitiveAreaMasked = true;
                }


                if (lowGrowth || lowSink || sensitiveAreaMasked) {
                  gl_FragColor = vec4(empty, empty, empty, opacity);
                  gl_FragColor.rgb *= gl_FragColor.a;
                  return;
                }

                if (costLayer == 1.0 || mitigationCostLayer == 1.0) {
                  // parameters
                  float priceyDepth = 500.0;
                  float highWaveDamage = 3.0;

                  // calculate depth premium
                  float depthPremium = 0.0;
                  if (depth >= priceyDepth) {
                    depthPremium = depth / priceyDepth;
                  }

                  // calculate wave premium
                  float wavePremium = 0.0;
                  if (wave_height >= highWaveDamage) {
                    wavePremium = wave_height / highWaveDamage;
                  }

                  // calculate primary terms
                  float capital = capex + depthPremium * capex + wavePremium * capex + lineCost * lineDensity;
                  float harvest = harvestCost * nharv + transportCost * equipment * d2p;

                  // combine terms
                  float growthCost = (capital + opex + harvest) / seaweed_dw;
                  if (productsTarget == 1.0) {
                    // calculate product value
                    productionCost = growthCost + conversionCost + transportCost * d2p * (seaweed_ww + equipment) / seaweed_dw;
                  } else {
                    // calculate sinking value
                    productionCost = growthCost + transportCost * (d2sink * seaweed_ww + 2.0 * d2sink * equipment + d2p * equipment) / seaweed_dw;
                  }
                }

                if (benefitLayer == 1.0 || mitigationCostLayer == 1.0) {
                  float growthEmissions = (transportEmissions * equipment * d2p + d2p * 24.0 * maintenanceEmissions + 50.0 * maintenanceEmissions) / seaweed_dw;
                  if (productsTarget == 1.0) {
                    // calculate climate benefit of products
                    netBenefit = avoidedEmissions - transportEmissions * d2p * (seaweed_ww + equipment) / seaweed_dw - conversionEmissions - growthEmissions;
                  } else {
                    // calculate climate benefit of sinking
                    netBenefit = carbon_fraction * carbon_to_co2 * fseq_transport * removalRate - transportEmissions * (d2sink * seaweed_ww + 2.0 * d2sink * equipment + d2p * equipment) / seaweed_dw - growthEmissions;
                  }

                  if (netBenefit < 0.0) {
                    gl_FragColor = vec4(empty, empty, empty, opacity);
                    gl_FragColor.rgb *= gl_FragColor.a;
                    return;
                  }
                }

                if (mitigationCostLayer == 1.0) {
                  float cost = productionCost;
                  if (productsTarget == 1.0) {
                    cost -= productValue;
                  }
                  value = cost / netBenefit;
                }

                if (costLayer == 1.0) {
                  value = productionCost;
                }

                if (benefitLayer == 1.0) {
                  value = netBenefit;
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
        <Flex sx={{ gap: [4], alignItems: legend ? 'flex-end' : 'center' }}>
          {legend || (
            <Colorbar
              colormap={colormap}
              format={(d) => (d === clim[0] && d > 1 ? `< ${d}` : d)}
              clim={clim}
              units={
                <Box sx={{ color: 'primary' }}>
                  {typeof UNITS_MAP[layer] === 'string'
                    ? UNITS_MAP[layer]
                    : UNITS_MAP[layer][target]}
                </Box>
              }
              label={
                typeof LABEL_MAP[layer] === 'string'
                  ? LABEL_MAP[layer]
                  : LABEL_MAP[layer][target]
              }
              discrete={discrete}
              horizontal
            />
          )}
          <Ruler />
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

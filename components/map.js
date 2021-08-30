import { Canvas, Raster } from '@carbonplan/maps'
import Basemap from '../components/basemap'
import style from '../components/style'

const Map = ({ clim, colormap, uniforms }) => {
  return (
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
        display={true}
        opacity={1}
        mode={'texture'}
        uniforms={uniforms}
        variables={['Growth2', 'elevation', 'd2p', 'wave_height']}
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
                float depthFactor = 3.0;
                float lowWaveDamage = 1.0;
                float highWaveDamage = 2.0;
                float waveFactor = 2.0;
                float insurance = 35000.0;
                float license = 1409.0;

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

              if (value == nan) {
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
    </Canvas>
  )
}

export default Map

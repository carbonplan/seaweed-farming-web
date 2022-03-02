import { useState } from 'react'
import { Box, Flex, useColorMode, useThemeUI } from 'theme-ui'
import { Fill, Line, Map, Raster, RegionPicker } from '@carbonplan/maps'
import { useRegionContext } from './region'
import { Dimmer, Colorbar, Button } from '@carbonplan/components'
import { SidebarAttachment } from '@carbonplan/layouts'
import { Reset } from '@carbonplan/icons'

import Ruler from './ruler'
import { useParameters } from './parameters'
import { useCustomColormap, formatValue } from './utils'
import { useLayers } from './layers'
import { NAN, LABEL_MAP, COLORMAPS_MAP } from '../constants'
import { frag, LAYER_UNITS } from '../model'

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

const Viewer = ({ expanded, children }) => {
  const { theme } = useThemeUI()
  const [mode] = useColorMode()
  const parameters = useParameters()
  const { uniforms: layerUniforms, layer, target, resetLayers } = useLayers()
  const { colormap, legend, discrete } = useCustomColormap(layer)
  const { setRegionData, showRegionPicker } = useRegionContext()

  let initClim = {}
  Object.entries(COLORMAPS_MAP).forEach((d) => {
    initClim[d[0]] = d[1].clim
  })
  const [clim, setClim] = useState(initClim)

  return (
    <>
      <SidebarAttachment
        expanded={expanded}
        side='left'
        width={3}
        sx={{
          top: ['17px', '17px', '17px', '15px'],
          ml: [null, null, '-63px', '-84px'],
          display: ['none', 'none', 'inline-block', 'inline-block'],
        }}
      >
        <Button
          prefix={<Reset sx={{ width: 20, height: 20, strokeWidth: 1.5 }} />}
          onClick={() => {
            setClim(initClim)
            parameters.resetParameters()
            resetLayers()
          }}
          sx={{
            cursor: expanded ? 'pointer' : 'default',
            color: 'secondary',
            opacity: expanded ? 1 : 0,
            transition: ' opacity 0.2s',
          }}
        />
      </SidebarAttachment>

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
            fontFamily={theme.fonts.mono}
            fontSize={'14px'}
          />
        )}
        <Raster
          maxZoom={5}
          colormap={colormap}
          clim={clim[layer]}
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
          frag={frag}
        />
        <Box
          sx={{
            position: 'absolute',
            right: [13],
            bottom: [17, 17, 15, 15],
          }}
        >
          <Flex sx={{ gap: [3], alignItems: legend ? 'flex-end' : 'center' }}>
            {legend || (
              <Colorbar
                colormap={colormap}
                format={formatValue}
                clim={clim[layer]}
                units={
                  <Box sx={{ color: 'primary' }}>
                    {LAYER_UNITS[layer][target]}
                  </Box>
                }
                label={
                  typeof LABEL_MAP[layer] === 'string'
                    ? LABEL_MAP[layer]
                    : LABEL_MAP[layer][target]
                }
                discrete={discrete}
                horizontal
                setClim={(setter) =>
                  setClim((prev) => {
                    return { ...prev, [layer]: setter(clim[layer]) }
                  })
                }
                setClimStep={COLORMAPS_MAP[layer].step}
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
    </>
  )
}

export default Viewer

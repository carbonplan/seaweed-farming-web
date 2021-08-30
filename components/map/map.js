import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { mix } from 'polished'

import { useMapContext } from './context'
import { useColorGradient, usePropertyExpression } from './hooks'
import style from './style'

mapboxgl.accessToken = ''

// Raw properties
// Growth2 (example value: 0.0)
// d_Be (example value: 0.0)
// d_Bm (example value: 0.0)
// d_Ns (example value: 0.0)
// harv (example value: 0.0)
// elevation (example value: 196.2824)
// d2p (example value: 777.9373)
// mask (example value: 0.1426)
// area (example value: 1070561.2503)

const Map = () => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  const container = useRef(null)
  const mapContext = useMapContext()

  const colorGradient = useColorGradient()
  const propertyToMap = usePropertyExpression()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style(colors),
      center: [-11.14, 23.07],
      zoom: 2.02,
    })

    map.on('load', () => {
      mapContext.setMap(map)
    })

    map.on('move', () => {
      console.log('zoom: ', map.getZoom())
      console.log('center: ', map.getCenter())
    })
  }, [])

  useEffect(() => {
    if (!mapContext.map) return
    mapContext.map.setPaintProperty(
      'background',
      'background-color',
      colors.background
    )
    mapContext.map.setPaintProperty('background', 'background-opacity', 1)
    mapContext.map.setPaintProperty('lakes', 'fill-color', colors.muted)
    mapContext.map.setPaintProperty('lakes', 'fill-opacity', 0.25)
    mapContext.map.setPaintProperty(
      'countries-line',
      'line-color',
      colors.primary
    )
    mapContext.map.setPaintProperty('countries-line', 'line-opacity', 0.25)
    mapContext.map.setPaintProperty(
      'countries-fill',
      'fill-color',
      mix(0.05, colors.primary, colors.background)
    )
  }, [colors, mapContext.map])

  useEffect(() => {
    if (!mapContext.map) return
    mapContext.map.setPaintProperty('macroalgae', 'circle-color', [
      'interpolate-hcl',
      ['linear'],
      propertyToMap,
      ...colorGradient,
    ])
  }, [colors, mapContext.map, propertyToMap, colorGradient])

  return (
    <Box
      ref={container}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        'canvas.mapboxgl-canvas:focus': {
          outline: 'none',
        },
      }}
    />
  )
}

export default Map

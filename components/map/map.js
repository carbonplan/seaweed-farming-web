import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useState, useRef } from 'react'
import { rgba } from 'polished'

import style from './style'

mapboxgl.accessToken = ''

const PROPERTIES = {
  D2PORT: 'd2p',
  PRODUCTION: 'Growth2',
}

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

const Map = ({ onMapReady, options }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const container = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style(colors),
      center: [-121.9, 43.11],
      zoom: 6.79,
    })

    map.on('load', () => {
      setMap(map)
      onMapReady(map)
    })

    // map.on('move', () => {
    //   console.log(map.getZoom())
    // })

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  useEffect(() => {
    if (!map) return
    map.setPaintProperty('background', 'background-color', colors.background)
    map.setPaintProperty('background', 'background-opacity', 1)
    map.setPaintProperty('lakes', 'fill-color', colors.muted)
    map.setPaintProperty('lakes', 'fill-opacity', 0.25)
    map.setPaintProperty('countries', 'line-color', colors.primary)
    map.setPaintProperty('countries', 'line-opacity', 0.25)
    map.setPaintProperty('roads', 'line-color', colors.primary)
    map.setPaintProperty('roads', 'line-opacity', 0.2)
  }, [colors, map])

  useEffect(() => {
    if (!map) return
    map.setPaintProperty('macroalgae', 'circle-color', [
      'interpolate',
      ['linear'],
      [
        '/',
        [
          '+',
          options.operatingCost,
          [
            '*',
            ['get', PROPERTIES.D2PORT],
            options.transportationCost,
            ['get', PROPERTIES.PRODUCTION],
          ],
        ],
        ['get', PROPERTIES.PRODUCTION],
      ],
      1,
      colors.green,
      1000,
      rgba(colors.green, 0),
    ])
  }, [colors, map, options])

  return (
    <Box
      ref={container}
      sx={{
        flexBasis: '100%',
        'canvas.mapboxgl-canvas:focus': {
          outline: 'none',
        },
      }}
    />
  )
}

export default Map

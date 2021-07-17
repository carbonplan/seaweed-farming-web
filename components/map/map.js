import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useState, useRef } from 'react'
import { rgba } from 'polished'

import style from './style'

mapboxgl.accessToken = ''

const PROPERTIES = {
  D2PORT: '0_0',
  PRODUCTION: '0_1',
}

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

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  useEffect(() => {
    if (!map) return
    console.log('setting other colors')
    map.setPaintProperty('background', 'background-color', colors.background)
    map.setPaintProperty('background', 'background-opacity', 1)
    map.setPaintProperty('lakes', 'fill-color', colors.muted)
    map.setPaintProperty('lakes', 'fill-opacity', 0.25)
    map.setPaintProperty('countries', 'line-color', colors.primary)
    map.setPaintProperty('countries', 'line-opacity', 0.25)
    map.setPaintProperty('states', 'line-color', colors.primary)
    map.setPaintProperty('states', 'line-opacity', 0.4)
    map.setPaintProperty('roads', 'line-color', colors.primary)
    map.setPaintProperty('roads', 'line-opacity', 0.2)
  }, [colors, map])

  useEffect(() => {
    if (!map) return
    console.log('setting fire color')
    // v2
    // interpolating with multiple properties + options
    map.setPaintProperty('fire', 'circle-color', [
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
      10,
      rgba(colors.orange, 0),
      100,
      colors.orange,
    ])
    // v1
    // using manual interpolation:
    // map.setPaintProperty('fire', 'circle-color', [
    //   'interpolate',
    //   ['linear'],
    //   ['get', '0_0'],
    //   2.5,
    //   rgba(colors.orange, 0),
    //   10,
    //   colors.orange,
    // ])
    // v0
    // original:
    // map.setPaintProperty('fire', 'circle-color', {
    //   property: '0_0',
    //   stops: [
    //     [2.5, rgba(colors.orange, 0)],
    //     [10, colors.orange],
    //   ],
    // })
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

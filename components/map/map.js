import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useMemo, useState, useRef } from 'react'
import { mix, rgba } from 'polished'

import style from './style'

mapboxgl.accessToken = ''

const PROPERTIES = {
  D2PORT: 'd2p',
  GROWTH: 'Growth2',
  HARV: 'harv',
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

const Map = ({ dataRange, onMapReady, options, visibleLayers }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const container = useRef(null)
  const [map, setMap] = useState(null)

  const propertyToMap = useMemo(() => {
    if (visibleLayers.COST) {
      return [
        '/',
        [
          '+',
          options.operatingCost,
          [
            '*',
            ['get', PROPERTIES.D2PORT],
            options.transportationCost,
            ['get', PROPERTIES.GROWTH],
          ],
        ],
        ['get', PROPERTIES.GROWTH],
      ]
    } else if (visibleLayers.D2PORT) {
      return ['get', PROPERTIES.D2PORT]
    } else if (visibleLayers.GROWTH) {
      return ['get', PROPERTIES.GROWTH]
    } else if (visibleLayers.HARV) {
      return ['get', PROPERTIES.HARV]
    }
  }, [visibleLayers, options])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style(colors),
      center: [-11.14, 23.07],
      zoom: 2.02,
    })

    map.on('load', () => {
      setMap(map)
      onMapReady(map)
    })

    map.on('move', () => {
      console.log('zoom: ', map.getZoom())
      console.log('center: ', map.getCenter())
    })

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
    map.setPaintProperty('countries-line', 'line-color', colors.primary)
    map.setPaintProperty('countries-line', 'line-opacity', 0.25)
    map.setPaintProperty(
      'countries-fill',
      'fill-color',
      mix(0.2, colors.primary, colors.background)
    )
  }, [colors, map])

  useEffect(() => {
    if (!map) return
    map.setPaintProperty('macroalgae', 'circle-color', [
      'interpolate',
      ['linear'],
      propertyToMap,
      dataRange.min,
      colors.background,
      dataRange.max,
      colors.teal,
    ])
  }, [colors, map, propertyToMap, dataRange])

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

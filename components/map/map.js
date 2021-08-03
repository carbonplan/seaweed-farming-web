import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useMemo, useState, useRef } from 'react'
import { mix } from 'polished'

import { useMap } from './context'
import style from './style'

mapboxgl.accessToken = ''

const PROPERTY_TRANSFORMATIONS = {
  D2PORT: ['get', 'd2p'],
  GROWTH: ['get', 'Growth2'],
  DEPTH: ['*', -1, ['get', 'elevation']],
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

const Map = ({ dataRange, options, visibleLayers }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const container = useRef(null)
  const mapContext = useMap()

  const propertyToMap = useMemo(() => {
    if (visibleLayers.COST) {
      const depthFactor = [
        'case',
        ['>', PROPERTY_TRANSFORMATIONS.DEPTH, options.cheapDepth],
        [
          '*',
          options.depthCostFactor,
          [
            '-',
            ['min', PROPERTY_TRANSFORMATIONS.DEPTH, options.priceyDepth],
            options.cheapDepth,
          ],
        ],
        1,
      ]
      const capital = [
        '*',
        [
          '+',
          options.capitalCost,
          options.lineCost * 1000000, // todo: once LINEDENSITY is available: ['*', options.linecost, ['get', PROPERTIES.LINEDENSITY]]
        ],
        depthFactor,
      ]
      const operations = options.operatingCost
      const harvest = [
        '+',
        [
          '*',
          PROPERTY_TRANSFORMATIONS.D2PORT,
          options.transportationCost,
          PROPERTY_TRANSFORMATIONS.GROWTH,
        ],
        options.harvestCost * 4, // once NHARV data is available: ['*', options.harvestCost, ['get', PROPERTIES.NHARV]]
      ]

      return ['*', ['+', capital, operations, harvest], 0.001]
    } else if (visibleLayers.D2PORT) {
      return PROPERTY_TRANSFORMATIONS.D2PORT
    } else if (visibleLayers.GROWTH) {
      return PROPERTY_TRANSFORMATIONS.GROWTH
    } else if (visibleLayers.DEPTH) {
      return PROPERTY_TRANSFORMATIONS.DEPTH
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
      'interpolate',
      ['linear'],
      propertyToMap,
      dataRange.min,
      colors.background,
      dataRange.max,
      colors.teal,
    ])
  }, [colors, mapContext.map, propertyToMap, dataRange])

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

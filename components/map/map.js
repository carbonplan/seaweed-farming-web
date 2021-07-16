import mapboxgl from 'mapbox-gl'
import { useThemeUI, Box } from 'theme-ui'
import { useEffect, useState, useRef } from 'react'

import style from './style'

mapboxgl.accessToken = ''

const Map = ({ onMapReady }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const container = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: container.current,
      style: style(colors),
      //   center: [-121.9, 43.11],
      //   zoom: 6.79,
      //   minZoom: 3,
      //   maxZoom: 9,
      //   maxBounds: [
      //     [-155, 5],
      //     [-45, 65],
      //   ],
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

  return (
    <Box
      ref={container}
      sx={{
        height: '100%',
        width: '100%',
        'canvas.mapboxgl-canvas:focus': {
          outline: 'none',
        },
      }}
    />
  )
}

export default Map

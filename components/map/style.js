import config from './config'

const style = (colors) => {
  const { background, primary, muted } = colors

  return {
    version: 8,
    glyphs: `https://storage.googleapis.com/carbonplan-data/tiles/glyphs/{fontstack}/{range}.pbf`, // fonts
    sources: {
      basemap: {
        type: 'vector',
        tiles: [`${config.basemap}/{z}/{x}/{y}.pbf`],
        maxzoom: 5,
      },
      macroalgae: {
        type: 'vector',
        tiles: [`${config.macroalgae}/{z}/{x}/{y}.pbf`],
        maxzoom: 5,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-opacity': 0,
        },
      },
      {
        id: 'lakes',
        type: 'fill',
        source: 'basemap',
        'source-layer': 'ne_10m_lakes',
        layout: { visibility: 'visible' },
        paint: {
          'fill-antialias': false,
          'fill-opacity': 0,
          'fill-color': muted,
        },
      },
      {
        id: 'countries',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_admin_0_countries',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-opacity': 0,
          'line-width': 0.8,
          'line-color': primary,
        },
      },
      {
        id: 'roads',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_roads',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
          visibility: 'visible',
        },
        paint: {
          'line-blur': 0.4,
          'line-opacity': 0,
          'line-width': 0.8,
          'line-color': primary,
        },
      },
      {
        id: 'macroalgae',
        type: 'circle',
        source: 'macroalgae',
        'source-layer': 'macroalgae',
        layout: { visibility: 'visible' },
        paint: {
          'circle-opacity': 1,
          'circle-color': background,
          'circle-radius': [
            'interpolate',
            ['exponential', 2],
            ['zoom'],
            3,
            1.6,
            4,
            1.6,
            5,
            1.7,
            6,
            2.25,
            7,
            3.75,
            8,
            7.5,
            9,
            14,
          ],
        },
      },
    ],
  }
}

export default style

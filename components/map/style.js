import config from './config'
const microalgaeLayer = (name, color) => ({
  id: name,
  type: 'circle',
  source: 'macroalgae',
  'source-layer': name,
  layout: { visibility: 'visible' },
  paint: {
    'circle-opacity': 1,
    'circle-color': color,
    'circle-radius': [
      'interpolate',
      ['exponential', 2],
      ['zoom'],
      0,
      3,
      1,
      5,
      2,
      6,
      3,
      7,
      4,
      8,
      5,
      13,
      6,
      16,
      7,
      17,
      8,
      20,
      9,
      20,
    ],
  },
})
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
      microalgaeLayer('macroalgae', background),
      // TODO: figure out why these cannot be painted
      microalgaeLayer('Growth2', background),
      microalgaeLayer('d2p', background),
      {
        id: 'countries-fill',
        type: 'fill',
        source: 'basemap',
        'source-layer': 'ne_10m_admin_0_countries',
        paint: {
          'fill-color': background,
          'fill-opacity': 1,
        },
      },
      {
        id: 'countries-line',
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
          'line-opacity': 1,
          'line-width': 0.8,
          'line-color': primary,
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
          'fill-opacity': 0.25,
          'fill-color': muted,
        },
      },
    ],
  }
}

export default style

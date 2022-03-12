import { useThemedColormap } from '@carbonplan/colormaps'
import { COLORMAPS_MAP } from '../../constants'
import Legend from '../legend'
import { SPECIES } from '../../model'

const useCustomColormap = (layer) => {
  const { colormapName } = COLORMAPS_MAP[layer]
  let colormap
  let legend
  let discrete = false
  if (layer === 'species_preferred') {
    colormap = useThemedColormap(colormapName, { count: 5 }).slice(1)
    legend = <Legend colormap={colormap} labels={SPECIES} />
    discrete = true
  } else if (layer === 'nharv') {
    colormap = useThemedColormap(colormapName, { count: 9 }).slice(1)
    discrete = true
  } else {
    colormap = useThemedColormap(colormapName).slice(20)
  }

  return { colormap, legend, discrete }
}

export default useCustomColormap

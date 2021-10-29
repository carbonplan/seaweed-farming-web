import { useColormap } from '@carbonplan/colormaps'
import { COLORMAPS_MAP, SPECIES } from '../../constants'
import Legend from '../legend'

const useCustomColormap = (layer) => {
  let colormap
  let legend
  let discrete = false
  if (layer === 'species_preferred') {
    colormap = useColormap('cool', 6).slice(1)
    legend = <Legend colormap={colormap} labels={SPECIES} />
    discrete = true
  } else if (layer === 'nharv') {
    colormap = useColormap('cool', 9).slice(1)
    discrete = true
  } else {
    colormap = useColormap('cool')
  }

  if (COLORMAPS_MAP[layer].reversed) {
    colormap = [...colormap].reverse()
  }

  return { colormap, legend, discrete }
}

export default useCustomColormap

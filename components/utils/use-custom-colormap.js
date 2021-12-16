import { useColormap } from '@carbonplan/colormaps'
import { COLORMAPS_MAP, SPECIES } from '../../constants'
import Legend from '../legend'

const useCustomColormap = (layer) => {
  const { colormapName } = COLORMAPS_MAP[layer]
  let colormap
  let legend
  let discrete = false
  if (layer === 'species_preferred') {
    colormap = useColormap(colormapName, 6).slice(1)
    legend = <Legend colormap={colormap} labels={SPECIES} />
    discrete = true
  } else if (layer === 'nharv') {
    colormap = useColormap(colormapName, 9).slice(1)
    discrete = true
  } else {
    colormap = useColormap(colormapName, 255).slice(20)
  }

  return { colormap, legend, discrete }
}

export default useCustomColormap

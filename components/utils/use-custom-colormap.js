import { useColormap } from '@carbonplan/colormaps'
import { LABEL_MAP, SPECIES, UNITS_MAP } from '../../constants'
import Legend from '../legend'

const useCustomColormap = (layer) => {
  let colormap
  let legend
  if (layer === 'species_preferred') {
    colormap = useColormap('cool', 6).slice(1)
    legend = <Legend colormap={colormap} labels={SPECIES} />
  } else if (layer === 'nharv') {
    colormap = useColormap('cool', 9).slice(1)
    legend = (
      <Legend
        colormap={colormap}
        labels={[1, 2, 3, 4, 5, 6, 7, 8]}
        label={LABEL_MAP.nharv}
        units={UNITS_MAP.nharv}
      />
    )
  } else {
    colormap = useColormap('cool')
  }

  return { colormap, legend }
}

export default useCustomColormap

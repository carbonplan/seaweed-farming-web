import { useThemeUI } from 'theme-ui'
import { useMemo } from 'react'
import { setLightness, parseToHsl } from 'polished'
import { useMapContext } from '../context'

const useColorGradient = () => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const {
    options: {
      inverted,
      colorRange: { min, max },
    },
  } = useMapContext()

  return useMemo(() => {
    let colorSteps = [
      colors.orange,
      colors.yellow,
      colors.green,
      colors.teal,
      colors.blue,
    ]
    colorSteps = colorSteps.map((color, idx) =>
      setLightness(0.7 - idx * 0.1, color)
    )
    if (inverted) colorSteps.reverse()

    colorSteps.push(colors.background)
    // colorSteps.forEach((color) => console.log('hsl', parseToHsl(color)))

    const step = (max - min) / colorSteps.length
    return colorSteps.reduce((result, color, idx) => {
      result.push(min + idx * step)
      result.push(color)
      return result
    }, [])
  }, [min, max, colors, inverted])
}

export default useColorGradient

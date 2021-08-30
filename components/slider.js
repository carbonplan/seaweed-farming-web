import { Slider as SliderComponent } from '@carbonplan/components'
import { rgba } from 'polished'
import { useThemeUI } from 'theme-ui'

const Slider = ({ color, min, max, onChange, step, value }) => {
  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  const backgroundColor = rgba(colors[color], 0.2)
  const thumbColor = colors[color]
  const thumbWidth = '8px'

  return (
    <SliderComponent
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      sx={{
        backgroundColor: 'transparent',
        width: '100%',
        height: '20px',
        borderRadius: '0px',
        ':focus': {
          outline: 'none',
        },
        '::-webkit-slider-runnable-track': {
          width: '100%',
          height: '20px',
          cursor: 'ew-resize',
          borderRadius: '0px',
          backgroundColor, // todo: something else?
        },
        '::-webkit-slider-thumb': {
          height: '20px',
          width: thumbWidth,
          background: thumbColor,
          cursor: 'ew-resize',
          borderRadius: '0px',
          '-webkit-appearance': 'none',
          mt: '0px',
        },
        ':focus::-webkit-slider-runnable-track': {
          backgroundColor,
          outline: 'none',
        },
        '::-moz-range-track': {
          width: '100%',
          height: '20px',
          cursor: 'ew-resize',
          backgroundColor,
        },
        '::-moz-range-thumb': {
          border: 'none',
          height: '20px',
          width: thumbWidth,
          borderRadius: '0px',
          background: thumbColor,
          cursor: 'ew-resize',
        },
        '::-ms-track': {
          width: '100%',
          height: '20px',
          cursor: 'ew-resize',
          background: 'transparent',
          borderColor: 'transparent',
          color: 'transparent',
        },
        '::-ms-fill-lower': {
          backgroundColor,
        },
        '::-ms-fill-upper': {
          backgroundColor,
        },
        '::-ms-thumb': {
          width: thumbWidth,
          borderRadius: '0px',
          background: thumbColor,
          cursor: 'ew-resize',
          height: '20px',
        },
        ':focus::-ms-fill-lower': {
          backgroundColor,
          outline: 'none',
        },
        ':focus::-ms-fill-upper': {
          backgroundColor,
          outline: 'none',
        },
      }}
    />
  )
}

export default Slider

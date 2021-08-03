import { Box } from 'theme-ui'
import { Group, Slider, Tag } from '@carbonplan/components'

import { useMapContext } from './map'

const DisplayOptions = () => {
  const { options } = useMapContext()
  const { colorRange, setColorRange, inverted, setInverted } = options

  return (
    <Group spacing='sm'>
      <Tag value={inverted} onClick={() => setInverted(!inverted)}>
        Invert colors
      </Tag>
      <Box>
        Range minimum: {colorRange.min}
        <Slider
          size='sm'
          value={colorRange.min}
          min={0}
          max={1000}
          onChange={(e) =>
            setColorRange({
              min: Number(e.target.value),
              max: colorRange.max,
            })
          }
        />
      </Box>
      <Box>
        Range maximum: {colorRange.max}
        <Slider
          value={colorRange.max}
          size='sm'
          min={100}
          max={99999}
          onChange={(e) =>
            setColorRange({
              max: Number(e.target.value),
              min: colorRange.min,
            })
          }
        />
      </Box>
    </Group>
  )
}

export default DisplayOptions

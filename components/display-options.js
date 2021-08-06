import { Group, Tag } from '@carbonplan/components'

import { useMapContext } from './map'
import Parameter from './parameter'

const DisplayOptions = () => {
  const { options } = useMapContext()
  const { colorRange, setColorRange, inverted, setInverted } = options

  return (
    <Group spacing='sm'>
      <Tag value={inverted} onClick={() => setInverted(!inverted)}>
        Invert colors
      </Tag>
      <Parameter
        value={colorRange.min}
        range={{
          min: 0,
          max: 1000,
        }}
        name='Range minimum'
        onChange={(_, value) =>
          setColorRange({
            min: value,
            max: colorRange.max,
          })
        }
      />

      <Parameter
        value={colorRange.max}
        range={{
          min: 1000,
          max: 10000,
        }}
        name='Range maximum'
        onChange={(_, value) =>
          setColorRange({
            min: colorRange.min,
            max: value,
          })
        }
      />
    </Group>
  )
}

export default DisplayOptions

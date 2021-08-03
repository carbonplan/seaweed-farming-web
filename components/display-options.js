import { Box } from 'theme-ui'
import { useState } from 'react'
import { Group, Slider, Tag } from '@carbonplan/components'

const DisplayOptions = ({
  dataRange,
  setDataRange,
  invertColors,
  setInvertColors,
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Group spacing='sm'>
      <Tag value={invertColors} onClick={() => setInvertColors(!invertColors)}>
        Invert colors
      </Tag>
      <Box>
        Range minimum: {dataRange.min}
        <Slider
          size='sm'
          value={dataRange.min}
          min={0}
          max={1000}
          onChange={(e) =>
            setDataRange({
              min: Number(e.target.value),
              max: dataRange.max,
            })
          }
        />
      </Box>
      <Box>
        Range maximum: {dataRange.max}
        <Slider
          value={dataRange.max}
          size='sm'
          min={100}
          max={99999}
          onChange={(e) =>
            setDataRange({
              max: Number(e.target.value),
              min: dataRange.min,
            })
          }
        />
      </Box>
    </Group>
  )
}

export default DisplayOptions

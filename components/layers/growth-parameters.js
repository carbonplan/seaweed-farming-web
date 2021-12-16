import { Box, Checkbox, Label } from 'theme-ui'
import { Group } from '@carbonplan/components'

import { useRawUniformValues } from './context'

const checkboxSx = {
  'input:focus ~ &': {
    bg: 'inherit',
  },
}
const GrowthParameters = ({ sx }) => {
  const {
    // growthModel,
    // setGrowthModel,
    sensitiveAreaMask,
    setSensitiveAreaMask,
  } = useRawUniformValues()

  return (
    <Group spacing={4}>
      <Box>
        <Box sx={sx.label}>Exclude sensitive areas</Box>
        <Group direction='vertical' spacing='sm'>
          <Label>
            <Checkbox
              sx={checkboxSx}
              checked={sensitiveAreaMask === 1 || sensitiveAreaMask === 3}
              onChange={() => {
                if (sensitiveAreaMask === 0) {
                  setSensitiveAreaMask(1)
                } else if (sensitiveAreaMask === 1) {
                  setSensitiveAreaMask(0)
                } else if (sensitiveAreaMask === 2) {
                  setSensitiveAreaMask(3)
                } else {
                  setSensitiveAreaMask(2)
                }
              }}
            />
            Shipping
          </Label>
          <Label>
            <Checkbox
              sx={checkboxSx}
              checked={sensitiveAreaMask === 2 || sensitiveAreaMask === 3}
              onChange={() => {
                if (sensitiveAreaMask === 0) {
                  setSensitiveAreaMask(2)
                } else if (sensitiveAreaMask === 2) {
                  setSensitiveAreaMask(0)
                } else if (sensitiveAreaMask === 1) {
                  setSensitiveAreaMask(3)
                } else {
                  setSensitiveAreaMask(1)
                }
              }}
            />
            Marine protected
          </Label>
        </Group>
      </Box>
    </Group>
  )
}

export default GrowthParameters

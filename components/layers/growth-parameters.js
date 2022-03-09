import { Box, Checkbox, Label } from 'theme-ui'
import { Group } from '@carbonplan/components'
import Info from '../info'

import { useRawUniformValues } from './context'

const sxCheckbox = (checked) => {
  return {
    mt: ['-3px', '-3px', '-3px', '-1px'],
    cursor: 'pointer',
    color: 'muted',
    transition: 'color 0.15s',
    'input:active ~ &': { bg: 'background', color: 'primary' },
    'input:focus ~ &': {
      bg: 'background',
      color: checked ? 'primary' : 'muted',
    },
    'input:hover ~ &': { bg: 'background', color: 'primary' },
    'input:focus-visible ~ &': {
      outline: 'dashed 1px rgb(110, 110, 110, 0.625)',
      background: 'rgb(110, 110, 110, 0.625)',
    },
  }
}

const sxLabel = {
  fontFamily: 'mono',
  letterSpacing: 'mono',
  fontSize: [1, 1, 1, 2],
  textTransform: 'uppercase',
  cursor: 'pointer',
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
        <Box sx={{ ...sx.label, mt: ['6px'], mb: ['14px'] }}>
          Exclude sensitive areas
          <Info
            sx={{
              display: 'inline-block',
              ml: ['12px'],
            }}
            sxInner={{ pb: [3] }}
          >
            Sensitive areas include Marine Protected Areas (MPAs) and major
            shipping lanes.
          </Info>
        </Box>
        <Group direction='horizontal' spacing='md'>
          <Label sx={sxLabel}>
            <Checkbox
              sx={sxCheckbox(
                sensitiveAreaMask === 1 || sensitiveAreaMask === 3
              )}
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
          <Label sx={sxLabel}>
            <Checkbox
              sx={sxCheckbox(
                sensitiveAreaMask === 2 || sensitiveAreaMask === 3
              )}
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
            Marine
          </Label>
        </Group>
      </Box>
    </Group>
  )
}

export default GrowthParameters

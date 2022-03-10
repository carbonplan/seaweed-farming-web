import { Group } from '@carbonplan/components'
import { Box } from 'theme-ui'

import Info from '../info'
import Radio from '../radio'
import { useParameters } from './context'

const OUTLOOKS = [
  { id: 'optimistic', label: 'Optimistic' },
  { id: 'pessimistic', label: 'Pessimistic' },
]
const PRODUCTS = [
  { id: 'food', label: 'Food' },
  { id: 'feed', label: 'Feed' },
  { id: 'fuels', label: 'Fuels' },
]

const ParameterPresets = ({ target, sx }) => {
  const { presets, setPresets } = useParameters()
  const { outlook, product } = presets
  return (
    <Group spacing={4}>
      <Box>
        <Box sx={sx.label}>
          Outlook presets
          <Info
            sx={{
              display: 'inline-block',
              ml: ['12px'],
            }}
            sxInner={{ pb: [3] }}
          >
            TK.
          </Info>
        </Box>
        <Box>
          {OUTLOOKS.map(({ id, label }) => {
            return (
              <Box key={id} sx={{ display: 'inline-block', mr: [3] }}>
                <Radio
                  label={label}
                  value={id}
                  name='defaultOutlook'
                  onChange={() => setPresets({ outlook: id })}
                  checked={id === outlook}
                />
              </Box>
            )
          })}
        </Box>
      </Box>
      {target === 'products' && (
        <Box>
          <Box sx={sx.label}>
            Product presets
            <Info
              sx={{
                display: 'inline-block',
                ml: ['12px'],
              }}
              sxInner={{ pb: [3] }}
            >
              These presets reflect representative product values and avoided
              emissions for food, feed, and seaweed-derived biofuel.
            </Info>
          </Box>
          <Box>
            {PRODUCTS.map(({ id, label }) => {
              return (
                <Box key={id} sx={{ display: 'inline-block', mr: [3] }}>
                  <Radio
                    label={label}
                    value={id}
                    name='defaultProduct'
                    onChange={() => setPresets({ product: id })}
                    checked={id === product}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
      )}
    </Group>
  )
}

export default ParameterPresets

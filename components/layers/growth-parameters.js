import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'

import Radio from '../radio'
import { useRawUniformValues } from './context'
import { GROWTH_MODELS, SPECIES } from './constants'

const GrowthParameters = ({ sx }) => {
  const {
    species,
    setSpecies,
    growthModel,
    setGrowthModel,
    mask,
    setMask,
  } = useRawUniformValues()

  return (
    <Group>
      <Box>
        <Box sx={sx.label}>Growth model</Box>
        <Group direction='horizontal'>
          {GROWTH_MODELS.map((m) => {
            return (
              <Radio
                key={m}
                label={m.charAt(0).toUpperCase() + m.slice(1)}
                value={m}
                name='growth'
                onChange={setGrowthModel}
                checked={growthModel === m}
              />
            )
          })}
        </Group>
      </Box>
      <Box>
        <Box sx={sx.label}>Seaweed species</Box>
        <Group spacing='xs'>
          {SPECIES.map((s) => (
            <Radio
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              value={s}
              name='species'
              onChange={setSpecies}
              checked={species === s}
            />
          ))}
        </Group>
      </Box>

      <Box>
        <Box sx={sx.label}>Sensitive areas</Box>
        <Group direction='horizontal'>
          <Radio
            label='Exclude'
            value={'masked'}
            name='mask'
            onChange={(v) => setMask(v === 'masked')}
            checked={mask}
          />
          <Radio
            label='Include'
            value={'unmasked'}
            name='mask'
            onChange={(v) => setMask(v === 'masked')}
            checked={!mask}
          />
        </Group>
      </Box>
    </Group>
  )
}

export default GrowthParameters
